# My Phaser Parcel Typescript Template

Inspired by:

- https://github.com/pierpo/phaser3-simple-rpg.git


## Architecture

The various units will be separated into docker containers.

So far there is only the `Frontend`, but there will be:

- Frontend
  - Phaser/Typescript/React
- TaskQueue
  - ? __something typescript/nestjsish__
- Backend
  - NestJs with GraphQL and Websockets
- Storage Ambassador
  - ? __S3ish__

### Frontend

__! Still attempting to find a balanced pattern__, but have generally settled on:

- PhaserJs3 for the Frontend
  - React there as a backup if it turns out UI is expensive in Phaser
- Mobx Keystone for State and Domain models/DTOs

- Minimising Inheritance through Bridging Pattern
  - https://refactoring.guru/design-patterns/bridge
- Maximising DataDriven concerns with  Builder Pattern
  - https://refactoring.guru/design-patterns/builder



## Workflows

### Local Setup

__See [Tooling](#tooling)__

- `git clone`
- `tusk setup`
- `tusk dev`

#### Using WSL2

__Here be Unsupported Dragons__

You should be able to in theory juggle several terminal windows each for the above services.

At minimum you'll need:

- [Tusk](#tooling)
- NodeJs 13
  - Suggest you use [nvm](https://github.com/nvm-sh/nvm/)
- Yarn

Then you'll need setup each service:

```sh
$ cd ./app
$ tusk setup
```

Once each service is installed:

```sh
$ cd ./app
$ tusk dev
```

## Tooling

Used in this project is:

- Docker
- Github Actions

- [Tusk](https://github.com/rliebz/tusk)
  - windows users either [use wsl2](#using-wsl2), or [install winbash](http://win-bash.sourceforge.net/)
- NodeJs 13
  - this is take care of when using docker
- Yarn
- Parcel
- Typescript
- Eslint
- Jest
