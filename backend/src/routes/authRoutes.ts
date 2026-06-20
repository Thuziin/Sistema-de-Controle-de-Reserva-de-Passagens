import { Router } from "express";
import { pool } from "../db";

const router = Router();
router.post("/login", async (req, res) => {

    try {
        const { cpf, senha } = req.body;
        const resultado = await pool.query(

            `
            SELECT cpf, p_nome, u_nome, email
            FROM pessoa
            WHERE cpf = $1 AND senha = $2
            `,
            [cpf, senha]
        );

        if (resultado.rows.length === 0) {
            return res.status(401).json({
                mensagem: "CPF ou senha inválidos"
            });
        }
        res.json(resultado.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro no servidor" });
    }
});

export default router;