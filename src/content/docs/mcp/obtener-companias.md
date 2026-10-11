---
title: Obtener compañías
description: Herramientas MCP del dominio empresas — fichas SUNAT, listados, búsqueda y rankings.
---

Herramientas del dominio empresas. Entrada común: `ruc` (11 dígitos de empresa o código de consorcio de 4 a 8 dígitos) + paginación `limit`/`offset` + filtros opcionales `year`/`month`/`day`. Del detalle al listado, cada salida es un objeto (fichas) o `{ "items": [...] }` (listados y rankings).

## Consultas por RUC

| Herramienta | Título | Qué devuelve |
|---|---|---|
| `get_company_info` | Consultar empresa | Ficha por RUC: razón social, estado y condición del contribuyente, dirección con ubigeo y departamento/provincia/distrito, datos SUNAT (tipo de contribuyente, nombre comercial, fechas de inscripción e inicio de actividades, domicilio fiscal). Úsala para identificar a la empresa antes de pedir sus listados. |
| `get_company_status` | Consultar estado SUNAT | Situación fiscal y legal: estado y condición SUNAT, buen contribuyente, sanciones o inhabilitaciones vigentes (Tribunal de Contrataciones, Poder Judicial u otras), contratos con penalidad desde 2018 y deuda en cobranza coactiva mayor a 5 UIT (principales y medianos contribuyentes, con sus representantes legales ante SUNAT). No incluye deuda en litigio ni en proceso concursal. |
| `get_company_track` | Consultar historial de empresa | Historial anual de contratos, convocatorias, adjudicaciones y postulaciones de una empresa o consorcio. |

```json
{ "ruc": "20512345678" }
```

## Listados por RUC (con filtro de fecha y paginación)

| Herramienta | Título | Qué devuelve | Fecha filtrada |
|---|---|---|---|
| `get_company_contracts` | Listar contratos de empresa | Contratos registrados por las entidades: fechas de suscripción, inicio y fin, prórrogas, adicionales y reducciones. Entre la adjudicación y la suscripción puede transcurrir tiempo (recurso impugnativo, proveedor que no suscribe, etc.). | publicación |
| `get_company_directs` | Listar contratos directos | Procesos adjudicados por contratación directa (sin concurso público), con los datos de la buena pro. | buena pro |
| `get_company_adjudications` | Listar adjudicaciones | Resultados de procesos adjudicados: proveedor adjudicado, valor y cantidad de la buena pro. No incluye procedimientos con datos incompletos de la adjudicación. | adjudicación |
| `get_company_convocatories` | Listar convocatorias | Convocatorias o invitaciones de procedimientos adjudicados. Un proceso puede declararse nulo, retrotraerse o postergarse, así que refleja lo publicado. | convocatoria |
| `get_company_bidders` | Listar postulaciones | Postulaciones (ofertas) de personas naturales y jurídicas en procesos adjudicados desde 2018 (Art. 61° Reglamento Ley 30225 y Art. 79° Reglamento Ley 32069). | oferta |
| `get_company_pronouncements` | Listar pronunciamientos | Pronunciamientos emitidos sobre la empresa: fecha de emisión y URL del documento; agrupados por año de publicación. | publicación |

```json
{ "ruc": "20512345678", "year": 2024, "limit": 20, "offset": 0 }
```

## Búsqueda y rankings

| Herramienta | Título | Input | Qué devuelve |
|---|---|---|---|
| `search_companies` | Buscar empresas por nombre | `q` (mínimo 3 caracteres) + paginación | RUC, razón social y estado SUNAT para encadenar con las demás herramientas (que exigen RUC). Paginable. |
| `get_companies_with_debt` | Empresas con deuda coactiva | `min_amount` (opcional, soles) + paginación | Ranking de empresas con deuda coactiva SUNAT: monto, dependencia y razón social, de mayor a menor. Es el saldo vigente al último corte; no filtrable por año. |
| `get_companies_with_penalties` | Empresas con más penalidades | `year` (obligatorio) + `entity` (opcional, texto en la entidad contratante, mín 3 caracteres) + paginación | Ranking por cantidad de penalidades aplicadas (PAC/OSCE, desde 2018), con conteo de entidades contratantes distintas. |

```json
{ "q": "constructora", "limit": 10 }
```

```json
{ "year": 2024, "entity": "ministerio", "limit": 10 }
```

## Flujo recomendado

`search_companies` → `get_company_info` → listados con el RUC. Para direcciones y ubigeos usa `get_location` (ver [Obtener convocatorias](/mcp/obtener-convocatorias/), herramientas complementarias).

Por ejemplo: busca la empresa por nombre, identifica su RUC en el resultado y pide ficha, estado SUNAT o cualquier listado con ese RUC. Los rankings (`deuda`, `penalidades`) no requieren RUC: sirven para descubrir empresas y luego profundizar con el flujo anterior.
