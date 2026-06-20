import express from "express";
import cors from "cors";
import { pool } from "./db";
import authRoutes from "./routes/authRoutes";
import passagemRoutes from "./routes/passagemRoutes";
import historicoRoutes from "./routes/historicoRoutes";
import compraRoutes from "./routes/compraRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", passagemRoutes);
app.use("/api", historicoRoutes);
app.use("/api", compraRoutes);

pool.query("SELECT NOW()")
    .then(() => console.log("Banco conectado!"))
    .catch(console.error);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});