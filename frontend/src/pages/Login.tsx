import login from "../assets/Login.png";
import pessoa from "../assets/PessoaLogin.png";
import cadiado from "../assets/CadiadoLogin.png";

import "../styles/Login.css";

function Login() {
  const handleLogin = () => {
    console.log("Login");
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-card">

          <div className="input-group">
            <span aria-hidden="true"><img className="pessoa" src={pessoa} alt="pessoa" /></span>
            <input
              type="text"
              placeholder="Usuário"
            />
          </div>

          <div className="input-group">
            <span aria-hidden="true"><img className="cadiado" src={cadiado} alt="cadiado" /></span>
            <input
              type="password"
              placeholder="Senha"
            />
          </div>

          <button onClick={handleLogin}>
            Login
          </button>

        </div>
      </div>

      <div className="login-right">
        <img src={login} alt="Login" />
      </div>
    </div>
  );
}

export default Login;