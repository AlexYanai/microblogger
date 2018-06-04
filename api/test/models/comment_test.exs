defmodule Microblogger.CommentTest do
  use Microblogger.ModelCase

  alias Microblogger.Comment

  @valid_attrs %{body: "some body"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Comment.changeset(%Comment{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Comment.changeset(%Comment{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "add_author_name_and_email adds author name and email to comment params" do
    comments = [@valid_attrs]
    comments = Comment.add_author_name_and_email(comments, "test_username", "test_email")
    comment  = comments |> Enum.at(0)

    assert comment[:email]    == "test_email"
    assert comment[:username] == "test_username"
  end
end
