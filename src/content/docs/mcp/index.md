---
title: Referencia MCP
description: Herramientas MCP del servidor rnr-api — personas, empresas y convocatorias.
---

El servidor MCP de rnr-api expone sus herramientas de consulta sobre los mismos controladores que la REST. Entrada común: el identificador del recurso (número de documento o RUC) más paginación (`limit`/`offset`) y filtros de fecha opcionales.

<CardGrid>
  <a class="card-link" href="/mcp/get-users/">
    <Card title="Obtener usuarios" icon="magnifier">
      Fichas de personas por DNI: get_user_info y collect_user_info.
    </Card>
  </a>
  <a class="card-link" href="/mcp/get-companies/">
    <Card title="Obtener compañías" icon="database">
      Fichas SUNAT, contratos, adjudicaciones y rankings de empresas.
    </Card>
  </a>
  <a class="card-link" href="/mcp/get-tenders/">
    <Card title="Obtener convocatorias" icon="document">
      Convocatorias y contratos por código OSCE, y ubicaciones por ubigeo.
    </Card>
  </a>
</CardGrid>
