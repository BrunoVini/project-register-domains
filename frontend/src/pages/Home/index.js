import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../../components/Header";
import { format } from "date-fns";
import * as C from "./styles";
import api from "../../services/api";

const Home = () => {
  const [domains, setDomains] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const name = localStorage.getItem("name");

  useEffect(() => {
    const userId = localStorage.getItem("id");

    const fetchDomains = async () => {
      try {
        setIsLoading(true);

        const response = await api.get(`/domains?user=${userId}`);

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

  return (
    <div style={C.container}>
      <Header />
      <main style={C.main}>
        <h1 style={C.title}>Bem vindo, {localStorage.getItem("name")}</h1>
        <p style={C.subtitle}>
          Esse é o seu painel. Veja aqui os domínios que você cadastrou e
          casdastre novos
        </p>

        <Link to="/registerDomain" style={C.registerButton}>
          Registrar Domínio
        </Link>

        <h3 style={C.h3}>Seus domínios:</h3>

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
                        <Link to={`/listSubdomains/${domain.id}`}>
                          {domain.main_domain}
                        </Link>
                      </p>
                      <p style={C.subdomains}>
                        <b>Subdomínios:</b>
                        {JSON.parse(domain.subdomains)
                          .slice(0, 8)
                          .map((subdomain) => (
                            <p style={C.subdomainSpan}>{subdomain}</p>
                          ))}
                        <br />
                        ...
                      </p>

                      <Link to={`/listSubdomains/${domain.id}`}>
                        <h3 style={C.linkSubdmains}>
                          Ver lista completa dos subdominios de &nbsp;
                          {domain.main_domain}
                        </h3>
                      </Link>

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
