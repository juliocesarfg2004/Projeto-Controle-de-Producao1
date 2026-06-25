import express from "express";
import cors from "cors";
import { swaggerSpec } from "./config/swagger.js";

import usuarioRouter from "./routes/usuariosRoute.js";
import produtosRouter from "./routes/produtosRoute.js";
import produtosTiposRouter from "./routes/produtosTiposRoute.js";
import ordemProducaoRouter from "./routes/ordemProducaoRoute.js";
import authRouter from "./routes/authRoute.js"

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get('/api-docs.json', (_req, res) => {
  res.json(swaggerSpec);
});

app.get('/', (_req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>API - Controle de Produção</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css">
  <style>
    html { box-sizing: border-box; overflow-y: scroll; }
    *, *:before, *:after { box-sizing: inherit; }
    body { margin: 0; background: #fafafa; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script>
    SwaggerUIBundle({
      url: '/api-docs.json',
      dom_id: '#swagger-ui',
      deepLinking: true,
      presets: [SwaggerUIBundle.presets.apis],
      layout: 'BaseLayout'
    });
  </script>
</body>
</html>`);
});

app.use("/auth", authRouter)

app.use("/usuarios", usuarioRouter);
app.use("/produtos", produtosRouter);
app.use("/tipos-produtos", produtosTiposRouter);
app.use("/ordem-producao", ordemProducaoRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "OK", message: "API está funcionando" });
});

app.use((_req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

export default app;