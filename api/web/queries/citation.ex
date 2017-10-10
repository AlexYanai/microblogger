defmodule Cite.CitationQuery do
  import Ecto.Query
  alias Cite.{Citation, Favorite, Repo}

  def build(cat_names, params, is_public) do
    user_id = params["id"] |> String.to_integer
    faves   = from f in Favorite, where: f.user_id == ^user_id

    q = from c in Citation
    q = public_query(q, is_public)
    q = get_categories(q, cat_names)
    q = from c in q, preload: [:categories, favorites: ^faves]
    q = from c in q, distinct: [desc: c.id]
    q = from c in q, order_by: [desc: c.id]
    
    from c in q, select: c
  end

  def public_query(q, false) do
    q
  end

  def public_query(q, true) do
    from c in q, where: c.is_public
  end

  def get_categories(q, [""]) do
    q
  end

  def get_categories(q, cat_names) do
    from c in q, join: a in assoc(c, :categories), where: a.name in ^cat_names
  end
end