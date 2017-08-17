defmodule Cite.CitationChannel do
  use Cite.Web, :channel

  def join("citations:" <> citation_id, _params, socket) do
    citation = Repo.get!(Cite.Citation, citation_id)

    response = %{
      citation: Phoenix.View.render_one(citation, Cite.CitationView, "citation.json"),
    }

    {:ok, response, assign(socket, :citation, citation)}
  end

  def terminate(_reason, socket) do
    {:ok, socket}
  end
end