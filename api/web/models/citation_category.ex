defmodule Cite.CitationCategory do
  use Cite.Web, :model

  schema "citation_categories" do
    belongs_to :citation, Cite.Citation
    belongs_to :category, Cite.Category

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
      |> cast(params, [:citation_id, :category_id])
      |> validate_required([:citation_id, :category_id])
      |> unique_constraint(:citation_id_category_id)
  end

  # Accepts a citation and category
  def assoc_citation_with_category(cite, cat) do
    cite_cat = %{citation_id: cite.id, category_id: cat.id}
    Cite.CitationCategory.changeset(%Cite.CitationCategory{}, cite_cat)
  end

  # Accepts a category and citation
  def assoc_category_with_citation(cat, cite) do
    cite_cat = %{citation_id: cite.id, category_id: cat.id}
    Cite.CitationCategory.changeset(%Cite.CitationCategory{}, cite_cat)
  end

  # Accepts a category id and citation id
  def assoc_category_id_with_citation_id(cat, cite) do
    cite_cat = %{citation_id: cite, category_id: cat}
    Cite.CitationCategory.changeset(%Cite.CitationCategory{}, cite_cat)
  end
end
