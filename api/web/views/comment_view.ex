defmodule Microblogger.CommentView do
  use Microblogger.Web, :view

  def render("paginated.json", %{comments: comments, pagination: pagination}) do
    %{
      data: render_many(comments, Microblogger.CommentView, "show.json"),
      pagination: pagination
    }
  end

  def render("index.json", %{comments: comments}) do
    %{data: render_many(comments, Microblogger.CommentView, "comment.json")}
  end

  def render("show.json", %{comment: comment}) do
    %{data: render_one(comment, Microblogger.CommentView, "comment.json")}
  end

  def render("comment.json", %{comment: comment}) do
    %{id: comment.id,
      body: comment.body,
      username: comment.author_name,
      email: comment.author_email,
      user_id: comment.user_id,
      inserted_at: comment.inserted_at,
      post_id: comment.post_id
    }
  end

  def render("delete.json", _) do
    %{ok: true}
  end
end
