defmodule Cite.Repo.Migrations.AddAuthorNameToCitations do
  use Ecto.Migration

  def change do
    alter table(:citations) do
      add :author_name, :string, default: false
    end
  end
end
