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
    |> cast(params, [])
    |> validate_required([])
  end
end
