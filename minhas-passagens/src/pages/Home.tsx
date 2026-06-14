import { useState } from "react";

import Header from "../components/Header";
import CardTicket from "../components/CardTicket";
import ModalSeat from "../components/ModalSeat";

import logo from "../assets/Logo3.png";

import type { Ticket } from "../types/Ticket";

import "../styles/Home.css";

function Home() {
  const [modalAberto, setModalAberto] = useState(false);

  const tickets: Ticket[] = [
    {
      id: 1,
      origem: "Belo Horizonte",
      destino: "SP",
      data: "15/07/2026",
      hora: "08:30",
      aeroporto: "Galeão",
    },
    {
      id: 2,
      origem: "Belo Horizonte",
      destino: "SP",
      data: "15/07/2026",
      hora: "08:30",
      aeroporto: "Galeão",
    },
    {
      id: 3,
      origem: "Belo Horizonte",
      destino: "SP",
      data: "15/07/2026",
      hora: "08:30",
      aeroporto: "Galeão",
    },
    {
      id: 4,
      origem: "Belo Horizonte",
      destino: "SP",
      data: "15/07/2026",
      hora: "08:30",
      aeroporto: "Galeão",
    },
  ];

  return (
    <>
      <Header
        titulo="Início"
        logo={logo}
        mostrarLinkMyTicket
      />

      <main className="tickets-container">

        <div className="search-container">
          <input
            type="text"
            placeholder="Pesquisar"
            className="search-input"
          />
        </div>

        <h2 className="section-title">
          Sugestões
        </h2>

        <div className="cards-grid">
          {tickets.map((ticket) => (
            <CardTicket
              key={ticket.id}
              ticket={ticket}
              onClick={() => {
                console.log("Cliquei no card");
                setModalAberto(true);
              }}
            />
          ))}
        </div>

      </main>

      <ModalSeat
        aberto={modalAberto}
        fechar={() => setModalAberto(false)}
      />
    </>
  );
}

export default Home;