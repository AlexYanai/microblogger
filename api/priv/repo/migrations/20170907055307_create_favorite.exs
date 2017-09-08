defmodule Cite.Repo.Migrations.CreateFavorite do
  use Ecto.Migration

  def change do
    create table(:favorites) do
      add :citation_id, references(:citations, on_delete: :nothing)
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:favorites, [:citation_id])
    create index(:favorites, [:user_id])
  end
end
