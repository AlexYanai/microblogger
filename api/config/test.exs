use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :microblogger, Microblogger.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :microblogger, Microblogger.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "microblogger_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

config :guardian, Guardian,
  secret_key: "oSRPnbXpJxNKs9mXgUNCgbFLgdtwyBu7zQQzqQZeRkBqOwgqIcYzQqEKQFdsain8"
