---
title: Obtener convocatorias
description: Herramientas MCP por código OSCE — get_convocatory, get_contract y get_location.
---

Herramientas por código OSCE, con paginación (`limit`/`offset`) y filtros opcionales de fecha (ver [Empezamos](/get-started/)).

| Herramienta | Entrada | Salida | Qué devuelve |
|---|---|---|---|
| `get_convocatory` | `code` + fecha | ficha | Detalle completo de una convocatoria o invitación. |
| `get_contract` | `code` + fecha | ficha | Contrato: fechas, prórrogas, adicionales y reducciones. |
| `get_location` | `ubigeo` | ficha | Departamento, provincia y distrito. |

## get_convocatory — "Consultar convocatoria"

- **Descripción**: obtiene el detalle completo de una convocatoria o invitación por código: cabecera, items, adjudicaciones, contratos, contratos directos, postulaciones y pronunciamientos. Vista integral del proceso; un proceso puede anularse, retrotraerse o postergarse, así que puede reflejar datos incompletos o nulos según lo publicado.
- **Input**: `code` (string, código de convocatoria OSCE) + paginación + fecha (opcional).
- **Output**: ficha (objeto).
- **Lectura pura** (`readOnlyHint`).

```json
{ "code": "C1234567", "limit": 10 }
```

## get_contract — "Consultar contrato"

- **Descripción**: obtiene un contrato por código: fechas de suscripción, inicio y fin, prórrogas, adicionales y reducciones registradas por la entidad, más la cabecera de sus convocatorias y adjudicaciones. Entre la adjudicación y la suscripción puede transcurrir tiempo (recurso impugnativo, proveedor que no suscribe, etc.).
- **Input**: `code` (string, código de contrato OSCE) + paginación + fecha (opcional).
- **Output**: ficha (objeto).
- **Lectura pura** (`readOnlyHint`).

```json
{ "code": "C7654321" }
```

## get_location — "Consultar ubicación"

- **Descripción**: devuelve departamento, provincia y distrito de un código ubigeo de seis dígitos.
- **Input**: `ubigeo` (string, seis dígitos).
- **Output**: ficha (objeto).
- **Lectura pura** (`readOnlyHint`).
- **Cuándo usarla**: para resolver el ubigeo que traen las fichas de empresa.

```json
{ "ubigeo": "150101" }
```

## Cómo encadenar

Los códigos OSCE llegan de otras herramientas: los listados de [Obtener compañías](/mcp/get-companies/) traen códigos de convocatoria, contrato, adjudicación y postulación que puedes resolver aquí con `get_convocatory` / `get_contract` para obtener el detalle completo del proceso.
