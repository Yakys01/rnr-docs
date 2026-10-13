---
title: Autenticación
description: Cómo enviar el token Bearer en las consultas a la API.
---

Las rutas de `system` y `session` son públicas; el resto usa el esquema `bearerAuth` (HTTP Bearer). El token se obtiene en [www.runrunapi.com](https://www.runrunapi.com) y va en el header `Authorization`:

```http
GET /user/info/12345678 HTTP/1.1
Host: api.runrunapi.com
Authorization: Bearer <token>
```

```sh
curl -H "Authorization: Bearer $TOKEN" https://api.runrunapi.com/user/info/12345678
```

En la [referencia de la API](/reference/) podés probar cada ruta con tu token.
