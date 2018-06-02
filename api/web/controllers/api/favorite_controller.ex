defmodule Microblogger.FavoriteController do
  use Microblogger.Web, :controller

  alias Microblogger.{Repo, Favorite, Post, FavoriteQuery}

  plug Guardian.Plug.EnsureAuthenticated, handler: Microblogger.SessionController

  def favorites(conn, params) do
    user = Guardian.Plug.current_resource(conn)
    page = Post.extract_categories(params) 
      |> FavoriteQuery.build(user.id)
      |> Repo.paginate(page: params["page"], page_size: 5)

    entries = Favorite.posts(page)

    render(conn, Microblogger.PostView, "paginated.json", %{posts: entries, pagination: Microblogger.PaginationHelpers.pagination(page)})
  end

  def create(conn, %{"post_id" => id, "user_id" => _user_id}) do
    user     = Guardian.Plug.current_resource(conn)
    favorite = Favorite.changeset(%Favorite{}, %{post_id: id, user_id: user.id}) 
      |> Repo.insert!

    conn
      |> put_status(:created)
      |> render("show.json", favorite: favorite)
  end

  def delete(conn, %{"id" => id, "user_id" => _user_id}) do
    user = Guardian.Plug.current_resource(conn)
    Favorite 
      |> where([post_id: ^id, user_id: ^user.id])
      |> Repo.one
      |> Repo.delete!

    conn
      |> put_status(:ok)
      |> render("delete.json")
  end
end
