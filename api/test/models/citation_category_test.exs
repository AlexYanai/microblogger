defmodule Cite.CitationCategoryTest do
  use Cite.ModelCase

  alias Cite.CitationCategory

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = CitationCategory.changeset(%CitationCategory{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = CitationCategory.changeset(%CitationCategory{}, @invalid_attrs)
    refute changeset.valid?
  end
end
