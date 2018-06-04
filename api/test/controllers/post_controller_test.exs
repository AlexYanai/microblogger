defmodule Microblogger.PostControllerTest do
  use Microblogger.ConnCase

  alias Microblogger.{Post, User, Category, PostCategory, Comment}

  @user_attrs %{email: "some_email", password: "some_pass", bio: "some_bio", username: "some_user"}
  @user_attrs1 %{email: "some_email1", password: "some_pass1", bio: "some_bio1", username: "some_user1"}
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
      |> Enum.map(&User.create_post(&1, current_user))
      |> Enum.each(&Repo.insert!(&1))

    user_posts = current_user |> Repo.preload(:posts)
    posts      = user_posts.posts
    post       = posts |> Enum.at(0)

    c1 = %{
      body: "test1", 
      post_id: post.id, 
      user_id: current_user.id, 
      author_name: current_user.username,
      author_email: current_user.email
    }

    c2 = %{
      body: "test2", 
      post_id: post.id, 
      user_id: current_user.id, 
      author_name: current_user.username,
      author_email: current_user.email
    }

    Ecto.build_assoc(current_user, :comments, c1) |> Repo.insert
    Ecto.build_assoc(current_user, :comments, c2) |> Repo.insert

    conn = build_conn() 
      |> put_req_header("authorization", "Bearer #{jwt}")

    {:ok, conn: conn, user: current_user}
  end

  test "returns all publicly-flagged records", %{conn: conn, user: user} do
    conn = get(conn, post_path(build_conn(), :public_posts, user))
    data = json_response(conn, 200)["data"]

    assert length(data) == 2
    assert data |> Enum.all?(fn n -> n["data"]["is_public"] end)
  end

  test "create post and associate it with user and categories", %{conn: conn, user: user} do
    [
      %{name: "General", description: "General_Category"},
      %{name: "Random", description: "Random_Category"}
    ]
      |> Enum.map(&Category.changeset(%Category{}, &1))
      |> Enum.each(&Repo.insert!(&1))

    post_params = %{
      quote: "some_quote", 
      source: "some_source", 
      title: "some_title",
      is_public: true,
      user_id: user.id,
      categories: ["General", "Random"]
    }

    conn = conn |> post(user_post_path(build_conn(), :create, user), %{"post" => post_params})
    data = json_response(conn, 201)["data"]
    
    assert conn.status == 201
    assert length(data["categories"]) == 2
    assert data["quote"] == post_params.quote
  end

  test "update post and associated categories if no categories given", %{conn: conn, user: user} do
    [
      %{name: "General", description: "General_Category"},
      %{name: "Random", description: "Random_Category"}
    ]
      |> Enum.map(&Category.changeset(%Category{}, &1))
      |> Enum.each(&Repo.insert!(&1))

    post = @valid_attrs 
      |> User.create_post(user)
      |> Repo.insert!

    post_params = %{
      quote: "a", 
      source: "b", 
      title: "c",
      id: post.id,
      is_public: true,
      user_id: user.id,
      categories: ["General", "Random"]
    }

    conn = conn |> patch(user_post_path(build_conn(), :update, user, post), %{"id" => post.id, "post" => post_params})
    data = json_response(conn, 200)["data"]

    new_post = Post 
      |> Repo.get(post.id) 
      |> Repo.preload(:categories)

    assert conn.status == 200
    refute data["title"] == post.title
    assert data["title"] == post_params.title
    assert length(new_post.categories) == length(post_params.categories)
  end

  test "update post if update params have 0 categories but post already has some associated", %{conn: conn, user: user} do
    [
      %{name: "TestOne", description: "TestOne_Category"},
      %{name: "Random", description: "Random_Category"}
    ]
      |> Enum.map(&Category.changeset(%Category{}, &1))
      |> Enum.each(&Repo.insert!(&1))

    category = Category |> Repo.get_by(name: "TestOne")

    post = @valid_attrs 
      |> User.create_post(user)
      |> Repo.insert!

    Repo.all(assoc(user, :posts))
      |> Enum.map(&PostCategory.assoc_post_with_category(&1, category))
      |> Enum.each(&Repo.insert!(&1))

    post_params = %{
      quote: "a", 
      source: "b", 
      title: "c",
      id: post.id,
      is_public: true,
      user_id: user.id,
      categories: []
    }

    conn = conn |> patch(user_post_path(build_conn(), :update, user, post), %{"id" => post.id, "post" => post_params})

    new_post = Post 
      |> Repo.get(post.id) 
      |> Repo.preload(:categories)

    assert conn.status == 200
    assert length(new_post.categories) == length(post_params.categories)
  end

  test "gets all comments associated with post", %{conn: conn, user: user} do
    user_posts = user |> Repo.preload(:posts)
    post       = user_posts.posts |> Enum.at(0)

    conn = conn |> get(post_path(build_conn(), :comments, post), %{"id" => post.id})
    data = json_response(conn, 200)["data"]
    
    assert conn.status == 200
    assert length(data) == 2
  end

  test "user is forbidden from accessing private posts and comments", %{conn: conn, user: _user} do
    other_user = User.registration_changeset(%User{}, @user_attrs1) |> Repo.insert!
    User.create_post(%{title: "t", source: "s", quote: "r.", is_public: false}, other_user)
      |> Repo.insert!

    user_posts = other_user |> Repo.preload(:posts)
    posts      = user_posts.posts
    post       = posts |> Enum.at(0)

    c = %{
      body: "test1", 
      post_id: post.id, 
      user_id: other_user.id, 
      author_name: other_user.username,
      author_email: other_user.email
    }

    other_user
      |> build_assoc(:comments)
      |> Comment.changeset(c)
      |> Repo.insert!

    conn = conn |> get(post_path(build_conn(), :comments, post), %{"id" => post.id})
    assert conn.status == 403
  end
end
