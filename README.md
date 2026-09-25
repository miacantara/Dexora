# Dexora

Dexora is an unofficial, non-commercial portfolio project created for educational and demonstration purposes. Pokémon and related characters, names, artwork, and other intellectual property belong to their respective rights holders. Dexora is not affiliated with or endorsed by The Pokémon Company, Nintendo, Game Freak, or Creatures. Pokémon data is provided through PokéAPI.

Dexora is a Pokémon encyclopedia built with **ASP.NET Core MVC**. Explore Pokémon, learn about their abilities and type matchups, save your favorites, and browse trainer teams from the games and anime.

## Features

* Search and browse Pokémon by name, number, or type.
* View detailed Pokémon profiles with artwork, abilities, stats, type matchups, and evolution information.
* Discover signature Z-Moves for Pokémon and forms that have one.
* Save your favorite Pokémon.
* Switch between light and dark themes.
* Browse game Champions, Ash's anime companions, and Team Rocket by series.
* View recently visited Pokémon on the home page.
* Explore trainer profiles and the Pokémon on their teams.

## Tech Stack

* ASP.NET Core MVC
* .NET 8
* C#
* Razor
* HTML
* CSS
* JavaScript
* PokéAPI

## Media

Optional Pokémon profile clips can be added under:

`Dexora.Web/wwwroot/media/battles/`

Use the Pokémon's API name as the filename, for example:

`charizard.webm`
`pikachu.mp4`

When no local clip is available, Dexora falls back to its built-in sprite and artwork presentation.

Only add media that you have permission to use.

## Data

Pokémon information is provided by [PokéAPI](https://pokeapi.co/).

Some additional profile information that is not available through the API, such as selected food preferences, is stored locally within the project.

## Credits

Pokémon names, characters, and artwork belong to their respective owners.

Trainer portraits are sourced from [Poképédia](https://www.pokepedia.fr/).

Dexora is an **unofficial fan project** created for development and portfolio purposes.
