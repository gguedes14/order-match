import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../../components/input/input";
import { Button } from "../../components/button/button";

import { login } from "../../services/login/authService";

import "../../styles/pages/login.css";

import logo from "../../assets/icons/logo.svg";

export function Login() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  async function handleLogin() {
    setError(null);

    const result = await login(username);

    if (result.status === 401) {
      setError("Usuário inválido");
      return;
    }

    if (result.status === 500) {
      setError("Erro inesperado");
      return;
    }

    localStorage.setItem("access_token", result.token!);
    navigate("/order");
  }

  return (
    <div className="login-container">
      <img className="login-logo" src={logo} alt="Login" />

      <Input
        placeholder="nome de usuário"
        value={username}
        onChange={(value) => {
          setUsername(value);
          setError(null);
        }}
      />

      <Button onClick={handleLogin}>
        Login
      </Button>

      <Link to="/create" className="text">
        Criar usuário
      </Link>

      {error && <p className="error">{error}</p>}
    </div>
  );
}
