---
title: Autenticación
description: Cómo enviar el token Bearer en las consultas a la API.
---

Las rutas de `system` y `session` son públicas; el resto usa el esquema `bearerAuth` (HTTP Bearer). El token va en el header `Authorization`:

```http
GET /user/info/12345678 HTTP/1.1
Host: localhost:4000
Authorization: Bearer <token>
```

```sh
curl -H "Authorization: Bearer $TOKEN" http://localhost:4000/user/info/12345678
```

En la [referencia de la API](/reference/) podés probar cada ruta con tu token.
