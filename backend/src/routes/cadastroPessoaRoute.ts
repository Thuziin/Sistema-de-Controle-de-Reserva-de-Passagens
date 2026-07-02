import { Router } from "express";
import { pool } from "../db";

const router = Router();
router.post("/cadastrarPessoa", async (req, res) => {
    try {
        const { cpf, Pnome, Unome, email, telefone, dataNascimento, endereco, senha } = req.body;
        await pool.query(
            `
            INSERT INTO pessoa VALUES 
            (
             $1,
             $2,
             $3,
             $4,
             $5,
             $6,
             $7,
             $8
            )
            `,
            [cpf, Pnome, Unome, email, dataNascimento, senha, telefone, endereco]
        );

        res.json({
            mensagem: "Usuário cadastrado com sucesso!"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensagem: "Erro ao cadastrar usuário"
        });
    }
})

export default router;