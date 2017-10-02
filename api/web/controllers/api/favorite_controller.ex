defmodule Cite.FavoriteController do
  use Cite.Web, :controller

  alias Cite.{Repo, Favorite}

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
