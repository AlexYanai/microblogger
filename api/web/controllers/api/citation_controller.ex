defmodule Cite.CitationController do
  use Cite.Web, :controller

  alias Cite.Citation

  plug Guardian.Plug.EnsureAuthenticated, handler: Cite.SessionController

  def public_citations(conn, _params) do
    citations = Citation 
      |> where([m], m.is_public == true) 
      |> order_by([desc: :inserted_at, desc: :id]) 
      |> Repo.all

    render(conn, "index.json", citations: citations)
  end

  def create(conn, %{"citation" => citation_params}) do
    changeset = Guardian.Plug.current_resource(conn)
      |> build_assoc(:citations)
      |> Citation.changeset(citation_params)

    case Repo.insert(changeset) do
      {:ok, citation} ->
        conn
          |> put_status(:created)
          |> render("show.json", citation: citation)
      {:error, changeset} ->
        conn
          |> put_status(:unprocessable_entity)
          |> render(Cite.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    citation = Repo.get!(Citation, id)
    render(conn, "show.json", citation: citation)
  end

  def update(conn, %{"id" => id, "citation" => citation_params}) do
    citation  = Repo.get!(Citation, id)
    changeset = Citation.changeset(citation, citation_params)

    case Repo.update(changeset) do
      {:ok, citation} ->
        render(conn, "show.json", citation: citation)
      {:error, changeset} ->
        conn
          |> put_status(:unprocessable_entity)
          |> render(Cite.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    citation = Repo.get!(Citation, id)
    Repo.delete!(citation)

    conn
      |> put_status(:ok)
      |> render("delete.json")
  end
end
