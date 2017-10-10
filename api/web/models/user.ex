defmodule Cite.User do
  use Cite.Web, :model

  schema "users" do
    field :username, :string
    field :email, :string
    field :bio, :string
    field :password_hash, :string
    field :password, :string, virtual: true
    has_many :citations, Cite.Citation
    has_many :favorites, Cite.Favorite

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:username, :email, :bio])
    |> validate_required([:username, :email])
    |> unique_constraint(:username)
    |> unique_constraint(:email)
  end

  def registration_changeset(struct, params) do
    struct
    |> changeset(params)
    |> cast(params, [:password])
    |> validate_length(:password, min: 6, max: 100)
    |> put_password_hash()
  end

  def create_citation(citation, user) do
    citation = Map.put(citation, :author_name, user.username)
    citation = Map.put(citation, :author_emai, user.email)
    
    Ecto.build_assoc(user, :citations, citation)
  end

  def favorites(user) do
    user |> assoc(:favorites) |> Cite.Repo.all
  end

  defp put_password_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        put_change(changeset, :password_hash, Comeonin.Bcrypt.hashpwsalt(password))
      _ ->
        changeset
    end
  end
end
