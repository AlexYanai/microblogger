defmodule Microblogger.Router do
  use Microblogger.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
  end

  scope "/", Microblogger do
    pipe_through :browser
  end

  scope "/api", Microblogger do
    pipe_through :api

    post "/sessions", SessionController, :create
    delete "/sessions", SessionController, :delete
    post "/sessions/refresh", SessionController, :refresh
    get "/users/:id/public", PostController, :public_posts
    get "/users/:id/favorites", FavoriteController, :favorites
    get "/users/:id/posts", UserController, :posts
    post "/users/:id/favorite_post", PostController, :favorite_post
    get "/users/:id/paginated_posts", PostController, :paginated_posts
    get "/users/:id/filter_posts", PostController, :filter_posts

    resources "/users", UserController do
      resources "/posts", PostController, except: [:index]
      resources "/favorites", FavoriteController, only: [:create, :delete]
      resources "/comments", CommentController#, only: [:create, :delete]
    end

    resources "/categories", CategoryController do
      resources "/posts", PostController
    end
  end
end