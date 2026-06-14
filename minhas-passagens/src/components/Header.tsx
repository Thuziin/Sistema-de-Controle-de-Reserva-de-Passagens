import "../styles/Header.css";
import { NavLink } from "react-router-dom";

interface HeaderProps {
  titulo: string;
  logo: string;
  mostrarLinkHome?: boolean;
  mostrarLinkMyTicket?: boolean;
}

function Header({ logo }: HeaderProps) {
  return (
    <header className="header">
      <img
        className="header-logo"
        src={logo}
        alt="Logo"
      />

      <div className="header-center">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "nav-button active" : "nav-button"
          }
        >
          Início
        </NavLink>

        <NavLink
          to="/myticket"
          className={({ isActive }) =>
            isActive ? "nav-button active" : "nav-button"
          }
        >
          Minhas Passagens
        </NavLink>
      </div>
    </header>
  );
}

export default Header;