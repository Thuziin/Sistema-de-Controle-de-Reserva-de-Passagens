import { useState } from "react";
import type { Ticket } from "../types/Ticket";
import "../styles/ModalSeat.css";

interface ModalSeatProps {
  aberto: boolean;
  fechar: () => void;
  ticket: Ticket | null;
}

function ModalSeat({
  aberto,
  fechar,
  ticket
}: ModalSeatProps) {

  const [assentoSelecionado, setAssentoSelecionado] =
    useState<string | null>(null);
  const seats: string[] = ["1A", "1B", "1C", "2A", "2B", "2C"];

  if (!aberto) return null;

  async function adquirirPassagem() {

    if (!assentoSelecionado || !ticket) {
      alert("Selecione um assento");
      return;
    }

    const cpf = localStorage.getItem("cpf");

    try {

      const response = await fetch(
        "http://localhost:3000/api/comprar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cpf,
            passagemId: ticket.id,
            assento: assentoSelecionado
          }),
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      alert("Passagem adquirida!");

      fechar();

      window.location.reload();

      fechar();

    } catch {
      alert("Erro ao adquirir passagem");
    }
  }

  return (
    <div className="overlay">

      <div className="modal">

        <h2>Lugares Disponíveis</h2>

        <div className="assentos">

          {seats.map((seat: string) => (
            <button
              key={seat}
              className={
                assentoSelecionado === seat
                  ? "seat selected"
                  : "seat"
              }
              onClick={() =>
                setAssentoSelecionado(seat)
              }
            >
              {seat}
            </button>
          ))}

        </div>

        <button
          className="btn-adquirir"
          onClick={adquirirPassagem}
        >
          Adquirir
        </button>

      </div>

    </div>
  );
}

export default ModalSeat;