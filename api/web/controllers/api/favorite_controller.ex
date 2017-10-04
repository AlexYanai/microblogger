defmodule Cite.FavoriteController do
  use Cite.Web, :controller

  alias Cite.{Repo, Favorite}

  plug Guardian.Plug.EnsureAuthenticated, handler: Cite.SessionController

  def favorites(conn, params) do
    user = Guardian.Plug.current_resource(conn)
    page = Favorite.get_citations(params, user)
      |> Repo.paginate(page: params["page"], page_size: 5)

    entries = page.entries |> Enum.map(fn c -> c.citation end)

    render(conn, Cite.CitationView, "paginated.json", %{citations: entries, pagination: Cite.PaginationHelpers.pagination(page)})
  end

  def create(conn, %{"citation_id" => id, "user_id" => user_id}) do
    favorite = Favorite.changeset(%Favorite{}, %{citation_id: id, user_id: user_id}) 
      |> Repo.insert!

    conn
      |> put_status(:created)
      |> render("show.json", favorite: favorite)
  end

  def delete(conn, %{"id" => id, "user_id" => user_id}) do
    Favorite 
      |> where([citation_id: ^id, user_id: ^user_id])
      |> Repo.one
      |> Repo.delete!

    conn
      |> put_status(:ok)
      |> render("delete.json")
  end
end
