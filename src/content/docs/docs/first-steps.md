---
title: Primeros pasos
description: Host, autenticación y una primera consulta a la API.
---

La API expone personas, empresas y contrataciones del Estado peruano. El servicio de datos es **api.runrunapi.com**; los tokens de acceso se obtienen en **www.runrunapi.com**.

## Autenticación

Salvo las rutas de `system` y `session`, todas las operaciones requieren un token Bearer:

```http
Authorization: Bearer <token>
```

Detalle en [Autenticación](/docs/authentication/).

## Primera consulta

```sh
curl -H "Authorization: Bearer $TOKEN" https://api.runrunapi.com/user/info/12345678
```

## Listados y filtros

Los endpoints de listado aceptan `limit` y `offset`, y varios filtros por fecha (`year`, `month`, `day`). Ver los parámetros de cada ruta en la [referencia de la API](/reference/).
