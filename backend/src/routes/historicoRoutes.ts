import { Router } from "express";
import { pool } from "../db";

const router = Router();
router.get("/historico/:cpf", async (req, res) => {

    try {
        const { cpf } = req.params;
        const resultado = await pool.query(
            `
            SELECT
                v.id,
                partida.cidade AS origem,
                chegada.cidade AS destino,
                TO_CHAR(p.data,'DD/MM/YYYY') AS data,
                TO_CHAR(p.hora,'HH24:MI') AS hora,
                partida.identificador AS aeroporto,
                p.assento,
                p.pnome_passageiro || ' ' || p.unome_passageiro AS passageiro
            FROM passagem p
            INNER JOIN voo v
                ON p.voo_id = v.id
            LEFT JOIN aeroporto partida
                ON v.aeroporto_id_partida = partida.identificador
            LEFT JOIN aeroporto chegada
                ON v.aeroporto_id_chegada = chegada.identificador
            WHERE p.pessoa_cpf_compra = $1;
            `,
            [cpf]
        );
        res.json(resultado.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro no servidor" });
    }
});

export default router;