defmodule Cite.Category do
  use Cite.Web, :model

  alias Cite.{Category, CitationCategory, Repo}

  schema "categories" do
    field :name, :string
    field :description, :string
    many_to_many :citations, Cite.Citation, join_through: "citation_categories"

    timestamps()
  end

  def find_by_name(n) do 
    (
      from c in Category, 
        where: c.name == ^n, 
      select: c
    ) |> Repo.one
  end

  def find_by_cc(n, m) do
    (
      from c in CitationCategory, 
        where: c.citation_id == ^n and c.category_id == ^m, 
      select: c
    ) 
    |> Repo.one
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :description])
    |> validate_required([:name, :description])
  end
end
