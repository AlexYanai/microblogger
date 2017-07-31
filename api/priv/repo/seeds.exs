# mix run priv/repo/seeds.exs
import Ecto
alias Cite.{Repo, User, Category, Citation}

users = [
  %{username: "a", email: "a@a.com", password: "aaaaaa"},
  %{username: "b", email: "b@b.com", password: "bbbbbb"},
  %{username: "c", email: "c@c.com", password: "cccccc"},
  %{username: "d", email: "d@d.com", password: "dddddd"}
]

users
  |> Enum.map(&User.registration_changeset(%User{}, &1))
  |> Enum.each(&Repo.insert!(&1))

user = User |> Ecto.Query.first |> Repo.one

cites = [
  %{title: "test", source: "http://www.example.testurl", quote: "test quote\ntest text test test test test test test"},
  %{title: "test note for something", source: "http://www.somethingimportant.testurl", quote: "something, something, something, something"},
  %{title: "something important", source: "A book", quote: "Some book quote, Some book quote, Some book quote, Some book quote."}
]

cites
  |> Enum.map(&User.create_comment(&1, user))
  |> Enum.each(&Repo.insert!(&1))
