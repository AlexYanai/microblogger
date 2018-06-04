defmodule Microblogger.CommentController do
  use Microblogger.Web, :controller

  alias Microblogger.{Repo, Comment, Post, User}

  plug Guardian.Plug.EnsureAuthenticated, handler: Microblogger.SessionController

  # def favorites(conn, params) do
  #   user = Guardian.Plug.current_resource(conn)
  #   page = Post.extract_categories(params) 
  #     |> CommentQuery.build(user.id)
  #     |> Repo.paginate(page: params["page"], page_size: 5)

  #   entries = Comment.posts(page)

  #   render(conn, Microblogger.PostView, "paginated.json", %{posts: entries, pagination: Microblogger.PaginationHelpers.pagination(page)})
  # end

  def index(conn, %{"user_id" => user_id}) do
    user     = User |> Repo.get(user_id)
    comments = user |> assoc(:comments) |> Repo.all
    comments = Comment.add_author_name_and_email(comments, user)

    render(conn, "index.json", %{comments: comments})
  end

  def create(conn, %{"post_id" => post_id, "user_id" => _user_id}) do
    user     = Guardian.Plug.current_resource(conn)
    comment  = Comment.changeset(%Comment{}, %{post_id: post_id, user_id: user.id}) 
      |> Repo.insert!

    conn
      |> put_status(:created)
      |> render("show.json", comment: comment)
  end

  def delete(conn, %{"id" => id, "user_id" => _user_id}) do
    user = Guardian.Plug.current_resource(conn)
    Comment 
      |> where([post_id: ^id, user_id: ^user.id])
      |> Repo.one
      |> Repo.delete!

    conn
      |> put_status(:ok)
      |> render("delete.json")
  end
end
