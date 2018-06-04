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
    |> cast(params, [:body])
    |> validate_required([:body])
  end

  def add_author_name_and_email(comments, user) do
    comments = comments |> Enum.map(fn c -> Map.put(c, :username, user.username) end)
    comments = comments |> Enum.map(fn c -> Map.put(c, :email, user.email) end)
    comments
  end
end
