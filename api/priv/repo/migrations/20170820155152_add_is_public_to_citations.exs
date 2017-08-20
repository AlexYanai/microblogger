defmodule Cite.Repo.Migrations.AddIsPublicToCitations do
  use Ecto.Migration

  def change do
    alter table(:citations) do
      add :is_public, :boolean, default: false
    end
  end
end
