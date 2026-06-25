import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
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

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: "API - Controle de Produção",
  customfavIcon: "https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/favicon-32x32.png"
}));

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