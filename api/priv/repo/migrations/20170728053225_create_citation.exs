defmodule Cite.Repo.Migrations.CreateCitation do
  use Ecto.Migration

  def change do
    create table(:citations) do
      add :title, :string, null: false
      add :source, :text, null: false
      add :quote, :text, null: false
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:citations, [:user_id])
  end
end
