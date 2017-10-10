defmodule Cite.Citation do
  use Cite.Web, :model
  alias Cite.{Citation, Favorite, Repo}

  schema "citations" do
    field :title, :string
    field :source, :string
    field :quote, :string
    field :author_name, :string
    field :author_email, :string
    field :is_public, :boolean
    belongs_to :user, Cite.User
    has_many :favorites, Cite.Favorite, on_delete: :delete_all
    many_to_many :categories, Cite.Category, join_through: "citation_categories", on_delete: :delete_all

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :source, :quote, :is_public])
    |> validate_required([:title, :source, :quote])
  end

  def extract_categories(params) do
    extract(params["categories"])
  end

  def extract(cats) when cats == nil or cats == [""] do
    [""]
  end

  def extract(cats) do
    String.split(cats, ",")
  end 

  def exists?(citation) do
    !!citation and !!citation.categories
  end

  def category_ids(citation) do
    get_cat_ids(exists?(citation), citation)
  end

  def get_cat_ids(true, citation) do
    Enum.map(citation.categories, fn n -> n.id end)
  end

  def get_cat_ids(_, _) do
    []
  end
end
