defmodule Cite.CategoryControllerTest do
  use Cite.ConnCase

  # alias Cite.Category
  # @valid_attrs %{description: "some_description", name: "some_name"}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end
end
