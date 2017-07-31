# mix run priv/repo/seeds.exs
import Ecto
alias Cite.{Repo, User, Category, Citation, CitationCategory}

# List of users to be created
users = [
  %{username: "a", email: "a@a.com", password: "aaaaaa"},
  %{username: "b", email: "b@b.com", password: "bbbbbb"},
  %{username: "c", email: "c@c.com", password: "cccccc"},
  %{username: "d", email: "d@d.com", password: "dddddd"}
]

# Create the Users
users
  |> Enum.map(&User.registration_changeset(%User{}, &1))
  |> Enum.each(&Repo.insert!(&1))

# List of categories to be created
categories = [
  %{name: "General", description: "General Category"},
  %{name: "Random", description: "rgfisgfu gfdsg shdfk  gfsjd gksfdh rewrejh"},
  %{name: "Test One", description: "This is a test explanation for a category"}
]

# Create the categories
categories
  |> Enum.map(&Category.changeset(%Category{}, &1))
  |> Enum.each(&Repo.insert!(&1))

# Get a user and a category
user     = User     |> Ecto.Query.first |> Repo.one
category = Category |> Ecto.Query.first |> Repo.one

# List of citations to be created
cites = [
  %{title: "test", source: "http://www.example.testurl", quote: "test quote\ntest text test test test test test test"},
  %{title: "test note for something", source: "http://www.somethingimportant.testurl", quote: "something, something, something, something"},
  %{title: "something important", source: "A book", quote: "Some book quote, Some book quote, Some book quote, Some book quote."}
]

# Create the citations and associate them with a user
cites
  |> Enum.map(&User.create_citation(&1, user))
  |> Enum.each(&Repo.insert!(&1))

# Create the citations and associate them with a user
Repo.all(assoc(user, :citations))
  |> Enum.map(&CitationCategory.assoc_citation_with_category(&1, category))
  |> Enum.each(&Repo.insert!(&1))
