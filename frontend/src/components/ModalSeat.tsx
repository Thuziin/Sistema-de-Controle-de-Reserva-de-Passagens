import { useEffect, useState } from "react";
import type { Ticket } from "../types/Ticket";
import "../styles/ModalSeat.css";

interface ModalSeatProps {
  aberto: boolean;
  fechar: () => void;
  ticket: Ticket | null;
  avancarModalPassenger: (assento: string) => void;
}

function ModalSeat({ aberto, fechar, ticket, avancarModalPassenger }: ModalSeatProps) {
  const [assentoSelecionado, setAssentoSelecionado] = useState<string | null>(
    null,
  );

  const [seats, setSeats] = useState<string[]>([]);


  useEffect(() => {
    if (aberto && ticket?.id) {
      fetch(
        `http://localhost:3000/api/assentos/${ticket?.id}`
      ).then((response) => response.text())
       .then((dados) => {
          const totalAssentos = Number(dados);
          const letrasColunas = ["A", "B", "C", "D", "E", "F"];
          
          const totalFileiras = Math.ceil(totalAssentos / letrasColunas.length);
          const listaGerada: string[] = [];

          for (const letra of letrasColunas) {
            for (let fileira = 1; fileira <= totalFileiras; fileira++) {
              
              if (listaGerada.length >= totalAssentos) break;
              
              listaGerada.push(`${fileira}${letra}`);
            }
          }

          setSeats(listaGerada);
       })
       .catch((error) => console.error("Erro no fetch:", error));
    }
  }, [aberto, ticket]);

  if (!aberto) return null;

  function registrarPassageiro() {
    if (!assentoSelecionado || !ticket) {
      alert("Selecione um assento primeiro!");
      return ;
    }

    avancarModalPassenger(assentoSelecionado);
  }

  return (
    <div className="overlay">
      <div className="modal">
        <h2>Lugares Disponíveis</h2>

        <div className="assentos">
          {seats.map((seat: string) => (
            <button
              key={seat}
              className={assentoSelecionado === seat ? "seat selected" : "seat"}
              onClick={() => setAssentoSelecionado(seat)}
            >
              {seat}
            </button>
          ))}
        </div>

        <button className="btn-adquirir" onClick={registrarPassageiro}>
          Adquirir
        </button>
      </div>
    </div>
  );
}

export default ModalSeat;
