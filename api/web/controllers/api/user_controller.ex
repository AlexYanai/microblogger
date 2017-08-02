defmodule Cite.UserController do
  use Cite.Web, :controller

  alias Cite.User

  plug Guardian.Plug.EnsureAuthenticated, [handler: Sling.SessionController] when action in [:citations]

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

  def citations(conn, %{"id" => user_id}) do
    current_user = Guardian.Plug.current_resource(conn)
    citations    = Repo.all(assoc(current_user, :citations))
    
    render(conn, Cite.CitationView, "index.json", %{citations: citations})
  end
end