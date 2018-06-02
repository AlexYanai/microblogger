defmodule Microblogger.PostChannel do
  use Microblogger.Web, :channel

  def join("posts:" <> post_id, _params, socket) do
    post = Repo.get!(Microblogger.Post, post_id)

    response = %{
      post: Phoenix.View.render_one(post, Microblogger.PostView, "post.json"),
    }

    {:ok, response, assign(socket, :post, post)}
  end

  def terminate(_reason, socket) do
    {:ok, socket}
  end
end