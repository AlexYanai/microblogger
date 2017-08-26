defmodule Cite.UserController do
  use Cite.Web, :controller

  alias Cite.{User, Citation, Repo}

  plug Guardian.Plug.EnsureAuthenticated, [handler: Cite.SessionController] when action in [:citations]

  def create(conn, params) do
    changeset = User.registration_changeset(%User{}, params)

    case Repo.insert(changeset) do
      {:ok, user} ->
        new_conn = Guardian.Plug.api_sign_in(conn, user, :access)
        jwt = Guardian.Plug.current_token(new_conn)

        new_conn
        |> put_status(:created)
        |> render(Cite.SessionView, "show.json", user: user, jwt: jwt)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Cite.ChangesetView, "error.json", changeset: changeset)
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
        |> render(Cite.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def citations(conn, %{"id" => user_id}) do
    current_user = Guardian.Plug.current_resource(conn)
    citations    = Citation
      |> where([m], m.user_id == ^current_user.id)
      |> order_by([desc: :inserted_at, desc: :id])
      |> Repo.all
      |> Repo.preload(:categories)

    render(conn, Cite.CitationView, "index.json", %{citations: citations})
  end
end