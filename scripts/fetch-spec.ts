import { access, mkdir, readFile, writeFile } from "node:fs/promises";

import { ENV } from "../src/constants";

/**
 * Descarga el spec OpenAPI del API (endpoint de la API & MCP, `ENV.APPAPI_URL`) y
 * lo deja en `public/openapi.json` para que la referencia (Scalar, en `/reference`)
 * lo sirva desde el mismo origen, sin CORS. Si el API no está levantado, reusa el
 * último snapshot local.
 *
 * Además inyecta los links de los docs (`x-scalar-links`), que Scalar muestra en la
 * Introduction. La URL es relativa, así que resuelve contra el origen de los docs.
 *
 * Corre al inicio de `dev` y `build` (ver package.json).
 */
const server = ENV.APPAPI_URL;
const specUrl = `${server}/openapi/json`;
const specOut = new URL("../public/openapi.json", import.meta.url);

/** Links que Scalar muestra junto a la info del API. */
const links = [{ name: "Introducción", url: "/docs/" }];

let spec: any;
try {
  const response = await fetch(specUrl);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  spec = await response.json();
  console.log(`openapi.json actualizado desde ${specUrl}`);
} catch (error) {
  try {
    await access(specOut);
    console.warn(`No se pudo actualizar openapi.json (${error}); usando el snapshot existente.`);
    spec = JSON.parse(await readFile(specOut, "utf8"));
  } catch {
    throw new Error(`No se pudo descargar el spec desde ${specUrl} y no hay snapshot en public/openapi.json`);
  }
}

spec.info = { ...spec.info, "x-scalar-links": links };
await mkdir(new URL("../public/", import.meta.url), { recursive: true });
await writeFile(specOut, JSON.stringify(spec, null, 2));
