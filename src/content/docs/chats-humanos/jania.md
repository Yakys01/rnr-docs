---
title: Jania
description: Cómo usar rnr-api desde Jania con un servidor MCP remoto.
---

:::note[URL por confirmar]
TODO: completar con la URL pública de Jania y su flujo de conexión MCP.
:::

Jania se conecta a rnr-api como servidor MCP remoto. Antes de empezar necesitas tus credenciales de la plataforma ([www.runrunapi.com](https://www.runrunapi.com)), o un API key de sesión de la REST si Jania no soporta OAuth.

## Conectar el servidor

1. Ingresa a la plataforma de Jania con tu cuenta.
2. En integraciones/conectores, registra un servidor MCP remoto con la URL `https://api.runrunapi.com/mcp`.
3. Autentícate vía OAuth del AS de la plataforma (o pega un API key de sesión si Jania no soporta OAuth).
4. Habilita las herramientas de rnr-api en el chat y consulta por DNI, RUC o código OSCE.

## Qué puedes preguntar

- *"Dame la ficha de la persona con DNI 12345678"*
- *"Busca empresas que contengan 'constructora'"*
- *"Dame el detalle de la convocatoria C1234567"*

## Si algo falla

- Si Jania no lista herramientas, revisa que la URL sea exactamente `https://api.runrunapi.com/mcp` y que el Bearer sea válido.
- El detalle de cada herramienta (entradas y salidas) está en la [MCP Referencia](/mcp/obtener-usuarios/).
