defmodule Cite.Citation do
  use Cite.Web, :model

  schema "citations" do
    field :title, :string
    field :source, :string
    field :quote, :string
    field :is_public, :boolean
    belongs_to :user, Cite.User
    many_to_many :categories, Cite.Category, join_through: "citation_categories", on_delete: :delete_all


    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :source, :quote, :is_public])
    |> validate_required([:title, :source, :quote])
  end

  def category_ids(citation) do
    case !!citation and citation.categories do
      nil   -> []
      false -> []
      _     -> Enum.map(citation.categories, fn n -> n.id end)
    end
  end
end
