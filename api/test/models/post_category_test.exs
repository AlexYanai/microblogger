defmodule Microblogger.PostCategoryTest do
  use Microblogger.ModelCase

  alias Microblogger.PostCategory

  @valid_attrs %{post_id: 1, category_id: 1}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = PostCategory.changeset(%PostCategory{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = PostCategory.changeset(%PostCategory{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "assoc_post_with_category" do
    changeset = PostCategory.assoc_post_with_category(%{id: 2}, %{id: 2})
    assert changeset.valid?
  end

  test "assoc_category_with_post" do
    changeset = PostCategory.assoc_category_with_post(%{id: 3}, %{id: 3})
    assert changeset.valid?
  end

  test "assoc_category_id_with_post_id" do
    changeset = PostCategory.assoc_category_id_with_post_id(4, 4)
    assert changeset.valid?
  end
end
