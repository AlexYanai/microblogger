defmodule Cite do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec

    # Define workers and child supervisors to be supervised
    children = [
      # Start the Ecto repository
      supervisor(Cite.Repo, []),
      # Start the endpoint when the application starts
      supervisor(Cite.Endpoint, []),
      # Start your own worker by calling: Cite.Worker.start_link(arg1, arg2, arg3)
      # worker(Cite.Worker, [arg1, arg2, arg3]),
    ]

    opts = [strategy: :one_for_one, name: Cite.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    Cite.Endpoint.config_change(changed, removed)
    :ok
  end
end
