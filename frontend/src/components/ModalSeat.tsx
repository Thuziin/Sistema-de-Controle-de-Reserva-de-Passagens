import { useState } from "react";
import "../styles/ModalSeat.css";

interface ModalSeatProps {
  aberto: boolean;
  fechar: () => void;
}

function ModalSeat({
  aberto,
  fechar
}: ModalSeatProps) {

  const [assentoSelecionado, setAssentoSelecionado] =
    useState<string | null>(null);

  if (!aberto) return null;

  const seats = [
    "C3", "C4", "C5", "C6", "C7",
    "D3", "D4", "D5", "D6", "D7"
  ];

  function adquirirPassagem() {
    if (!assentoSelecionado) {
      alert("Selecione um assento!");
      return;
    }

    alert(`Assento ${assentoSelecionado} adquirido!`);
    fechar();
  }

  return (
    <div className="overlay">

      <div className="modal">

        <h2>Lugares Disponíveis</h2>

        <div className="assentos">

          {seats.map((seat) => (
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