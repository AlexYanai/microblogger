defmodule Microblogger.Repo.Migrations.AddAuthorNameToPosts do
  use Ecto.Migration

  def change do
    alter table(:posts) do
      add :author_name, :string, default: false
    end
  end
end
