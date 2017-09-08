defmodule Cite.Citation do
  use Cite.Web, :model
  alias Cite.{Citation, Repo}

  schema "citations" do
    field :title, :string
    field :source, :string
    field :quote, :string
    field :is_public, :boolean
    belongs_to :user, Cite.User
    has_many :favorites, Cite.Favorite
    many_to_many :categories, Cite.Category, join_through: "citation_categories", on_delete: :delete_all

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :source, :quote, :is_public])
    |> validate_required([:title, :source, :quote])
  end

  def category_ids(citation) do
    case !!citation and citation.categories do
      nil   -> []
      false -> []
      _     -> Enum.map(citation.categories, fn n -> n.id end)
    end
  end

  def select_categories(cat_names) do
    Repo.all(
      from c in Citation, 
        join: a in assoc(c, :categories), 
        where: a.name in ^cat_names, 
      select: c
    )
  end

  def query_by_categories(cat_names, user_id) when cat_names == [""] do
    from c in Citation, 
      join: a in assoc(c, :categories),
      where: c.user_id == ^user_id,
      preload: [:categories],
      distinct: [desc: c.id],
      order_by: [desc: c.id],
    select: c
  end

  def query_by_categories(cat_names, user_id) do
    from c in Citation, 
      join: a in assoc(c, :categories),
      where: c.user_id == ^user_id,
      where: a.name in ^cat_names,
      preload: [:categories],
      distinct: [desc: c.id],
      order_by: [desc: c.id],
    select: c
  end
end
