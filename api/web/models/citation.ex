defmodule Cite.Citation do
  use Cite.Web, :model

  schema "citations" do
    field :title, :string
    field :source, :string
    field :quote, :string
    belongs_to :user, Cite.User
    many_to_many :categories, Cite.Category, join_through: "citation_categories"


    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :source, :quote])
    |> validate_required([:title, :source, :quote])
  end
end
