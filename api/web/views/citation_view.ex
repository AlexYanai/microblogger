defmodule Cite.CitationView do
  use Cite.Web, :view

  def render("paginated.json", %{citations: citations, pagination: pagination}) do
    %{
      data: render_many(citations, Cite.CitationView, "show.json"),
      pagination: pagination
    }
  end

  def render("index.json", %{citations: citations}) do
    %{data: render_many(citations, Cite.CitationView, "citation.json")}
  end

  def render("show.json", %{citation: citation}) do
    %{data: render_one(citation, Cite.CitationView, "citation.json")}
  end

  def render("citation.json", %{citation: citation}) do
    is_favorite = citation.favorites |> Enum.any?

    %{id: citation.id,
      title: citation.title,
      source: citation.source,
      quote: citation.quote,
      is_favorite: is_favorite,
      is_public: citation.is_public,
      inserted_at: citation.inserted_at,
      user_id: citation.user_id,
      username: citation.author_name,
      email: citation.author_email
    }
    |> add_categories(citation.categories)
  end

  defp add_categories(json, category) do
    children = render_many(category, Cite.CategoryView, "category.json")
    json = Map.put(json, :categories, children)
    json
  end

  def render("delete.json", _) do
    %{ok: true}
  end
end
