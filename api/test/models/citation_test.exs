defmodule Cite.CitationTest do
  use Cite.ModelCase

  alias Cite.Citation

  @valid_attrs %{quote: "some content", source: "some content", title: "some content", is_public: true}
  @invalid_attrs %{}

  @with_categories %{
    quote: "some content", 
    source: "some content", 
    title: "some content", 
    is_public: true, 
    categories: [
      %{id: 1, name: "General", description: "General_Category"},
      %{id: 2, name: "Test", description: "Test_Category"}
    ]
  }

  test "changeset with valid attributes" do
    changeset = Citation.changeset(%Citation{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Citation.changeset(%Citation{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "category_ids with valid data structure" do
    categories = Citation.category_ids(@with_categories)
    assert length(categories) == 2
    
    [a, b] = categories
    assert a == 1
    assert b == 2
  end

  test "category_ids with invalid data structure" do
    categories = Citation.category_ids(nil)

    refute categories |> Enum.any?
  end
end
