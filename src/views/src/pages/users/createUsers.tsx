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
  const navigate = useNavigate();

  async function handleCreateUser() {
    await createUsers(username);

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
    </div>
  );
}
