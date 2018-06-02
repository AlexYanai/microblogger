defmodule Microblogger.CategoryView do
  use Microblogger.Web, :view

  def render("index.json", %{categories: categories}) do
    %{data: render_many(categories, Microblogger.CategoryView, "category.json")}
  end

  def render("show.json", %{category: category}) do
    %{data: render_one(category, Microblogger.CategoryView, "category.json")}
  end

  def render("category.json", %{category: category}) do
    %{id: category.id,
      name: category.name,
      description: category.description}
  end
end
