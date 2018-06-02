defmodule Microblogger.CategoryControllerTest do
  use Microblogger.ConnCase

  # alias Microblogger.Category
  # @valid_attrs %{description: "some_description", name: "some_name"}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end
end
