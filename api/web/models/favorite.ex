defmodule Microblogger.Favorite do
  use Microblogger.Web, :model
  alias Microblogger.{Post, Favorite, Category, Repo}

  schema "favorites" do
    belongs_to :post, Microblogger.Post, foreign_key: :post_id
    belongs_to :user, Microblogger.User, foreign_key: :user_id

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:post_id, :user_id])
    |> validate_required([:post_id, :user_id])
  end

  def posts(page) do
    page.entries |> Enum.map(fn n -> n.post end)
  end
end
