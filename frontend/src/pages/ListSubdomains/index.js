import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { format } from "date-fns";
import * as C from "./styles";
import api from "../../services/api";
import { tr } from "date-fns/locale";

const Home = () => {
  const [domains, setDomains] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        setIsLoading(true);

        const response = await api.get(`/domain/${id}`);

        if (response.status === 200) {
          setDomains(response.data);
        } else if (response.status === 404) {
          setDomains(["Nenhum domínio cadastrado"]);
        } else {
          console.error("Erro ao buscar domínios");
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching domains", error);
        setIsLoading(false);
      }
    };
    fetchDomains();
  }, []);

  const handleDeleteDomain = async (id) => {
    try {
      const response = await api.delete(`/domain/${id}`);

      if (response.status === 202) {
        alert("Domínio excluído com sucesso");
        window.location.assign("/home");
      }
    } catch (error) {
      console.error("Erro ao excluir domínio", error);
    }
  };

  return (
    <div style={C.container}>
      <Header />
      <main style={C.main}>
        <h1 style={C.title}>Aqui está a lista de todos os subdominios</h1>
        <p style={C.subtitle}>
          Veja aqui a lista completa de subdominios do dominio que você
          cadastrou
        </p>
        <button style={C.deleteButton} onClick={() => handleDeleteDomain(id)}>
          Apagar esse dominio
        </button>

        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <>
            {domains.length > 0 ? (
              <>
                {domains.map(
                  (domain) => (
                    <>
                      <p style={C.mainDomain}>
                        <b>Domínio principal: </b>
                        {domain.main_domain}
                      </p>
                      <p style={C.subdomains}>
                        <b>Subdomínios:</b>
                        {JSON.parse(domain.subdomains).map((subdomain) => (
                          <p style={C.subdomainSpan}>{subdomain}</p>
                        ))}
                      </p>
                      <p style={C.subdomainSpan}>
                        Atualizado em{" "}
                        {format(
                          new Date(domain.update_at),
                          "dd/MM/yyyy HH:mm:ss"
                        )}
                      </p>
                      <p style={C.horizontalDivisor}></p>
                    </>
                  ),
                  []
                )}
              </>
            ) : (
              <p style={C.noDomain}>Nenhum domínio cadastrado</p>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
