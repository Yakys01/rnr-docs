---
title: Empezamos
description: Cómo conectarte al MCP de RunRunApi — endpoint, autenticación, cuota y paginación.
---

Esta guia te ayudara a introducirte de manera general en las integraciones tanto para profesionales que desen integrar nuestro mcp en su agente de IA favorito, y tambien para desarrolladores que buscan soluciones personalizadas.

## Profesionales

Para integrar las consultas en tus agentes IA favoritos hay varias opciones desde propietarias y abiertas (open source).

1. Crea tu cuenta en <a href="https://www.runrunapi.com" target="_blank" rel="noopener noreferrer">RunRunApi</a> no hace falta crear credenciales.
2. Si usas chats como [ChatGpt](/humans/chatgpt/) o [Claude](/humans/claude/) puedes ir a  directamente a la guia.
3. Con la guia, dicha integracion es por OAuth. 

Si deseas usar un cliente abierto que ejecuta modelos en local puedes usar [Jan IA (recomendado)](/humans/jan) u otros proveedores locales puedes consultar en [otros proveedores](/humans/other-providers/).

## Desarrolladores

Para implementaciones Apis Rest:

1. Obtén tus credenciales en la plataforma: <a href="https://www.runrunapi.com" target="_blank" rel="noopener noreferrer">RunRunApi</a>.
2. Prueba tu credencial con:
```ts
curl 'https://api.runrunapi.com/session/check?token=your_token'
```
2. Opcionalmente puedes probar tu token en [Apis Referencia](/reference) .
3. Consulta todos los endpoints en [Apis Referencia](/reference) .

Para integraciones MCP en chat personalizados:

1. Obtén tus credenciales en la plataforma: <a href="https://www.runrunapi.com" target="_blank" rel="noopener noreferrer">RunRunApi</a>.
2. Consulta datos de nuestro mcp con la siguiente estructura:.
```ts
const response = await fetch("https://api.runrunapi.com/mcp", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json, text/event-stream",
      authorization: `Bearer ${your_token}`,
    },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, "tools/list" }),
  });

  if (!response.ok) {
    throw new Error(`MCP ${response.status}: ${await response.text()}`);
  }

  // La respuesta SSE trae el JSON-RPC en la línea `data:`.
  const line = (await response.text())
    .split("\n")
    .find((row) => row.startsWith("data:"));
  if (!line) throw new Error("MCP: respuesta SSE sin data");

  return JSON.parse(line.slice(5));
```
3. Para mas informacion puedes consultar [MCP Referencia](/mcp).


**Nota:** El token obtenido en credenciales es compatible tanto para Apis Rest como para MCP.


#### Consideranciones tecnicas

- Solo `tools/call` descuenta cuota; el handshake y `tools/list` no consumen. Exceder los limites de tu plan o recarga responde HTTP 429 con error.
- Hay operacienes que realizan listado estas comparten el mismo convenio de paginación y fechas:

| Campo | Tipo | Descripción |
|---|---|---|
| `limit` | int ≥ 1 | Máximo de filas por sección (por defecto el límite global; para listados de empresa, el máximo permitido) |
| `offset` | int ≥ 0 | Filas a saltar por sección (0 por defecto) |
| `year` | int 2000–2100 | Año de la fecha a filtrar |
| `month` | int 1–12 | Mes de la fecha a filtrar |
| `day` | int 1–31 | Día de la fecha a filtrar |

- Los RUC admiten 11 dígitos de empresa o códigos de consorcio de 4 a 8 dígitos.
- Las salidas llegan como `structuredContent`: los objetos van directos y las listas se envuelven en `{ "items": [...] }`. Los errores se devuelven con `isError: true` y el mensaje en texto.
