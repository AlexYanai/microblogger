defmodule Microblogger.UserController do
  use Microblogger.Web, :controller

  alias Microblogger.{User, Post, Repo}

  plug Guardian.Plug.EnsureAuthenticated, [handler: Microblogger.SessionController] when action in [:posts]

  def create(conn, params) do
    changeset = User.registration_changeset(%User{}, params)

    case Repo.insert(changeset) do
      {:ok, user} ->
        new_conn = Guardian.Plug.api_sign_in(conn, user, :access)
        jwt      = Guardian.Plug.current_token(new_conn)

        new_conn
          |> put_status(:created)
          |> render(Microblogger.SessionView, "show.json", user: user, jwt: jwt)
      {:error, changeset} ->
        conn
          |> put_status(:unprocessable_entity)
          |> render(Microblogger.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    current_user = Repo.get!(User, id)
    changeset    = User.changeset(current_user, user_params)

    case Repo.update(changeset) do
      {:ok, user} ->
        render(conn, "user.json", user: user)
      {:error, changeset} ->
        conn
          |> put_status(:unprocessable_entity)
          |> render(Microblogger.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Repo.get!(User, id)
    render(conn, "user.json", user: user)
  end

  def posts(conn, %{"id" => _user_id}) do
    IO.puts "*********************"
    IO.puts "IN USERS POSTS"
    IO.puts "*********************"
    current_user = Guardian.Plug.current_resource(conn)
    posts    = Post
      |> where([m], m.user_id == ^current_user.id)
      |> order_by([desc: :inserted_at, desc: :id])
      |> Repo.all
      |> Repo.preload(:categories)

    render(conn, Microblogger.PostView, "index.json", %{posts: posts})
  end
end