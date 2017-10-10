defmodule Cite.FavoriteController do
  use Cite.Web, :controller

  alias Cite.{Repo, Favorite, Citation, FavoriteQuery}

  plug Guardian.Plug.EnsureAuthenticated, handler: Cite.SessionController

  def favorites(conn, params) do
    user = Guardian.Plug.current_resource(conn)
    page = Citation.extract_categories(params) 
      |> FavoriteQuery.build(user.id)
      |> Repo.paginate(page: params["page"], page_size: 5)
      |> Favorite.extract_citations

    render(conn, Cite.CitationView, "paginated.json", %{citations: page, pagination: Cite.PaginationHelpers.pagination(page)})
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
