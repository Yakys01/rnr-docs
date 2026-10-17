---
title: Obtener compañías
description: Herramientas MCP del dominio empresas — fichas SUNAT, listados, búsqueda y rankings.
---

Herramientas del dominio empresas. Entrada común: `ruc` (11 dígitos de empresa o código de consorcio de 4 a 8 dígitos) + paginación `limit`/`offset` + filtros de fecha opcionales `year`/`month`/`day` (ver [Empezamos](/get-started/)). Del detalle al listado, cada salida es una ficha (objeto) o `{ "items": [...] }` (listados y rankings).

| Herramienta | Entrada | Salida | Qué devuelve |
|---|---|---|---|
| `get_company_info` | `ruc` | ficha | Ficha SUNAT: razón social, estado y condición, dirección con ubigeo. |
| `get_company_status` | `ruc` | ficha | Situación fiscal y legal: sanciones, inhabilitaciones, penalidades y deuda coactiva. |
| `get_company_track` | `ruc` | ficha | Historial anual de contratos, convocatorias, adjudicaciones y postulaciones. |
| `get_company_contracts` | `ruc` + fecha | `{ items }` | Contratos registrados por las entidades. |
| `get_company_directs` | `ruc` + fecha | `{ items }` | Contrataciones directas con datos de la buena pro. |
| `get_company_adjudications` | `ruc` + fecha | `{ items }` | Adjudicaciones: proveedor, valor y cantidad de la buena pro. |
| `get_company_convocatories` | `ruc` + fecha | `{ items }` | Convocatorias e invitaciones de procesos adjudicados. |
| `get_company_bidders` | `ruc` + fecha | `{ items }` | Postulaciones (ofertas) desde 2018. |
| `get_company_pronouncements` | `ruc` + fecha | `{ items }` | Pronunciamientos con fecha de emisión y URL. |
| `search_companies` | `q` | `{ items }` | RUC, razón social y estado SUNAT. |
| `get_companies_with_debt` | `min_amount` | `{ items }` | Ranking de deuda coactiva, de mayor a menor. |
| `get_companies_with_penalties` | `year` + `entity` | `{ items }` | Ranking por cantidad de penalidades (PAC/OSCE). |

## Consultas por RUC

### get_company_info — "Consultar empresa"

- **Descripción**: ficha SUNAT por RUC: razón social, estado y condición del contribuyente, dirección con ubigeo y departamento/provincia/distrito, y datos SUNAT (tipo de contribuyente, nombre comercial, fechas de inscripción e inicio de actividades, domicilio fiscal).
- **Input**: `ruc` (11 dígitos de empresa, o 4 a 8 de consorcio).
- **Output**: ficha (objeto).
- **Lectura pura** (`readOnlyHint`).
- **Cuándo usarla**: para identificar a la empresa antes de pedir sus listados.

```json
{ "ruc": "20512345678" }
```

### get_company_status — "Consultar estado SUNAT"

- **Descripción**: situación fiscal y legal: estado y condición SUNAT, buen contribuyente, sanciones o inhabilitaciones vigentes (Tribunal de Contrataciones, Poder Judicial u otras), contratos con penalidad desde 2018 y deuda en cobranza coactiva mayor a 5 UIT (principales y medianos contribuyentes, con sus representantes legales ante SUNAT). No incluye deuda en litigio ni en proceso concursal.
- **Input**: `ruc` (11 dígitos de empresa, o 4 a 8 de consorcio).
- **Output**: ficha (objeto).
- **Lectura pura** (`readOnlyHint`).
- **Cuándo usarla**: para la situación fiscal y legal; para el historial anual usa `get_company_track`.

```json
{ "ruc": "20512345678" }
```

### get_company_track — "Consultar historial de empresa"

- **Descripción**: historial anual de contratos, convocatorias, adjudicaciones y postulaciones de una empresa o consorcio.
- **Input**: `ruc` (11 dígitos de empresa, o 4 a 8 de consorcio).
- **Output**: ficha (objeto).
- **Lectura pura** (`readOnlyHint`).

```json
{ "ruc": "20512345678" }
```

## Listados por RUC

Todos aceptan paginación (`limit`/`offset`) y filtro de fecha opcional (`year`/`month`/`day`); cada ficha indica qué fecha filtra. La salida es `{ "items": [...] }`.

### get_company_contracts — "Listar contratos de empresa"

- **Descripción**: contratos registrados por las entidades: fechas de suscripción, inicio y fin, prórrogas, adicionales y reducciones. Entre la adjudicación y la suscripción puede transcurrir tiempo (recurso impugnativo, proveedor que no suscribe, etc.).
- **Input**: `ruc` + fecha de publicación (opcional).
- **Output**: `{ "items": [...] }` (listado).
- **Lectura pura** (`readOnlyHint`).

```json
{ "ruc": "20512345678", "year": 2024, "limit": 20, "offset": 0 }
```

### get_company_directs — "Listar contratos directos"

- **Descripción**: procesos adjudicados por contratación directa (sin concurso público), con los datos de la buena pro.
- **Input**: `ruc` + fecha de la buena pro (opcional).
- **Output**: `{ "items": [...] }` (listado).
- **Lectura pura** (`readOnlyHint`).

```json
{ "ruc": "20512345678", "year": 2024, "limit": 20, "offset": 0 }
```

### get_company_adjudications — "Listar adjudicaciones"

- **Descripción**: resultados de procesos adjudicados: proveedor adjudicado, valor y cantidad de la buena pro. No incluye procedimientos con datos incompletos de la adjudicación.
- **Input**: `ruc` + fecha de adjudicación (opcional).
- **Output**: `{ "items": [...] }` (listado).
- **Lectura pura** (`readOnlyHint`).

```json
{ "ruc": "20512345678", "year": 2024, "limit": 20, "offset": 0 }
```

### get_company_convocatories — "Listar convocatorias"

- **Descripción**: convocatorias o invitaciones de procedimientos adjudicados. Un proceso puede declararse nulo, retrotraerse o postergarse, así que refleja lo publicado.
- **Input**: `ruc` + fecha de convocatoria (opcional).
- **Output**: `{ "items": [...] }` (listado).
- **Lectura pura** (`readOnlyHint`).

```json
{ "ruc": "20512345678", "year": 2024, "limit": 20, "offset": 0 }
```

### get_company_bidders — "Listar postulaciones"

- **Descripción**: postulaciones (ofertas) de personas naturales y jurídicas en procesos adjudicados desde 2018 (Art. 61° Reglamento Ley 30225 y Art. 79° Reglamento Ley 32069).
- **Input**: `ruc` + fecha de oferta (opcional).
- **Output**: `{ "items": [...] }` (listado).
- **Lectura pura** (`readOnlyHint`).

```json
{ "ruc": "20512345678", "year": 2024, "limit": 20, "offset": 0 }
```

### get_company_pronouncements — "Listar pronunciamientos"

- **Descripción**: pronunciamientos emitidos sobre la empresa: fecha de emisión y URL del documento; agrupados por año de publicación.
- **Input**: `ruc` + fecha de publicación (opcional).
- **Output**: `{ "items": [...] }` (listado).
- **Lectura pura** (`readOnlyHint`).

```json
{ "ruc": "20512345678", "year": 2024, "limit": 20, "offset": 0 }
```

## Búsqueda y rankings

### search_companies — "Buscar empresas por nombre"

- **Descripción**: devuelve RUC, razón social y estado SUNAT para encadenar con las demás herramientas (que exigen RUC).
- **Input**: `q` (texto, mínimo 3 caracteres) + paginación.
- **Output**: `{ "items": [...] }` (listado).
- **Lectura pura** (`readOnlyHint`).
- **Cuándo usarla**: cuando solo tienes el nombre; de aquí sale el RUC para todo lo demás.

```json
{ "q": "constructora", "limit": 10 }
```

### get_companies_with_debt — "Empresas con deuda coactiva"

- **Descripción**: ranking de empresas con deuda coactiva SUNAT: monto, dependencia y razón social, de mayor a menor. Es el saldo vigente al último corte; no filtrable por año.
- **Input**: `min_amount` (opcional, soles) + paginación.
- **Output**: `{ "items": [...] }` (listado).
- **Lectura pura** (`readOnlyHint`).

```json
{ "min_amount": 100000, "limit": 10 }
```

### get_companies_with_penalties — "Empresas con más penalidades"

- **Descripción**: ranking por cantidad de penalidades aplicadas (PAC/OSCE, desde 2018), con conteo de entidades contratantes distintas.
- **Input**: `year` (obligatorio) + `entity` (opcional, texto en la entidad contratante, mínimo 3 caracteres) + paginación.
- **Output**: `{ "items": [...] }` (listado).
- **Lectura pura** (`readOnlyHint`).

```json
{ "year": 2024, "entity": "ministerio", "limit": 10 }
```

## Flujo recomendado

`search_companies` → `get_company_info` → listados con el RUC. Para direcciones y ubigeos usa `get_location` (ver [Obtener convocatorias](/mcp/get-tenders/)).

Por ejemplo: busca la empresa por nombre, identifica su RUC en el resultado y pide ficha, estado SUNAT o cualquier listado con ese RUC. Los rankings (`deuda`, `penalidades`) no requieren RUC: sirven para descubrir empresas y luego profundizar con el flujo anterior.
