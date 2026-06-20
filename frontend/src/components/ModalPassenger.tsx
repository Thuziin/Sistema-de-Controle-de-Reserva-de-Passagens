import { useState } from "react";
import type { Ticket } from "../types/Ticket";
// import "../styles/ModalPassenger.css";

interface ModalPassengerProps {

}

function ModalPassenger({}: ModalPassengerProps) {
    return (
        <div className="overlay">
            <div className="modal">
                <h2>Cadastro de Passageiros</h2>
                <div className="formulario">
                    <input type="text" id="p_nome" placeholder="Primeiro nome" required/>
                    <input type="text" id="u_nome" placeholder="Sobrenome" required/>
                    <input type="text" id="cpf_passageiro" placeholder="CPF" required maxLength={11}/>
                </div>

                <button className="btn">Voltar</button>
                <button className="btn">Cadastrar</button>
            </div>
        </div>
    )
}

