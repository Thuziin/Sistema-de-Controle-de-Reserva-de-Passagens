import { useEffect, useState } from "react";
import Header from "../components/Header";
import CardTicket from "../components/CardTicket";
import logo from "../assets/Logo3.png";
import type { Ticket } from "../types/Ticket";

import "../styles/MyTicket.css";

function MyTicket() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const cpf = localStorage.getItem("cpf");

    fetch(
      `http://localhost:3000/api/historico/${cpf}`
    )
      .then((response) => response.json())
      .then((dados) => {
        setTickets(dados);
      })
      .catch(console.error);
  }, []);

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