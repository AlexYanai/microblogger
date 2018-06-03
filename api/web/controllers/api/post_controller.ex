defmodule Microblogger.PostController do
  use Microblogger.Web, :controller

  alias Microblogger.{Post, Category, PostCategory, PostQuery}

  plug Guardian.Plug.EnsureAuthenticated, handler: Microblogger.SessionController

  def paginated_posts(conn, params) do
    page = Post.extract_categories(params) 
      |> PostQuery.build(params, false)
      |> Repo.paginate(page: params["page"], page_size: 5)

    render(conn, "paginated.json", %{posts: page.entries, pagination: Microblogger.PaginationHelpers.pagination(page)})
  end

  def public_posts(conn, params) do
    page = Post.extract_categories(params)     
      |> PostQuery.build(params, true)
      |> Repo.paginate(page: params["page"], page_size: 5)

    render(conn, "paginated.json", %{posts: page.entries, pagination: Microblogger.PaginationHelpers.pagination(page)})
  end

  def create(conn, %{"post" => params}) do
    current_user = Guardian.Plug.current_resource(conn)

    changeset = current_user
      |> build_assoc(:posts)
      |> Post.changeset(params)

    case Repo.insert(changeset) do
      {:ok, post} ->
        add_categories(params["categories"], post)
        post = post |> Repo.preload([:categories, :favorites])

        conn
          |> put_status(:created)
          |> render("show.json", post: post)
      {:error, changeset} ->
        conn
          |> put_status(:unprocessable_entity)
          |> render(Microblogger.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def add_categories(categories, post) do
    if !!categories && Enum.any?(categories) do
      categories
        |> Enum.map(fn n -> Category.find_by_name(n) end)
        |> Enum.map(&PostCategory.assoc_category_with_post(&1, post))
        |> Enum.each(&Repo.insert!(&1))
    end
  end

  def show(conn, %{"id" => id, "user_id" => _user_id}) do
    IO.puts "*********************"
    IO.puts "IN POSTS SHOW"
    IO.puts "*********************"

    post = Post 
      |> Repo.get!(id) 
      |> Repo.preload([:categories, :favorites])

    render(conn, "show.json", post: post)
  end

  def update(conn, %{"id" => id, "post" => params}) do
    IO.puts "*********************"
    IO.puts "IN POSTS UPDATE"
    IO.puts "*********************"
    remote = params["categories"]
    params = params |> Map.drop(["categories"])
    
    post = Post 
      |> Repo.get!(id) 
      |> Repo.preload([:categories, :favorites])

    update_or_delete({any_remote?(remote), any_existing?(post)}, post, remote)
    changeset = Post.changeset(post, params)

    case Repo.update(changeset) do
      {:ok, post} ->
        render(conn, "show.json", post: post)
      {:error, changeset} ->
        conn
          |> put_status(:unprocessable_entity)
          |> render(Microblogger.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def any_remote?(remote) do
    Enum.any?(remote)
  end

  def any_existing?(post) do
    Enum.any?(Post.category_ids(post))
  end

  def update_or_delete({false, false}, _, _) do
    nil
  end

  def update_or_delete({false, true}, post, _) do
    delete_all(post.id, Post.category_ids(post))
  end

  def update_or_delete({_, _}, post, remote) do
    existing    = Post.category_ids(post)
    post_id = post.id
    delete_all(post_id, existing)

    # Not the most elegant solution but works - will revise
    # Currently deleting all existing PostCategory associations then creating again
    remote
      |> Enum.map(fn n -> Repo.get_by(Category, name: n) end) 
      |> Enum.map(fn m -> m.id end)
      |> Enum.map(&PostCategory.assoc_category_id_with_post_id(&1, post_id))
      |> Enum.each(&Repo.insert!(&1))
  end

  def delete_all(post_id, existing) do
    existing 
      |> Enum.map(fn m -> Category.find_by_cc(post_id, m) end) 
      |> Enum.map(fn n -> Repo.delete!(n) end)
  end

  def delete(conn, %{"id" => id}) do
    Post |> Repo.get(id)|> Repo.delete!

    conn
      |> put_status(:ok)
      |> render("delete.json")
  end
end
