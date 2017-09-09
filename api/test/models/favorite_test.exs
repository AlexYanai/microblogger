defmodule Cite.FavoriteTest do
  use Cite.ModelCase

  alias Cite.{Favorite, User}

  @valid_attrs %{citation_id: 1, user_id: 1}
  @invalid_attrs %{}
  @user_attrs %{email: "some_email", password: "some_pass", bio: "some_bio", username: "some_user"}

  test "changeset with valid attributes" do
    changeset = Favorite.changeset(%Favorite{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Favorite.changeset(%Favorite{}, @invalid_attrs)
    refute changeset.valid?
  end
end
