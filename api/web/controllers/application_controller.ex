defmodule Microblogger.ApplicationController do
  use Microblogger.Web, :controller

  def not_found(conn, _params) do
    conn
    |> put_status(:not_found)
    |> render(Microblogger.ApplicationView, "not_found.json")
  end
end