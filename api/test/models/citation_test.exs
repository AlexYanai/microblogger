defmodule Cite.CitationTest do
  use Cite.ModelCase

  alias Cite.Citation

  @valid_attrs %{quote: "some content", source: "some content", title: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Citation.changeset(%Citation{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Citation.changeset(%Citation{}, @invalid_attrs)
    refute changeset.valid?
  end
end
