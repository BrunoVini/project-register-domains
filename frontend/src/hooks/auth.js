import api from "../services/api";

export const handleSignin = async (useEmail, useSenha, setError) => {
  try {
    const response = await api.get("/users", {
      params: {
        email: useEmail,
        password: useSenha,
      },
    });

    const { id, name, email } = response.data[0];

    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("isLogged", true);

    setError("");

    window.location.assign("/home");
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        setError("Esse email não está cadastrado");
      } else if (error.response.status === 400) {
        setError("Senha incorreta");
      }
    } else {
      setError("Erro ao realizar a requisição");
    }
  }
};

export const handleSignup = async (name, email, password, setError) => {
  try {
    const response = await api.post("/users", { name, email, password });

    if (response.status === 201) {
      setError(false);
      console.log("Usuário cadastrado com sucesso!");
    } else {
      console.error("Erro ao cadastrar usuário.");
      return true;
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.error(error.response);
      setError("O e-mail informado já está cadastrado.");
      return true;
    } else {
      console.error("Erro ao cadastrar usuário:", error);
      return true;
    }
  }

  return false;
};

export const handleLogout = () => {
  localStorage.removeItem("id");
  localStorage.removeItem("name");
  localStorage.removeItem("email");
  localStorage.removeItem("isLogged");

  window.location.assign("/");
};
