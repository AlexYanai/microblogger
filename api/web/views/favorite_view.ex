defmodule Cite.FavoriteView do
  use Cite.Web, :view

  def render("index.json", %{favorites: favorites}) do
    %{data: render_many(favorites, Cite.FavoriteView, "favorite.json")}
  end

  def render("show.json", %{favorite: favorite}) do
    %{data: render_one(favorite, Cite.FavoriteView, "favorite.json")}
  end

  def render("favorite.json", %{favorite: favorite}) do
    %{id: favorite.id,
      citation_id: favorite.citation_id,
      user_id: favorite.user_id}
  end

  def render("delete.json", _) do
    %{ok: true}
  end
end
