defmodule Cite.CitationController do
  use Cite.Web, :controller

  alias Cite.{Citation, Category, CitationCategory}

  plug Guardian.Plug.EnsureAuthenticated, handler: Cite.SessionController

  def filter_citations(conn, params) do
    c = params["categories"] |> String.split(",")

    page = Citation.query_by_categories(c, params["page"], params["id"])
      |> Repo.paginate(page: params["page"], page_size: 5)

    render(conn, "paginated.json", %{citations: page.entries, pagination: Cite.PaginationHelpers.pagination(page)})
  end

  def paginated_citations(conn, params) do
    page = Citation.query_by_categories([""], params["page"], params["id"])
      |> Repo.paginate(page: params["page"], page_size: 5)

    render(conn, "paginated.json", %{citations: page.entries, pagination: Cite.PaginationHelpers.pagination(page)})
  end

  def public_citations(conn, _params) do
    ff = from f in Favorite, where: f.user_id == 1
    
    page = Citation 
      |> where([m], m.is_public == true) 
      |> order_by([desc: :inserted_at, desc: :id]) 
      |> preload([:categories, favorites: ^ff]) 
      |> Repo.paginate(page: _params["page"], page_size: 5)

    render(conn, "paginated.json", %{citations: page.entries, pagination: Cite.PaginationHelpers.pagination(page)})
  end

  def favorites(conn, params) do
    user = Guardian.Plug.current_resource(conn)
    page = Favorite 
      |> where([f], f.user_id == ^user.id) 
      |> order_by([desc: :inserted_at, desc: :id]) 
      |> preload([:citation, citation: :categories]) 
      |> Repo.paginate(page: params["page"], page_size: 5)

    render(conn, "paginated.json", %{citations: page.entries, pagination: Cite.PaginationHelpers.pagination(page)})
  end

  def qq(n), do: (from c in Category, where: c.name == ^n, select: c) |> Repo.one

  def create(conn, %{"citation" => citation_params}) do
    categories   = citation_params["categories"]
    current_user = Guardian.Plug.current_resource(conn)

    changeset    = current_user
      |> build_assoc(:citations)
      |> Citation.changeset(citation_params)

    case Repo.insert(changeset) do
      {:ok, citation} ->
        if !!categories && Enum.any?(categories) do
          categories
            |> Enum.map(fn n -> qq(n) end)
            |> Enum.map(&CitationCategory.assoc_category_with_citation(&1, citation))
            |> Enum.each(&Repo.insert!(&1))
        end

        citation = citation 
          |> Repo.preload(:categories)
          |> Repo.preload(:favorites)

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
    remote_categories = citation_params["categories"]
    citation_params   = citation_params |> Map.drop(["categories"])
    
    citation = Citation 
      |> Repo.get!(id) 
      |> Repo.preload(:categories)
      |> Repo.preload(:favorites)

    any_remote   = Enum.any?(remote_categories)
    any_existing = Enum.any?(Citation.category_ids(citation))

    case {any_remote, any_existing} do
      {false, false} -> nil
      {false, true}  -> delete_all(citation.id, Citation.category_ids(citation))
      _              -> set_categories(citation, remote_categories, Citation.category_ids(citation))
    end

    changeset  = Citation.changeset(citation, citation_params)

    case Repo.update(changeset) do
      {:ok, citation} ->
        render(conn, "show.json", citation: citation)
      {:error, changeset} ->
        conn
          |> put_status(:unprocessable_entity)
          |> render(Cite.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def cc(n,m), do: (from c in CitationCategory, where: c.citation_id == ^n and c.category_id == ^m, select: c) |> Repo.one
  
  # Not the most elegant solution but works - will revise
  # Currently deleting all existing CitationCategory associations then creating again
  def set_categories(citation, remote, existing) do
    n = citation.id

    delete_all(n, existing)

    remote
      |> Enum.map(fn n -> Repo.get_by(Category, name: n) end) 
      |> Enum.map(fn m -> m.id end)
      |> Enum.map(&CitationCategory.assoc_category_id_with_citation_id(&1, n))
      |> Enum.each(&Repo.insert!(&1))
  end

  def delete_all(citation_id, existing) do
    existing 
      |> Enum.map(fn m -> cc(citation_id, m) end) 
      |> Enum.map(fn n -> Repo.delete!(n) end)
  end

  def delete(conn, %{"id" => id}) do
    citation = Repo.get!(Citation, id)
    Repo.delete!(citation)

    conn
      |> put_status(:ok)
      |> render("delete.json")
  end
end


