defmodule Microblogger.CommentController do
  use Microblogger.Web, :controller

  alias Microblogger.{Repo, Comment, User}

  plug Guardian.Plug.EnsureAuthenticated, handler: Microblogger.SessionController

  def index(conn, %{"user_id" => user_id}) do
    user     = User |> Repo.get(user_id)
    comments = user |> assoc(:comments) |> Repo.all

    render(conn, "index.json", %{comments: comments})
  end

  def create(conn, %{"comment" => params}) do
    current_user   = Guardian.Plug.current_resource(conn)
    comment_params = %{
      body: params["body"], 
      author_name: params["author_name"], 
      author_email: params["author_email"], 
      post_id: params["post_id"], 
      user_id: params["user_id"]
    }

    changeset = current_user
      |> build_assoc(:comments)
      |> Comment.changeset(comment_params)

    case Repo.insert(changeset) do
      {:ok, comment} ->
        conn
          |> put_status(:created)
          |> render("show.json", comment: comment)
      {:error, changeset} ->
        conn
          |> put_status(:unprocessable_entity)
          |> render(Microblogger.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def update(conn, %{"comment" => params}) do
    current_user = Guardian.Plug.current_resource(conn)
    comment      = Comment |> Repo.get!(params["id"])
    changeset    = Comment.changeset(comment, params)

    case Repo.update(changeset) do
      {:ok, comment} ->
        render(conn, "show.json", comment: comment)
      {:error, changeset} ->
        conn
          |> put_status(:unprocessable_entity)
          |> render(Microblogger.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id, "user_id" => user_id}) do
    Comment |> Repo.get(id)|> Repo.delete!

    conn
      |> put_status(:ok)
      |> render("delete.json")
  end
end
