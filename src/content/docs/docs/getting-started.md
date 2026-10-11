---
title: Cómo empezar
description: Cómo correr el monorepo de runrunapi en local.
---

Este monorepo se maneja con [Bun workspaces](https://bun.sh/docs/install/workspaces).

## Instalar dependencias

```sh
bun install
```

## Levantar el stack completo

```sh
bun dev
```

Esto levanta el Worker del server en :3000 y la web en :4321 vía Alchemy.

## Correr partes por separado

```sh
bun dev:web      # solo la web (astro dev)
bun dev:server   # solo el API del server (alchemy dev)
```

## Chequeo de tipos y build

```sh
bun check-types  # type-check de todos los workspaces
bun run build    # build de todos los workspaces
```
