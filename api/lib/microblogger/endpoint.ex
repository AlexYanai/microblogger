defmodule Microblogger.Endpoint do
  use Phoenix.Endpoint, otp_app: :microblogger

  socket "/socket", Microblogger.UserSocket

  plug Plug.Static,
    at: "/", from: :microblogger, gzip: false,
    only: ~w(css fonts images js favicon.ico robots.txt)

  if code_reloading? do
    plug Phoenix.CodeReloader
  end

  plug Plug.RequestId
  plug Plug.Logger

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Poison

  plug Plug.MethodOverride
  plug Plug.Head

  plug Plug.Session,
    store: :cookie,
    key: "_microblogger_key",
    signing_salt: "mbwGfSdG"

  plug Corsica,
    log: [rejected: :debug],
    origins: ~r{^http://localhost:3000*},
    max_age: 600,
    allow_headers: ~w(content-type special authorization),
    expose_headers: ~w(content-type special authorization),
    allow_credentials: true

  plug Microblogger.Router
end
