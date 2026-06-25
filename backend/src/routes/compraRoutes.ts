import { Router } from "express";
import { pool } from "../db";

const router = Router();
router.post("/comprar", async (req, res) => {
    try {
        const { cpf, passagemId, assento } = req.body;
        await pool.query(
            `
            UPDATE passagem
            SET
              pessoa_cpf_compra = $1,
              passageiro_cpf = $1,
              assento = $2
            WHERE id = $3
            `,
            [cpf, assento, passagemId]
        );

        res.json({
            mensagem: "Passagem adquirida!"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensagem: "Erro ao comprar passagem"
        });
    }
});

export default router;