import express from 'express';
import cors from 'cors'

import usuarioRouter from "./api/routes/usuariosRoute.js";
import produtosRouter from "./api/routes/produtosRoute.js";
import produtosTiposRouter from "./api/routes/produtosTiposRoute.js";
import ordemProducaoRouter from "./api/routes/ordemProducaoRoute.js";
import authRouter from "./api/routes/authRoute.js"

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (_req, res) => {
    res.send('hello world')
});

app.use("/auth", authRouter)
app.use("/usuarios", usuarioRouter);
app.use("/produtos", produtosRouter);
app.use("/tipos-produtos", produtosTiposRouter);
app.use("/ordem-producao", ordemProducaoRouter);

app.listen(port, () => console.log(`Servidor rodando na porta http://localhost:${port}`));