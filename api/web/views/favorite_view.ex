defmodule Microblogger.FavoriteView do
  use Microblogger.Web, :view

  def render("index.json", %{favorites: favorites}) do
    %{data: render_many(favorites, Microblogger.FavoriteView, "favorite.json")}
  end

  def render("show.json", %{favorite: favorite}) do
    %{data: render_one(favorite, Microblogger.FavoriteView, "favorite.json")}
  end

  def render("favorite.json", %{favorite: favorite}) do
    %{id: favorite.id,
      post_id: favorite.post_id,
      user_id: favorite.user_id}
  end

  def render("delete.json", _) do
    %{ok: true}
  end
end
