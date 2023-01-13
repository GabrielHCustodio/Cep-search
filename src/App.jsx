import React, { useState } from "react";
import { CgSearch } from "react-icons/cg";

import api from "./services/api";

import "./App.css";

const App = () => {
  const [data, setData] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (data === "") {
      alert("Preencha o cep");
    }

    try {
      const response = await api.get(`${data}/json`);
      setCep(response.data);
      setData("");
    } catch {
      alert("Opss, erro ao buscar CEP");
      setData("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu cep..."
          value={data}
          onChange={(e) => setData(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <CgSearch />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>{cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
};

export default App;
