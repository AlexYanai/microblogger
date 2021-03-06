defmodule Microblogger.UserView do
  use Microblogger.Web, :view

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      username: user.username,
      bio: user.bio,
      email: user.email
    }
  end
end