defmodule Cite.Favorite do
  use Cite.Web, :model

  schema "favorites" do
    belongs_to :citation, Cite.Citation, foreign_key: :citation_id
    belongs_to :user, Cite.User, foreign_key: :user_id

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:citation_id, :user_id])
    |> validate_required([:citation_id, :user_id])
  end
end
