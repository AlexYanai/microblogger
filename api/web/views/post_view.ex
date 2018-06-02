defmodule Microblogger.PostView do
  use Microblogger.Web, :view

  def render("paginated.json", %{posts: posts, pagination: pagination}) do
    %{
      data: render_many(posts, Microblogger.PostView, "show.json"),
      pagination: pagination
    }
  end

  def render("index.json", %{posts: posts}) do
    %{data: render_many(posts, Microblogger.PostView, "post.json")}
  end

  def render("show.json", %{post: post}) do
    %{data: render_one(post, Microblogger.PostView, "post.json")}
  end

  def render("post.json", %{post: post}) do
    is_favorite = post.favorites |> Enum.any?

    %{id: post.id,
      title: post.title,
      source: post.source,
      quote: post.quote,
      is_favorite: is_favorite,
      is_public: post.is_public,
      inserted_at: post.inserted_at,
      user_id: post.user_id,
      username: post.author_name,
      email: post.author_email
    }
    |> add_categories(post.categories)
  end

  defp add_categories(json, category) do
    children = render_many(category, Microblogger.CategoryView, "category.json")
    json = Map.put(json, :categories, children)
    json
  end

  def render("delete.json", _) do
    %{ok: true}
  end
end
