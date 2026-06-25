import { Router } from "express";
import { pool } from "../db";

const router = Router();

router.get("/assentos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query(
            `
            SELECT A.N_ASSENTOS
            FROM AERONAVE A
            JOIN VOO V
            ON A.INSCRICAO = V.AERONAVE_Inscricao
            JOIN PASSAGEM P
            ON P.VOO_ID = V.ID
            WHERE P.ID = $1;
            `,
            [id]
        );

        if (resultado.rows.length === 0) {
            res.status(400).json({
                mensagem: "Nenhum assento foi encontrado para essa aeronave"
            });
        }

        res.json(resultado.rows[0].n_assentos);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensagem: "Erro ao buscar número de assentos"
        })
    }
});

export default router;