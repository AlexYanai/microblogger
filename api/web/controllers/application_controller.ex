defmodule Cite.ApplicationController do
  use Cite.Web, :controller

  def not_found(conn, _params) do
    conn
    |> put_status(:not_found)
    |> render(Cite.ApplicationView, "not_found.json")
  end
end