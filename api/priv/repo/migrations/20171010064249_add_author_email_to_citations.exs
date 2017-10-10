defmodule Cite.Repo.Migrations.AddAuthorEmailToCitations do
  use Ecto.Migration

  def change do
    alter table(:citations) do
      add :author_email, :string, default: false
    end
  end
end
