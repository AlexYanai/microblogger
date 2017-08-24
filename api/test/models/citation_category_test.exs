defmodule Cite.CitationCategoryTest do
  use Cite.ModelCase

  alias Cite.CitationCategory

  @valid_attrs %{citation_id: 1, category_id: 1}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = CitationCategory.changeset(%CitationCategory{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = CitationCategory.changeset(%CitationCategory{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "assoc_citation_with_category" do
    changeset = CitationCategory.assoc_citation_with_category(%{id: 2}, %{id: 2})
    assert changeset.valid?
  end

  test "assoc_category_with_citation" do
    changeset = CitationCategory.assoc_category_with_citation(%{id: 3}, %{id: 3})
    assert changeset.valid?
  end

  test "assoc_category_id_with_citation_id" do
    changeset = CitationCategory.assoc_category_id_with_citation_id(4, 4)
    assert changeset.valid?
  end
end
