defmodule Cite.CategoryTest do
  use Cite.ModelCase

  alias Cite.Category

  @valid_attrs %{name: "General", description: "General Category"}
  @invalid_attrs %{description: "General Category"}

  test "changeset with valid attributes" do
    changeset = Category.changeset(%Category{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Category.changeset(%Category{}, @invalid_attrs)
    refute changeset.valid?
  end
end
