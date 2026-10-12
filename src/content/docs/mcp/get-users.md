---
title: Obtener usuarios
description: Herramientas MCP del dominio personas — get_user_info y collect_user_info.
---

Herramientas del dominio personas. Entrada común: `document` (string, solo dígitos).

## get_user_info — "Consultar persona"

- **Descripción**: obtiene los datos de una persona por su número de documento (DNI).
- **Input**: `document` (string, solo dígitos).
- **Output**: objeto con la ficha de la persona.
- **Lectura pura** (`readOnlyHint`).

```json
{ "document": "12345678" }
```

## collect_user_info — "Recolectar persona"

- **Descripción**: vuelve a recolectar los datos de una persona desde los proveedores externos y devuelve el registro actualizado.
- **Input**: `document` (string, solo dígitos).
- **Output**: objeto con la ficha actualizada.
- **Ojo**: no es de lectura pura — dispara recolección externa y persiste cambios.

```json
{ "document": "12345678" }
```

## Cuál usar

Obtén el DNI de la consulta, no lo inventes. Para refrescar datos desactualizados usa `collect_user_info`; para solo leer, `get_user_info`.

Ambas comparten entrada y salida, así que migrar de una a la otra no cambia nada en tu cliente: mismo `document`, misma ficha de vuelta.
