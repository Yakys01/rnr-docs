---
title: Claude
description: Cómo usar rnr-api desde Claude con un conector MCP.
---

Claude (web o escritorio) se conecta a rnr-api como conector MCP remoto. Antes de empezar necesitas tus credenciales de la plataforma ([www.runrunapi.com](https://www.runrunapi.com)), que emite el token OAuth que Claude usará.

## Conectar el servidor

1. En Claude (web o escritorio) agrega el servidor en *Settings → Connectors → Add custom connector*.
2. URL: `https://api.runrunapi.com/mcp`.
3. Autenticación: OAuth con el AS de la plataforma; Claude completa el flujo con el discovery del metadata.
4. Con el conector activo, pregunta directamente.

## Qué puedes preguntar

- *"Busca empresas que contengan 'constructora' y dime su estado SUNAT"*
- *"Dame la ficha de la empresa con RUC 20512345678"*
- *"¿Qué convocatorias tiene la empresa X este año?"*

## Si algo falla

- Si Claude no lista herramientas, verifica que el conector quedó habilitado en la conversación.
- Si responde `401`, vuelve a conectar: Claude repite el flujo OAuth con el discovery del metadata.
- El detalle de cada herramienta (entradas y salidas) está en la [MCP Referencia](/mcp/obtener-usuarios/).
