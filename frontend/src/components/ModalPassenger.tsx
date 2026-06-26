import { useState } from "react";
import type { Ticket } from "../types/Ticket";
import "../styles/ModalPassenger.css";

interface ModalPassengerProps {
    aberto: boolean;
    fechar: () => void;
    ticket: Ticket | null;
    assentoSelecionado: string | null;
    retonarModalSeat: () => void;
}

function ModalPassenger({ aberto, fechar, ticket, assentoSelecionado, retonarModalSeat } : ModalPassengerProps) {
    const [p_nome, setPNome] =  useState("");
    const [u_nome, setUNome] = useState("");
    const [cpf_passageiro, setCPF] = useState("");


    if (!aberto) return null;
    
    async function registrarPassageiro() {
        if (!assentoSelecionado || !p_nome || !u_nome || !cpf_passageiro || !ticket) {
            alert ("Os dados do formulário são obrigatórios");
            return ;
        }

        const cpf = localStorage.getItem("cpf");

        try {
            const response = await fetch("http://localhost:3000/api/comprar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cpf,
                    passagemId: ticket.id,
                    assento: assentoSelecionado,
                    pnome_passageiro: p_nome,
                    unome_passageiro: u_nome
                }),
            });

            if (!response.ok) {
                throw new Error();
            }

            alert("Passagem adquirida!");

            fechar();

            window.location.reload();
        } catch (err) {
            alert(err);
        }
    } 

    return (
        <div className="overlayP">
            <div className="modalP">
                <h2 className="tituloP">Cadastro de Passageiros</h2>
                <div className="formulario">

                    <div className="input-groupP">
                        <input 
                            type="text" 
                            placeholder="Primeiro nome"
                            value={p_nome}
                            onChange={(e) => setPNome(e.target.value)} 
                            required/>
                    </div>

                    <div className="input-groupP">
                        <input 
                            type="text"
                            placeholder="Sobrenome" 
                            value={u_nome} 
                            onChange={(e) => setUNome(e.target.value)}
                            required/>

                    </div>

                    <div className="input-groupP">
                        <input 
                            type="tel" 
                            placeholder="CPF" 
                            value={cpf_passageiro}
                            onChange={(e) => setCPF(e.target.value)}
                            required 
                            maxLength={11}/>
                    </div>


                    <h3 className="tituloP">
                        Assento Selcionado: {assentoSelecionado}
                    </h3>
                </div>

                <button className="btnP" onClick={retonarModalSeat}>Voltar</button>
                <button className="btnP" onClick={registrarPassageiro}>Cadastrar</button>
            </div>
        </div>
    )
}

export default ModalPassenger;