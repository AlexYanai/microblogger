defmodule Microblogger.CommentTest do
  use Microblogger.ModelCase

  alias Microblogger.Comment

  @valid_attrs %{
    body: "some body", 
    author_name: "test_username", 
    author_email: "test_email", 
    user_id: 1, 
    post_id: 1
  }
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Comment.changeset(%Comment{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Comment.changeset(%Comment{}, @invalid_attrs)
    refute changeset.valid?
  end
end
