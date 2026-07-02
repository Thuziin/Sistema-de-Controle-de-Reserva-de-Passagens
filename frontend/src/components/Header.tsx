import "../styles/Header.css";
import { NavLink, useNavigate } from "react-router-dom";

interface HeaderProps {
  titulo: string;
  logo: string;
  mostrarLinkHome?: boolean;
  mostrarLinkMyTicket?: boolean;
}

function Header({ logo }: HeaderProps) {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("cpf");
    localStorage.clear();
    navigate("/")
  }

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

        <nav className="header-nav">
          <button type="button" className="btn-logout" onClick={handleLogout}>Sair</button>
        </nav>
      </div>
    </header>
  );
}

export default Header;