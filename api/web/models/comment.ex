defmodule Microblogger.Comment do
  use Microblogger.Web, :model

  schema "comments" do
    field :body, :string
    field :author_name, :string
    field :author_email, :string
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
end
