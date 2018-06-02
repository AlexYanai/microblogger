defmodule Microblogger.Post do
  use Microblogger.Web, :model
  alias Microblogger.{Post, Favorite, Repo}

  schema "posts" do
    field :title, :string
    field :source, :string
    field :quote, :string
    field :author_name, :string
    field :author_email, :string
    field :is_public, :boolean
    belongs_to :user, Microblogger.User
    has_many :favorites, Microblogger.Favorite, on_delete: :delete_all
    many_to_many :categories, Microblogger.Category, join_through: "post_categories", on_delete: :delete_all

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

  def exists?(post) do
    !!post and !!post.categories
  end

  def category_ids(post) do
    get_cat_ids(exists?(post), post)
  end

  def get_cat_ids(true, post) do
    Enum.map(post.categories, fn n -> n.id end)
  end

  def get_cat_ids(_, _) do
    []
  end
end
