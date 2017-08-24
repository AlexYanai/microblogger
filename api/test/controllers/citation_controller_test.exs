defmodule Cite.CitationControllerTest do
  use Cite.ConnCase

  alias Cite.{Citation, User, Category, CitationCategory}
  @user_attrs %{email: "some_email", password: "some_pass", bio: "some_bio", username: "some_user"}
  @valid_attrs %{quote: "some content", source: "some content", title: "some content", is_public: true}

  setup %{conn: _} do
    current_user = User.registration_changeset(%User{}, @user_attrs) |> Repo.insert!
    new_conn     = build_conn() |> post(session_path(build_conn(), :create), @user_attrs)
    jwt          = new_conn.private.guardian_default_jwt

    [
      %{title: "z", source: "y", quote: "x", is_public: true},
      %{title: "w", source: "v", quote: "u", is_public: true},
      %{title: "t", source: "s", quote: "r.", is_public: false}
    ]
      |> Enum.map(&User.create_citation(&1, current_user))
      |> Enum.each(&Repo.insert!(&1))

    conn = build_conn() 
      |> put_req_header("authorization", "Bearer #{jwt}")

    {:ok, conn: conn, user: current_user}
  end

  test "returns all publicly-flagged records", %{conn: conn} do
    conn = get(conn, citation_path(build_conn(), :public_citations))
    data = json_response(conn, 200)["data"]

    assert length(data) == 2
    assert data |> Enum.all?(fn n -> n["is_public"] end)
  end

  test "create citation and associate it with user and categories", %{conn: conn, user: user} do
    [
      %{name: "General", description: "General_Category"},
      %{name: "Random", description: "Random_Category"}
    ]
      |> Enum.map(&Category.changeset(%Category{}, &1))
      |> Enum.each(&Repo.insert!(&1))

    citation_params = %{
      quote: "some_quote", 
      source: "some_source", 
      title: "some_title",
      is_public: true,
      user_id: user.id,
      categories: ["General", "Random"]
    }

    conn = conn |> post(user_citation_path(build_conn(), :create, user), %{"citation" => citation_params})
    data = json_response(conn, 201)["data"]
    
    assert conn.status == 201
    assert length(data["categories"]) == 2
    assert data["quote"] == citation_params.quote
  end

  test "update citation and associated categories if no categories given", %{conn: conn, user: user} do
    [
      %{name: "General", description: "General_Category"},
      %{name: "Random", description: "Random_Category"}
    ]
      |> Enum.map(&Category.changeset(%Category{}, &1))
      |> Enum.each(&Repo.insert!(&1))

    citation = @valid_attrs 
      |> User.create_citation(user)
      |> Repo.insert!

    citation_params = %{
      quote: "a", 
      source: "b", 
      title: "c",
      id: citation.id,
      is_public: true,
      user_id: user.id,
      categories: ["General", "Random"]
    }

    conn = conn |> patch(user_citation_path(build_conn(), :update, user, citation), %{"id" => citation.id, "citation" => citation_params})
    data = json_response(conn, 200)["data"]

    new_citation = Citation 
      |> Repo.get(citation.id) 
      |> Repo.preload(:categories)

    assert conn.status == 200
    refute data["title"] == citation.title
    assert data["title"] == citation_params.title
    assert length(new_citation.categories) == length(citation_params.categories)
  end

  test "update citation if update params have 0 categories but citation already has some associated", %{conn: conn, user: user} do
    [
      %{name: "TestOne", description: "TestOne_Category"},
      %{name: "Random", description: "Random_Category"}
    ]
      |> Enum.map(&Category.changeset(%Category{}, &1))
      |> Enum.each(&Repo.insert!(&1))

    category = Category |> Repo.get_by(name: "TestOne")

    citation = @valid_attrs 
      |> User.create_citation(user)
      |> Repo.insert!

    Repo.all(assoc(user, :citations))
      |> Enum.map(&CitationCategory.assoc_citation_with_category(&1, category))
      |> Enum.each(&Repo.insert!(&1))

    citation_params = %{
      quote: "a", 
      source: "b", 
      title: "c",
      id: citation.id,
      is_public: true,
      user_id: user.id,
      categories: []
    }

    conn = conn |> patch(user_citation_path(build_conn(), :update, user, citation), %{"id" => citation.id, "citation" => citation_params})

    new_citation = Citation 
      |> Repo.get(citation.id) 
      |> Repo.preload(:categories)

    assert conn.status == 200
    assert length(new_citation.categories) == length(citation_params.categories)
  end
end
