defmodule Microblogger.ErrorView do
  use Microblogger.Web, :view

  def render("403.json", _assigns) do
    %{errors: %{detail: "Forbidden"}}
  end

  def render("404.json", _assigns) do
    %{errors: %{detail: "Page not found"}}
  end

  def render("500.json", _assigns) do
    %{errors: %{detail: "Internal server error"}}
  end

  def template_not_found(_template, assigns) do
    render "500.json", assigns
  end
end
