defmodule Cite.Category do
  use Cite.Web, :model

  schema "categories" do
    field :name, :string
    field :description, :string
    many_to_many :citations, Cite.Citation, join_through: "citation_categories"

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :description])
    |> validate_required([:name, :description])
  end

  def add_citations(citation, user) do
    Ecto.build_assoc(user, :citations, citation)
  end
end
