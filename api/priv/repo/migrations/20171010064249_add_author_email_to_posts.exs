defmodule Microblogger.Repo.Migrations.AddAuthorEmailToPosts do
  use Ecto.Migration

  def change do
    alter table(:posts) do
      add :author_email, :string, default: false
    end
  end
end
