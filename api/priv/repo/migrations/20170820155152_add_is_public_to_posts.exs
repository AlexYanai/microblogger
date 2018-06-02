defmodule Microblogger.Repo.Migrations.AddIsPublicToPosts do
  use Ecto.Migration

  def change do
    alter table(:posts) do
      add :is_public, :boolean, default: false
    end
  end
end
