defmodule Cite.UserTest do
  use Cite.ModelCase

  alias Cite.User

  @valid_attrs %{email: "some_email", password: "some_pass", bio: "some_bio", username: "some_user"}
  @invalid_attrs %{}
  @cite_attrs %{quote: "some content", source: "some content", title: "some content", is_public: true}

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

  test "create_citation associates citation with user model" do
    u_map = %{username: "Test UserA", email: "a@a.com", password: "aaaaaa", bio: "aaaaaaaaaaaaaaaaaaaaaaaa"}
    user  = User.registration_changeset(%User{}, u_map) |> Repo.insert!

    User.create_citation(@cite_attrs, user) |> Repo.insert!
    user = user |> Repo.preload(:citations)

    assert length(user.citations) == 1
  end
end
