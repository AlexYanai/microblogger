defmodule Cite.Repo.Migrations.CreateCitationCategory do
  use Ecto.Migration

  def change do
    create table(:citation_categories) do
      add :citation_id, references(:citations, on_delete: :nothing)
      add :category_id, references(:categories, on_delete: :nothing)

      timestamps()
    end

    create index(:citation_categories, [:citation_id])
    create index(:citation_categories, [:category_id])
    create index(:citation_categories, [:citation_id, :category_id], unique: true)
  end
end
