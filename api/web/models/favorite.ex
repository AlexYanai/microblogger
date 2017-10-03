defmodule Cite.Favorite do
  use Cite.Web, :model
  alias Cite.{Citation, Favorite, Category, Repo}

  schema "favorites" do
    belongs_to :citation, Cite.Citation, foreign_key: :citation_id
    belongs_to :user, Cite.User, foreign_key: :user_id

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:citation_id, :user_id])
    |> validate_required([:citation_id, :user_id])
  end

  def get_citations(page, user) do
    Favorite 
      |> where([f], f.user_id == ^user.id) 
      |> order_by([desc: :inserted_at, desc: :id]) 
      |> preload([:citation, citation: :categories, citation: :favorites]) 
  end
end
