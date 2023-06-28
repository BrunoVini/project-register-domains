import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Header from "../../components/Header";
import * as C from "./styles";
import api from "../../services/api";

const RegisterDomain = () => {
  const [domain, setDomain] = useState("");
  const userId = localStorage.getItem("id");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!domain) {
      setError("Coloque a url do dominio");
      return;
    }

    if (
      domain.includes("http://") ||
      domain.includes("https://") ||
      domain.includes("www.")
    ) {
      setError("Não coloque http://, https:// ou www.");
      return;
    }

    const domainRegex = /^(?!:\/\/)(?:[-A-Za-z0-9]+\.)+[A-Za-z]{2,6}$/;
    if (!domainRegex.test(domain)) {
      setError("Insira um domínio válido.");
      return;
    }

    try {
      const response = await api.post("/domains", {
        domain,
        user_id: userId,
      });

      if (response.status === 201) {
        alert("Domínio cadastrado com sucesso.");
        window.location.assign("/home");
      }
    } catch (error) {
      console.error("Erro ao cadastrar domínio", error);
      setError("Esse domínio não existe. Coloque outro domínio");
    }
  };

  return (
    <div style={C.container}>
      <Header />
      <div style={C.box}>
        <C.Content>
          <h1 style={C.title}>Cadastro de Domínio</h1>
          <p>Cadastre o dominio que desejar</p>
          <Input
            type="text"
            placeholder="exemplo.com"
            value={domain}
            onChange={(e) => [setDomain(e.target.value), setError("")]}
          />
          <C.labelError>{error}</C.labelError>
          <Button Text="Cadastrar" onClick={handleRegister} />
        </C.Content>
      </div>
    </div>
  );
};

export default RegisterDomain;
