defmodule Cite.CitationControllerTest do
  use Cite.ConnCase

  alias Cite.Citation
  @valid_attrs %{quote: "some content", source: "some content", title: "some content"}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, citation_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    citation = Repo.insert! %Citation{}
    conn = get conn, citation_path(conn, :show, citation)
    assert json_response(conn, 200)["data"] == %{"id" => citation.id,
      "title" => citation.title,
      "source" => citation.source,
      "quote" => citation.quote,
      "user_id" => citation.user_id}
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, citation_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    conn = post conn, citation_path(conn, :create), citation: @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Citation, @valid_attrs)
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, citation_path(conn, :create), citation: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    citation = Repo.insert! %Citation{}
    conn = put conn, citation_path(conn, :update, citation), citation: @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Citation, @valid_attrs)
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
    citation = Repo.insert! %Citation{}
    conn = put conn, citation_path(conn, :update, citation), citation: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn} do
    citation = Repo.insert! %Citation{}
    conn = delete conn, citation_path(conn, :delete, citation)
    assert response(conn, 204)
    refute Repo.get(Citation, citation.id)
  end
end
