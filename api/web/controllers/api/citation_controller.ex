defmodule Cite.CitationController do
  use Cite.Web, :controller

  alias Cite.{Citation, Category, CitationCategory, CitationQuery}

  plug Guardian.Plug.EnsureAuthenticated, handler: Cite.SessionController

  def paginated_citations(conn, params) do
    page = Citation.extract_categories(params) 
      |> CitationQuery.build(params, false)
      |> Repo.paginate(page: params["page"], page_size: 5)

    render(conn, "paginated.json", %{citations: page.entries, pagination: Cite.PaginationHelpers.pagination(page)})
  end

  def public_citations(conn, params) do
    page = Citation.extract_categories(params)     
      |> CitationQuery.build(params, true)
      |> Repo.paginate(page: params["page"], page_size: 5)

    render(conn, "paginated.json", %{citations: page.entries, pagination: Cite.PaginationHelpers.pagination(page)})
  end

  def create(conn, %{"citation" => params}) do
    current_user = Guardian.Plug.current_resource(conn)

    changeset = current_user
      |> build_assoc(:citations)
      |> Citation.changeset(params)

    case Repo.insert(changeset) do
      {:ok, citation} ->
        add_categories(params["categories"], citation)
        citation = citation |> Repo.preload([:categories, :favorites])

        conn
          |> put_status(:created)
          |> render("show.json", citation: citation)
      {:error, changeset} ->
        conn
          |> put_status(:unprocessable_entity)
          |> render(Cite.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def add_categories(categories, citation) do
    if !!categories && Enum.any?(categories) do
      categories
        |> Enum.map(fn n -> Category.find_by_name(n) end)
        |> Enum.map(&CitationCategory.assoc_category_with_citation(&1, citation))
        |> Enum.each(&Repo.insert!(&1))
    end
  end

  def show(conn, %{"id" => id}) do
    citation = Repo.get!(Citation, id)
    render(conn, "show.json", citation: citation)
  end

  def update(conn, %{"id" => id, "citation" => params}) do
    remote = params["categories"]
    params = params |> Map.drop(["categories"])
    
    citation = Citation 
      |> Repo.get!(id) 
      |> Repo.preload([:categories, :favorites])

    update_or_delete({any_remote?(remote), any_existing?(citation)}, citation, remote)
    changeset = Citation.changeset(citation, params)

    case Repo.update(changeset) do
      {:ok, citation} ->
        render(conn, "show.json", citation: citation)
      {:error, changeset} ->
        conn
          |> put_status(:unprocessable_entity)
          |> render(Cite.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def any_remote?(remote) do
    Enum.any?(remote)
  end

  def any_existing?(citation) do
    Enum.any?(Citation.category_ids(citation))
  end

  def update_or_delete({false, false}, _, _) do
    nil
  end

  def update_or_delete({false, true}, citation, _) do
    delete_all(citation.id, Citation.category_ids(citation))
  end

  def update_or_delete({_, _}, citation, remote) do
    existing    = Citation.category_ids(citation)
    citation_id = citation.id
    delete_all(citation_id, existing)

    # Not the most elegant solution but works - will revise
    # Currently deleting all existing CitationCategory associations then creating again
    remote
      |> Enum.map(fn n -> Repo.get_by(Category, name: n) end) 
      |> Enum.map(fn m -> m.id end)
      |> Enum.map(&CitationCategory.assoc_category_id_with_citation_id(&1, citation_id))
      |> Enum.each(&Repo.insert!(&1))
  end

  def delete_all(citation_id, existing) do
    existing 
      |> Enum.map(fn m -> Category.find_by_cc(citation_id, m) end) 
      |> Enum.map(fn n -> Repo.delete!(n) end)
  end

  def delete(conn, %{"id" => id}) do
    Citation |> Repo.get(id)|> Repo.delete!

    conn
      |> put_status(:ok)
      |> render("delete.json")
  end
end
