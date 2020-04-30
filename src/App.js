import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api.js";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post("/repositories", {
      url: "https://github.com/Rocketseat/umbriel",
      title: `Repository Number ${Date.now()}`,
      techs: ["Node", "Express", "TypeScript"],
    });
    const repository = response.data;
    setRepositories([...repositories, repository]); //push
  }

  async function handleRemoveRepository(id) {
    await api.delete("/repositories/" + id);

    const repositorieIndex = repositories.findIndex(
      (repository) => repository.id === id
    );

    repositories.splice(repositorieIndex, 1);

    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
