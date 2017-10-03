defmodule Cite.SessionControllerTest do
  use Cite.ConnCase

  alias Cite.{User}
  @user_attrs %{email: "some_email", password: "some_pass", bio: "some_bio", username: "some_user"}

  setup %{conn: _} do
    current_user = User.registration_changeset(%User{}, @user_attrs) |> Repo.insert!
    new_conn     = build_conn() |> post(session_path(build_conn(), :create), @user_attrs)

    {:ok, %{user: current_user, jwt: new_conn.private.guardian_default_jwt}}
  end

  test "refresh current jwt and session and gets new jwt", %{jwt: jwt, user: _user}  do
    new_jwt = build_conn() 
      |> put_req_header("authorization", "Bearer #{jwt}")
      |> post(session_path(build_conn(), :refresh)) 
      |> json_response(200)

    refute jwt == new_jwt["token"]
  end

  test "delete current jwt and session", %{jwt: jwt, user: _user}  do
    # Get categories index to show that the session exists
    conn = build_conn() 
      |> put_req_header("authorization", "Bearer #{jwt}")
      |> get(category_path(build_conn(), :index))

    assert conn.status == 200
    
    # Delete current token, update the :state value, and try to use it again
    conn = conn 
      |> delete(session_path(build_conn(), :delete)) 
      |> Map.update!(:state, fn (_) -> :set end)
      |> put_req_header("authorization", "Bearer #{jwt}")
      |> get(category_path(build_conn(), :index))

    assert conn.status == 403
  end
end
