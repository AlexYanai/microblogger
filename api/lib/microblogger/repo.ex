defmodule Microblogger.Repo do
  use Ecto.Repo, otp_app: :microblogger
  use Scrivener, page_size: 5
end
