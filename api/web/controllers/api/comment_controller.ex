defmodule Microblogger.CommentController do
  use Microblogger.Web, :controller

  alias Microblogger.{Repo, Comment, User}

  plug Guardian.Plug.EnsureAuthenticated, handler: Microblogger.SessionController

  def index(conn, %{"user_id" => user_id}) do
    user     = User |> Repo.get(user_id)
    comments = user |> assoc(:comments) |> Repo.all
    comments = Comment.add_author_name_and_email(comments, user.username, user.email)

    render(conn, "index.json", %{comments: comments})
  end

  def create(conn, %{"post" => params}) do
    current_user   = Guardian.Plug.current_resource(conn)
    comment_params = %{
      body: params["body"], 
      post_id: params["post_id"], 
      user_id: params["user_id"]
    }

    changeset = current_user
      |> build_assoc(:comments)
      |> Comment.changeset(comment_params)

    changeset = Ecto.Changeset.put_change(changeset, :username, current_user.username)
    changeset = Ecto.Changeset.put_change(changeset, :email, current_user.email)

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
