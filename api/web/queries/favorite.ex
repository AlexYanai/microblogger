defmodule Microblogger.FavoriteQuery do
  import Ecto.Query
  alias Microblogger.{Favorite}

  def build(cat_names, user_id) do
    q = from f in Favorite
    q = get_posts(q, cat_names)
    q = from f in q, where: f.user_id == ^user_id
    q = from f in q, preload: [:post, post: :categories, post: :favorites]
    q = from f in q, distinct: [desc: f.id]
    q = from f in q, order_by: [desc: f.id]
    
    from f in q, select: f 
  end

  def get_posts(q, [""]) do
    q
  end

  def get_posts(q, cat_names) do
    from f in q,
      join: c in assoc(f, :post),
      join: a in assoc(c, :categories), 
      where: a.name in ^cat_names
  end
end