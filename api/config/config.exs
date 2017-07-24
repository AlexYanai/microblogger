# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :cite,
  ecto_repos: [Cite.Repo]

# Configures the endpoint
config :cite, Cite.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "gQrauacsS9IzOBReEl2kuwwdzr0/5v3Wj5hjQi77OqWY2lEwC1LwGx6miRGo7yIP",
  render_errors: [view: Cite.ErrorView, accepts: ~w(json)],
  pubsub: [name: Cite.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :guardian, Guardian,
  issuer: "Cite",
  ttl: {30, :days},
  verify_issuer: true,
  serializer: Cite.GuardianSerializer

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
