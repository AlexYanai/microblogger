defmodule Cite.Favorite do
  use Cite.Web, :model
  alias Cite.{Citation, Favorite, Category, Repo}

  schema "favorites" do
    belongs_to :citation, Cite.Citation, foreign_key: :citation_id
    belongs_to :user, Cite.User, foreign_key: :user_id

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:citation_id, :user_id])
    |> validate_required([:citation_id, :user_id])
  end

  def extract_citations(page) do
    page.entries |> Enum.map(fn c -> c.citation end)
  end
end
