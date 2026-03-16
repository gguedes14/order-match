import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../../components/input/input";
import { Button } from "../../components/button/button";

import { login } from "../../services/authService";

import "../../styles/pages/login.css";

import logo from "../../assets/icons/logo.svg";

export function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    const token = await login(username);

    localStorage.setItem("access_token", token);

    navigate("/order");
  }

  return (
    <div className="login-container">
      <img className="login-logo" src={logo} alt="Login" />

      <Input
        placeholder="nome de usuário"
        value={username}
        onChange={setUsername}
      />

      <Button onClick={handleLogin}>
        Login
      </Button>

      <Link to="/create" className="text">
        Criar usuário
      </Link>
    </div>
  );
}
