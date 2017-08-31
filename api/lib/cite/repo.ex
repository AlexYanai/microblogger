defmodule Cite.Repo do
  use Ecto.Repo, otp_app: :cite
  use Scrivener, page_size: 5
end
