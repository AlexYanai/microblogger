# Micro Blogger

[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)](https://github.com/AlexYanai/microblogger/blob/master/LICENSE.txt)

A platform for microblogging.

## Requirements
**Elixir v1.5**, **PostgreSQL**.

## Installation instructions

  1. Install **Phoenix** dependencies: `cd api && mix deps.get`
  2. Edit `/config/dev.exs` or `config/dev.secret.exs` with your **Postgres** user credentials.
  3. Create, migrate, and seed the database `mix ecto.setup`
  4. Start the Phoenix endpoint: `mix phx.server`
  5. Install **NPM** packages: `cd ../web && yarn`
  6. Create a `.env` file and add `REACT_APP_API_URL=http://localhost:4000/api`
  7. Start the dev server: `npm start`

You can now demo the app in your browser at [`localhost:3000`](http://localhost:3000).

## Testing

`cd api/ &&  mix test test/`

## To Do

- Add category creation
- Expand search and filtering
- Allow users to create collections

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## License

Copyright (c) 2017 Alex Yanai. Released under the [MIT License](http://opensource.org/licenses/MIT).