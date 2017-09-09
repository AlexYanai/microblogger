defmodule Cite.FavoriteController do
  use Cite.Web, :controller

  alias Cite.Favorite

  def index(conn, _params) do
    favorites = Repo.all(Favorite)
    render(conn, "index.json", favorites: favorites)
  end
end
