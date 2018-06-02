defmodule Microblogger.PostTest do
  use Microblogger.ModelCase

  alias Microblogger.Post

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
    changeset = Post.changeset(%Post{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Post.changeset(%Post{}, @invalid_attrs)
    refute changeset.valid?
  end

  test "category_ids with valid data structure" do
    categories = Post.category_ids(@with_categories)
    assert length(categories) == 2
    
    [a, b] = categories
    assert a == 1
    assert b == 2
  end

  test "category_ids with invalid data structure" do
    categories = Post.category_ids(nil)

    refute categories |> Enum.any?
  end

  test "extract_categories with nil" do
    params     = %{}
    categories = Post.extract_categories(params)

    assert categories == [""]
  end

  test "extract_categories with single empty string" do
    params     = %{"categories" => [""]}
    categories = Post.extract_categories(params)

    assert categories == [""]
  end

  test "extract_categories with correctly formatted string" do
    params = %{"categories" => "one,two,three"}
    count  = Post.extract_categories(params) |> Enum.count

    assert count == 3
  end
end
