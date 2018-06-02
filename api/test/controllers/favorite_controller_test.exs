defmodule Microblogger.FavoriteControllerTest do
  use Microblogger.ConnCase

  alias Microblogger.{User, Favorite}
  
  @user_attrs %{email: "some_email", password: "some_pass", bio: "some_bio", username: "some_user"}

  setup %{conn: _} do
    current_user = User.registration_changeset(%User{}, @user_attrs) |> Repo.insert!
    new_conn     = build_conn() |> post(session_path(build_conn(), :create), @user_attrs)
    jwt          = new_conn.private.guardian_default_jwt

    [
      %{title: "z", source: "y", quote: "x", is_public: true},
      %{title: "w", source: "v", quote: "u", is_public: true},
      %{title: "t", source: "s", quote: "r.", is_public: false}
    ]
      |> Enum.map(&User.create_post(&1, current_user))
      |> Enum.each(&Repo.insert!(&1))

    user_posts = current_user |> Repo.preload(:posts)
    posts  = user_posts.posts

    first  = posts |> Enum.at(0)
    second = posts |> Enum.at(1)

    %Favorite{} 
      |> Favorite.changeset(%{post_id: first.id, user_id: current_user.id}) 
      |> Repo.insert!

    %Favorite{} 
      |> Favorite.changeset(%{post_id: second.id, user_id: current_user.id}) 
      |> Repo.insert!

    conn = build_conn() 
      |> put_req_header("authorization", "Bearer #{jwt}")

    {:ok, conn: conn, user: current_user}
  end

  test "returns all favorited records", %{conn: conn, user: user} do
    conn = get(conn, favorite_path(build_conn(), :favorites, user))
    data = json_response(conn, 200)["data"]

    assert length(data) == 2
    assert data |> Enum.all?(fn n -> n["data"]["is_favorite"] end)
  end
end
