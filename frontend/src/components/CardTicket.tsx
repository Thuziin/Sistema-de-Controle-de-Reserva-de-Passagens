import type { Ticket } from "../types/Ticket";
import "../styles/CardTicket.css";

interface CardTicketProps {
  ticket: Ticket;
  onClick?: () => void;
}

function CardTicket({
  ticket,
  onClick
}: CardTicketProps) {
  return (
    <div
      className="card-ticket"
      onClick={onClick}
    >
      <div className="ticket-route">
        <span>{ticket.origem}</span>
        <span className="plane">✈</span>
        <span>{ticket.destino}</span>
      </div>

      <div className="ticket-info">
        <div>
          <p className="label">Data</p>
          <p>{ticket.data}</p>
        </div>

        <div>
          <p className="label">Horário</p>
          <p>{ticket.hora}</p>
        </div>
      </div>

      <div className="ticket-airport">
        <p className="label">Aeroporto</p>
        <p>{ticket.aeroporto}</p>
      </div>
      {ticket.assento && (
          <div className="ticket-airport">
            <p className="label">Assento</p>
            <p><strong>{ticket.assento}</strong></p>
          </div>
        )}

      {ticket.passageiro && (
        <div className="ticket-passenger-footer">
          <p className="label">Passageira(o)</p>
          <p className="passenger-name">{ticket.passageiro}</p>
        </div>
      )}
    </div>
  );
}

export default CardTicket;