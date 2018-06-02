defmodule Microblogger.UserControllerTest do
  use Microblogger.ConnCase

  alias Microblogger.User
  @valid_attrs %{email: "some_email", password: "some_pass", bio: "some_bio", username: "some_user"}

  setup %{conn: _} do
    current_user = User.registration_changeset(%User{}, @valid_attrs) |> Repo.insert!
    new_conn     = build_conn() |> post(session_path(build_conn(), :create), @valid_attrs)

    {:ok, %{user: current_user, jwt: new_conn.private.guardian_default_jwt}}
  end

  test "successfully establishes Guardian session" do
    new_conn = build_conn() |> post(session_path(build_conn(), :create), @valid_attrs)
      
    assert new_conn.status == 201
  end

  test "forbids user if authentication fails", %{user: user} do
    conn = build_conn()
      |> get(user_path(build_conn(), :posts, user))

    assert conn.status == 403
  end

  test "can access routes that require Guardian authentication", %{jwt: jwt, user: user} do
    conn = build_conn()
      |> put_req_header("authorization", "Bearer #{jwt}")
      |> get(user_path(build_conn(), :posts, user))
      
    assert conn.status == 200
  end

  test "shows post resource and returns empty List if no posts associated with user", %{jwt: jwt, user: user} do
    conn = build_conn()
      |> put_req_header("authorization", "Bearer #{jwt}")
      |> get(user_path(build_conn(), :posts, user))
      
    assert json_response(conn, 200)["data"] == []
  end

  test "update user bio", %{jwt: _jwt, user: user} do
    params = %{
      "id" => user.id, 
      "user" => %{@valid_attrs | bio: "updated_bio"}
    }

    data = build_conn() 
      |> put_req_header("authorization", "Bearer idkjwt")
      |> patch(user_path(build_conn(), :update, user), params)
      |> json_response(200)

    refute data["bio"] == user.bio
    assert data["bio"] == "updated_bio"
  end

  test "delete revokes permissions" do
    new_conn = build_conn() |> post(session_path(build_conn(), :create), @valid_attrs)
    resp = delete(new_conn, session_path(new_conn, :delete))

    assert json_response(resp, 200)["ok"]
  end
end
