defmodule Microblogger.UserTest do
  use Microblogger.ModelCase

  alias Microblogger.{User, Favorite}

  @valid_attrs %{email: "some_email", password: "some_pass", bio: "some_bio", username: "some_user"}
  @invalid_attrs %{}
  
  @user_attrs %{email: "some_email", password: "some_pass", bio: "some_bio", username: "some_user"}
  @post_attrs_one %{quote: "a1", source: "b1", title: "c1", is_public: true}
  @post_attrs_two %{quote: "a2", source: "b2", title: "c2", is_public: true}

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "registration_changeset with valid attributes" do
    changeset = User.registration_changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "registration_changeset with password too short" do
    changeset = User.registration_changeset(%User{}, %{@valid_attrs | password: "so"})
    refute changeset.valid?
  end

  test "registration_changeset generates password hash from password" do
    changeset = User.registration_changeset(%User{}, @valid_attrs)
    assert {:ok, _} = Map.fetch(changeset.changes, :password_hash)
  end

  test "create_post associates post with user model" do
    user = User.registration_changeset(%User{}, @user_attrs) |> Repo.insert!

    User.create_post(@post_attrs_one, user) |> Repo.insert!
    user = user |> Repo.preload(:posts)

    assert length(user.posts) == 1
  end

  test "favorites returns all of a user's favorites" do
    user     = User.registration_changeset(%User{}, @user_attrs) |> Repo.insert!

    User.create_post(@post_attrs_one, user) |> Repo.insert!
    User.create_post(@post_attrs_two, user) |> Repo.insert!

    user     = user |> Repo.preload(:posts)
    post_one = user.posts |> List.first
    post_two = user.posts |> List.last

    Favorite.changeset(%Favorite{}, %{post_id: post_one.id, user_id: user.id}) |> Repo.insert!
    Favorite.changeset(%Favorite{}, %{post_id: post_two.id, user_id: user.id}) |> Repo.insert!

    assert length(User.favorites(user)) == 2
  end
end
