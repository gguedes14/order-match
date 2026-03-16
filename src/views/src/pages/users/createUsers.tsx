import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "../../components/input/input";
import { Button } from "../../components/button/button";

import { createUsers } from "../../services/users/createUsers"

import "../../styles/pages/login.css";
import "../../styles/pages/createUsers.css";

import logo from "../../assets/icons/logo.svg";
import arrowBack from "../../assets/icons/arrow-back.svg";

export function CreateUsers() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  async function handleCreateUser() {
    setError(null);

    const result = await createUsers(username);

    if (result.status === 409) {
      setError("Usuário não pode ser criado");
      return;
    }

    if (result.status === 500) {
      setError("Erro inesperado");
      return;
    }

    navigate("/login");
  }

  return (
    <div className="create-user-container">
      <img className="login-logo" src={logo} alt="Login" />
      <img
        className="arrow-back"
        src={arrowBack}
        alt="Voltar"
        onClick={() => navigate("/login")}
      />

      <Input
        placeholder="nome de usuário"
        value={username}
        onChange={setUsername}
      />

      <Button onClick={handleCreateUser}>
        Criar usuário
      </Button>

      {error && <p className="error">{error}</p>}
    </div>
  );
}
