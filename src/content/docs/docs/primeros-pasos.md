---
title: Primeros pasos
description: Host, autenticación y una primera consulta a la API.
---

La API expone personas, empresas y contrataciones del Estado peruano. En desarrollo el host es `http://localhost:4000` (configurable con `API_SERVER`).

## Autenticación

Salvo las rutas de `system` y `session`, todas las operaciones requieren un token Bearer:

```http
Authorization: Bearer <token>
```

Detalle en [Autenticación](/docs/autenticacion/).

## Primera consulta

```sh
curl -H "Authorization: Bearer $TOKEN" http://localhost:4000/user/info/12345678
```

## Listados y filtros

Los endpoints de listado aceptan `limit` y `offset`, y varios filtros por fecha (`year`, `month`, `day`). Ver los parámetros de cada ruta en la [referencia de la API](/reference/).
