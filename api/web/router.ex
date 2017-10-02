defmodule Cite.Router do
  use Cite.Web, :router

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

  scope "/", Cite do
    pipe_through :browser
  end

  scope "/api", Cite do
    pipe_through :api

    post "/sessions", SessionController, :create
    delete "/sessions", SessionController, :delete
    post "/sessions/refresh", SessionController, :refresh
    get "/citations", CitationController, :public_citations
    get "/users/:id/favorites", CitationController, :favorites
    post "/users/:id/favorite_citation", CitationController, :favorite_citation
    get "/users/:id/citations", UserController, :citations
    get "/users/:id/paginated_citations", CitationController, :paginated_citations
    get "/users/:id/filter_citations", CitationController, :filter_citations

    resources "/users", UserController do
      resources "/citations", CitationController
      # resources "/favorites", FavoriteController
    end

    resources "/categories", CategoryController do
      resources "/citations", CitationController
    end
  end
end