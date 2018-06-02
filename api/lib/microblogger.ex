defmodule Microblogger do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec

    # Define workers and child supervisors to be supervised
    children = [
      # Start the Ecto repository
      supervisor(Microblogger.Repo, []),
      # Start the endpoint when the application starts
      supervisor(Microblogger.Endpoint, []),
      # Start your own worker by calling: Microblogger.Worker.start_link(arg1, arg2, arg3)
      # worker(Microblogger.Worker, [arg1, arg2, arg3]),
    ]

    opts = [strategy: :one_for_one, name: Microblogger.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    Microblogger.Endpoint.config_change(changed, removed)
    :ok
  end
end
