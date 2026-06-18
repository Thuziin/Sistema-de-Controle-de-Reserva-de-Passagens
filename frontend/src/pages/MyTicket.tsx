import Header from "../components/Header";
import CardTicket from "../components/CardTicket";

import logo from "../assets/Logo3.png";

import type { Ticket } from "../types/Ticket";
import "../styles/MyTicket.css";

function MyTicket() {

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
        titulo="Minhas Passagens"
        logo={logo}
        mostrarLinkHome
      />

      <main>
        <h1>Minhas Passagens</h1>
        <div className="cards">
          {tickets.map((ticket) => (
            <CardTicket
              key={ticket.id}
              ticket={ticket}
            />
          ))}

        </div>

      </main>
    </>
  );
}

export default MyTicket;