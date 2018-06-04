defmodule Microblogger.Comment do
  use Microblogger.Web, :model

  schema "comments" do
    field :body, :string
    belongs_to :post, Microblogger.Post, foreign_key: :post_id
    belongs_to :user, Microblogger.User, foreign_key: :user_id

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:body, :post_id, :user_id])
    |> validate_required([:body, :post_id, :user_id])
  end

  def add_author_name_and_email(comments, username, email) do
    comments = comments |> Enum.map(fn c -> Map.put(c, :username, username) end)
    comments = comments |> Enum.map(fn c -> Map.put(c, :email, email) end)
    comments
  end
end
