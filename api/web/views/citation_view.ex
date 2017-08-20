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
      user_id: citation.user_id}
  end

  def render("delete.json", _) do
    %{ok: true}
  end
end
