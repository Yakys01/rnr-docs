---
title: Obtener usuarios
description: Herramientas MCP del dominio personas — get_user_info.
---

Herramienta del dominio personas.

## get_user_info — "Consultar persona"

- **Descripción**: obtiene los datos de una persona por su número de documento (DNI).
- **Input**: `document` (string, solo dígitos).
- **Output**: ficha (objeto) con los datos de la persona.
- **Lectura pura** (`readOnlyHint`).

```json
{ "document": "12345678" }
```
