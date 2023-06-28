import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './artistaForm.css'

const ArtistaForm = () => {
  const [artistaData, setArtistaData] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newArtistaData, setNewArtistaData] = useState({
    id: '',
    nome: '',
    pais: '',
  });


  async function fetchArtista() {
    const response = await fetch(`http://localhost:8080/artista`);
    const data = await response.json();
    return data;
  }

  async function createArtista(artistaData) {
    try {
      const response = await fetch('http://localhost:8080/artista', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(artistaData),
      });

      if (!response.ok) {
        throw new Error('Failed to create artista');
      }


      // Author created successfully, fetch the updated list of authors
      const updatedArtista = await fetchArtista();
      setArtistaData(updatedArtista);
      setIsCreating(false);
      setNewArtistaData({
        id: '',
        nome: '',
        pais: '',
      });
    } catch (error) {
      console.error(error);
      // Handle the error here, show an error message, or perform any necessary actions
    }
  }


  return (
    <div>
      <h2>Create New Artista</h2>
      <button className="create-button-artista" onClick={() => setIsCreating(true)}>
        Create Artista
      </button>
      {isCreating && (
        <div>
          <h3>Creating . . .</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createArtista(newArtistaData);
            }}
          >
            <label>
              Nome:
              <input
                type="text"
                value={newArtistaData.nome}
                onChange={(e) => setNewArtistaData({ ...newArtistaData, nome: e.target.value })}
              />
            </label>
            <label>
              Pais:
              <input
                type="text"
                value={newArtistaData.pais}
                onChange={(e) =>
                  setNewArtistaData({ ...newArtistaData, pais: e.target.value })
                }
              />
            </label>
            <button type="submit" className="artistaButtonCr">
              Create
            </button>
            <button onClick={() => setIsCreating(false)} className="artistaButtonD">
              Cancel
            </button>
          </form>
        </div>
      )}
      <Link to="/artista">
        <button className="create-button-artistaForm">Ver Artistas </button>
      </Link>
    </div>
  );
};

export { ArtistaForm };
