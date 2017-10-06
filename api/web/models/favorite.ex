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

  def get_citations(cat_names, user) when cat_names == [""] do
    Favorite 
      |> where([f], f.user_id == ^user.id) 
      |> order_by([desc: :inserted_at, desc: :id]) 
      |> preload([:citation, citation: :categories, citation: :favorites]) 
  end

  def get_citations(cat_names, user) do
      from f in Favorite,
        join: c in assoc(f, :citation),
        join: a in assoc(c, :categories),
        where: f.user_id == ^user.id,
        where: a.name in ^cat_names,
        preload: [:citation, citation: :categories, citation: :favorites],
        distinct: [desc: f.id],
        order_by: [desc: f.id],
      select: f 
  end
end
