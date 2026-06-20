import { Router } from "express";
import { pool } from "../db";

const router = Router();

router.get("/passagens", async (req, res) => {
    try {

        const resultado = await pool.query(`
      SELECT
        p.id,
        partida.cidade AS origem,
        chegada.cidade AS destino,
        TO_CHAR(p.data, 'DD/MM/YYYY') AS data,
        TO_CHAR(p.hora, 'HH24:MI') AS hora,
        partida.identificador AS aeroporto

      FROM passagem p

      JOIN voo v
        ON p.voo_id = v.id

      JOIN aeroporto partida
        ON v.aeroporto_id_partida = partida.identificador

      JOIN aeroporto chegada
        ON v.aeroporto_id_chegada = chegada.identificador

      WHERE p.pessoa_cpf_compra = '00000000000'
    `);

        res.json(resultado.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensagem: "Erro ao buscar passagens"
        });
    }
});

export default router;