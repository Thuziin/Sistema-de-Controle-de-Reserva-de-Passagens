import { useState } from "react";
import { useNavigate } from "react-router-dom";
import login from "../assets/Login.png";
import pessoa from "../assets/PessoaLogin.png";
import cadiado from "../assets/CadiadoLogin.png";

import ModalRegister from "../components/ModalRegister";

import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  const [modalAberto, setModalAberto] = useState(false);

  const handleLogin = async () => {
    try {

      const response = await fetch(
        "http://localhost:3000/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cpf,
            senha,
          }),
        }
      );

      if (!response.ok) {
        alert("CPF ou senha inválidos");
        return;
      }

      const usuario = await response.json();

      localStorage.setItem("cpf", usuario.cpf);

      navigate("/home");

    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com servidor");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-card">

          <div className="input-group">
            <span aria-hidden="true"><img className="pessoa" src={pessoa} alt="pessoa" /></span>
            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              maxLength={11}
            />
          </div>

          <div className="input-group">
            <span aria-hidden="true"><img className="cadiado" src={cadiado} alt="cadiado" /></span>
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button onClick={handleLogin}>
            Login
          </button>

          <button className="cadastro-link-btn"
            type="button"
            onClick={() => setModalAberto(true)}>
            Cadastre-se
          </button>

        </div>
      </div>

      <div className="login-right">
        <img src={login} alt="Login" />
      </div>

      <ModalRegister
        aberto={modalAberto}
        onClose={() => setModalAberto(false)}
      />
    </div>
  );
}

export default Login;