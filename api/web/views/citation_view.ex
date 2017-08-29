defmodule Cite.CitationView do
  use Cite.Web, :view

  def render("index.json", %{citations: citations}) do
    %{data: render_many(citations, Cite.CitationView, "citation.json")}
  end

  def render("show.json", %{citation: citation}) do
    %{data: render_one(citation, Cite.CitationView, "citation.json")}
  end

  def render("citation.json", %{citation: citation}) do
    %{id: citation.id,
      title: citation.title,
      source: citation.source,
      quote: citation.quote,
      is_public: citation.is_public,
      inserted_at: citation.inserted_at,
      user_id: citation.user_id
    }
    |> add_categories(citation.categories)
  end

  defp add_categories(json, _category) do
    children = render_many(_category, Cite.CategoryView, "category.json")
    json = Map.put(json, :categories, children)
    json
  end

  def render("delete.json", _) do
    %{ok: true}
  end
end
