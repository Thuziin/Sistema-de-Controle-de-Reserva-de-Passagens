import { useEffect, useState } from "react";
import Header from "../components/Header";
import CardTicket from "../components/CardTicket";
import ModalPassenger from "../components/ModalPassenger";
import ModalSeat from "../components/ModalSeat";
import logo from "../assets/Logo3.png";
import type { Ticket } from "../types/Ticket";

import "../styles/Home.css";

function Home() {
  const [modalSeatAberto, setModalSeatAberto] = useState(false);
  const [modalPassengerAberto, setModalPassengerAberto] = useState(false);

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketSelecionado, setTicketSelecionado] = useState<Ticket | null>(null);
  const [pesquisa, setPesquisa] = useState("");
  const [assentoSelecionado, setAssentoSelecionado] = useState<string | null>(null);

  

  useEffect(() => {
    fetch("http://localhost:3000/api/passagens")
      .then((response) => response.json())
      .then((dados) => {
        setTickets(dados);
      })
      .catch(console.error);
  }, []);

  const ticketsFiltrados = tickets.filter((ticket) =>
    ticket.destino.toLowerCase().includes(pesquisa.toLowerCase()),
  );

  return (
    <>
      <Header titulo="Início" logo={logo} mostrarLinkMyTicket />

      <main className="tickets-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Pesquisar"
            className="search-input"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
        </div>

        <h2 className="section-title">Sugestões</h2>

        <div className="cards-grid">
          {ticketsFiltrados.map((ticket) => (
            <CardTicket
              key={ticket.id}
              ticket={ticket}
              onClick={() => {
                setTicketSelecionado(ticket);
                setModalSeatAberto(true);
              }}
            />
          ))}
        </div>
      </main>

      <ModalSeat
        aberto={modalSeatAberto}
        fechar={() => setModalSeatAberto(false)}
        ticket={ticketSelecionado}
        avancarModalPassenger={(assento) => {
          setAssentoSelecionado(assento);
          setModalSeatAberto(false);
          setModalPassengerAberto(true);
        }}
      />

      <ModalPassenger
        aberto={modalPassengerAberto}
        fechar={() => setModalPassengerAberto(false)}
        ticket={ticketSelecionado}
        assentoSelecionado={assentoSelecionado}
        retonarModalSeat={() => {
          setModalPassengerAberto(false);
          setModalSeatAberto(true);
        }}
      />
    </>
  );
}

export default Home;
