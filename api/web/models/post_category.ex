defmodule Microblogger.PostCategory do
  use Microblogger.Web, :model

  schema "post_categories" do
    belongs_to :post, Microblogger.Post
    belongs_to :category, Microblogger.Category

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
      |> cast(params, [:post_id, :category_id])
      |> validate_required([:post_id, :category_id])
      |> unique_constraint(:post_id_category_id)
  end

  # Accepts a post and category
  def assoc_post_with_category(post, cat) do
    post_cat = %{post_id: post.id, category_id: cat.id}
    Microblogger.PostCategory.changeset(%Microblogger.PostCategory{}, post_cat)
  end

  # Accepts a category and post
  def assoc_category_with_post(cat, post) do
    post_cat = %{post_id: post.id, category_id: cat.id}
    Microblogger.PostCategory.changeset(%Microblogger.PostCategory{}, post_cat)
  end

  # Accepts a category id and post id
  def assoc_category_id_with_post_id(cat, post) do
    post_cat = %{post_id: post, category_id: cat}
    Microblogger.PostCategory.changeset(%Microblogger.PostCategory{}, post_cat)
  end
end
