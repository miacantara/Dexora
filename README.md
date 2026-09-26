# Dexora

Dexora is an **unofficial, non-commercial Pokémon encyclopedia and portfolio project** built with ASP.NET Core MVC.

🌐 **Live Demo:** https://dexora.runasp.net/

> **Note:** Dexora is an unofficial fan-made project created for educational, development, and portfolio demonstration purposes. It is not affiliated with, endorsed by, or sponsored by The Pokémon Company, Nintendo, Game Freak, or Creatures.

## About

Dexora is a web-based Pokémon encyclopedia that allows users to explore Pokémon, learn about their abilities and type matchups, save favorites, and browse trainer teams from the games and anime.

The project was created to demonstrate full-stack web development using **ASP.NET Core MVC, C#, Razor, JavaScript, REST API integration, and responsive web design**.

## Features

- Search and browse Pokémon by name, number, or type.
- View detailed Pokémon profiles with artwork, abilities, stats, type matchups, and evolution information.
- Listen to Pokémon cries.
- Explore different Pokémon forms where available.
- Discover signature Z-Moves for Pokémon and forms that have one.
- View recommended battle items based on Pokémon stats and types.
- Save favorite Pokémon to **My Pokémon**.
- Remember recently viewed Pokémon.
- Switch between light and dark themes.
- Browse Pokémon by generation and type.
- Browse game Champions, Ash's anime companions, and Team Rocket by series.
- Explore trainer profiles and the Pokémon on their teams.
- View supplemental Pokémon food preferences and related information.
- Responsive interface for desktop and mobile devices.

## Tech Stack

- ASP.NET Core MVC
- .NET 8
- C#
- Razor
- HTML
- CSS
- JavaScript
- REST APIs
- PokéAPI
- Browser Local Storage

## Architecture

Dexora uses an ASP.NET Core backend to provide application-specific API endpoints to the frontend.

Examples include:

```text
/api/pokemon/list
/api/pokemon/{id}
/api/pokemon/type/{type}
```

The JavaScript frontend consumes these endpoints to retrieve and display Pokémon information dynamically.

Browser Local Storage is used for client-side preferences and features such as favorites, recently viewed Pokémon, and theme selection.

## Data & External Resources

Pokémon data is primarily provided through [PokéAPI](https://pokeapi.co/).

Pokémon artwork, sprites, item images, and cry audio used by the application may be loaded from resources associated with PokéAPI, including its public sprite and cry repositories.

Some supplemental information that is not available through PokéAPI, such as selected food preferences and other profile details, is maintained locally within the project.

Dexora also uses or references community resources for selected supplemental content, including:

- **Pokémon Showdown** — reference data for selected signature Z-Moves.
- **Serebii** — selected supplemental Pokémon food and item imagery/information.
- **Poképédia** — source/reference for selected trainer portraits.
- **Bulbapedia** — reference material for selected trainer and anime team information.

These third-party resources remain subject to their respective terms, licenses, copyrights, and ownership.

## Deployment

Dexora is deployed as an **ASP.NET Core .NET 8 web application** and is currently hosted on MonsterASP.NET.

Live application:

**https://dexora.runasp.net/**

## Copyright & Disclaimer

Dexora is an **unofficial fan-made project** created solely for educational, development, and portfolio demonstration purposes. It is not intended to represent an official Pokémon product or service.

Pokémon and all related names, characters, designs, artwork, sprites, audio, trademarks, and other intellectual property are the property of their respective rights holders.

Dexora does not claim ownership of Pokémon intellectual property or third-party assets and content referenced or displayed by the project.

Third-party names, images, data, and other resources remain the property of their respective owners. Attribution or reference to a third-party source does not imply ownership, endorsement, sponsorship, affiliation, or that the material is free from copyright or other intellectual-property restrictions.

Dexora is not affiliated with, endorsed by, or sponsored by The Pokémon Company, Nintendo, Game Freak, Creatures, PokéAPI, Pokémon Showdown, Serebii, Poképédia, Bulbapedia, or MonsterASP.NET.

No commercial use of Pokémon intellectual property is intended. Dexora is maintained as a personal software-development portfolio project demonstrating technologies such as ASP.NET Core MVC, C#, Razor, JavaScript, responsive web development, and API integration.
