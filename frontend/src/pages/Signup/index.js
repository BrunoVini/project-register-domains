import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { handleSignup } from "../../hooks/auth";

const Signup = () => {
  const [nome, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [requirementsMet, setRequirementsMet] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const handleLogup = async () => {
    if (!nome | !email | !emailConf | !senha) {
      setError("Preencha todos os campos");
      return;
    } else if (email !== emailConf) {
      setError("Os e-mails não são iguais");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Insira um email válido");
      return;
    }

    setRequirementsMet({
      length: senha.length >= 8,
      uppercase: /[A-Z]/.test(senha),
      lowercase: /[a-z]/.test(senha),
      number: /\d/.test(senha),
      specialChar: /[@$!%*?&]/.test(senha),
    });

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(senha)) {
      setError(
        "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial"
      );
      return;
    }

    try {
      const error = await handleSignup(nome, email, senha, setError);

      if (!error) {
        alert("Cadastro realizado com sucesso!");
        window.location.assign("/home");
      } else {
        setError("Este e-mail já está cadastrado");
      }
    } catch (error) {
      console.error("Erro ao cadastrar", error);
      setError("Erro ao cadastrar. Por favor, tente novamente.");
    }
  };

  return (
    <C.Container>
      <C.Label>CRIE SUA CONTA</C.Label>
      <C.Content>
        <Input
          type="text"
          placeholder="Digite seu Nome"
          value={nome}
          onChange={(e) => [setName(e.target.value), setError("")]}
        />
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="email"
          placeholder="Confirme seu E-mail"
          value={emailConf}
          onChange={(e) => [setEmailConf(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value);
            setError("");
            setRequirementsMet({
              length: e.target.value.length >= 8,
              uppercase: /[A-Z]/.test(e.target.value),
              lowercase: /[a-z]/.test(e.target.value),
              number: /\d/.test(e.target.value),
              specialChar: /[@$!%*?&]/.test(e.target.value),
            });
          }}
        />
        <C.labelError>{error}</C.labelError>
        <C.labelInfoTitle>A senha deve conter pelo menos:</C.labelInfoTitle>
        <C.labelInfo style={requirementsMet.length ? { color: "green" } : null}>
          8 caracteres
        </C.labelInfo>
        <C.labelInfo
          style={requirementsMet.uppercase ? { color: "green" } : null}
        >
          Uma letra maiúscula
        </C.labelInfo>
        <C.labelInfo
          style={requirementsMet.lowercase ? { color: "green" } : null}
        >
          Uma letra minúscula
        </C.labelInfo>
        <C.labelInfo style={requirementsMet.number ? { color: "green" } : null}>
          Um número
        </C.labelInfo>
        <C.labelInfo
          style={requirementsMet.specialChar ? { color: "green" } : null}
        >
          Um caractere especial
        </C.labelInfo>
        <Button Text="Inscrever-se" onClick={handleLogup} />
        <C.LabelSignin>
          Já tem uma conta?
          <C.Strong>
            <Link to="/">&nbsp;Entre</Link>
          </C.Strong>
        </C.LabelSignin>
      </C.Content>
    </C.Container>
  );
};

export default Signup;
