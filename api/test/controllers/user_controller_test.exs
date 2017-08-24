defmodule Cite.UserControllerTest do
  use Cite.ConnCase

  alias Cite.User
  @valid_attrs %{email: "some_email", password: "some_pass", bio: "some_bio", username: "some_user"}

  setup %{conn: _} do
    current_user = User.registration_changeset(%User{}, @valid_attrs) |> Repo.insert!
    new_conn     = build_conn() |> post(session_path(build_conn(), :create), @valid_attrs)

    # {:ok, jwt, full_claims} = Guardian.encode_and_sign(user)

    {:ok, %{user: current_user, jwt: new_conn.private.guardian_default_jwt}}
  end

  test "successfully establishes Guardian session" do
    new_conn = build_conn() |> post(session_path(build_conn(), :create), @valid_attrs)
      
    assert new_conn.status == 201
  end

  test "can access routes that require Guardian authentication", %{jwt: jwt, user: user} do
    conn = build_conn()
      |> put_req_header("authorization", "Bearer #{jwt}")
      |> get(user_path(build_conn(), :citations, user))
      
    assert conn.status == 200
  end

  test "forbids user if authentication fails", %{user: user} do
    conn = build_conn()
      |> get(user_path(build_conn(), :citations, user))

    assert conn.status == 403
  end

  test "shows citation resource and returns empty List if no citations associated with user", %{jwt: jwt, user: user} do
    conn = build_conn()
      |> put_req_header("authorization", "Bearer #{jwt}")
      |> get(user_path(build_conn(), :citations, user))
      
    assert json_response(conn, 200)["data"] == []
  end

  test "delete revokes permissions" do
    new_conn = build_conn() |> post(session_path(build_conn(), :create), @valid_attrs)
    resp = delete(new_conn, session_path(new_conn, :delete))

    assert json_response(resp, 200)["ok"]
  end
end
