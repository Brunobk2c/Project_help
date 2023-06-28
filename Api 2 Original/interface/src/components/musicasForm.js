import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './musicas.css'

const MusicasForm = () => {
    const [musicasData, setMusicasData] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [newMusicasData, setNewMusicasData] = useState({
      id: '',
      nome: '',
      genero: '',
      dataLancamento: '',
      artistaId: '',
      albumId: ''
    });
    const [selectedMusicasId, setSelectedMusicasId] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
  
    async function fetchMusicas() {
      const response = await fetch(`http://localhost:8080/musicas`);
      const data = await response.json();
      return data;
    }
  
    async function createMusicas(musicasData) {
      try {
        const response = await fetch('http://localhost:8080/musicas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(musicasData),
        });
  
        if (!response.ok) {
          throw new Error('Failed to create author');
        }
  
        // Author created successfully, fetch the updated list of authors
        const updatedMusicas = await fetchMusicas();
        setMusicasData(updatedMusicas);
        setIsCreating(false);
        setNewMusicasData({
          id: '',
          nome: '',
          genero: '',
          dataLancamento: '',
          artistaId: '',
          albumId: ''
        });
      } catch (error) {
        console.error(error);
        // Handle the error here, show an error message, or perform any necessary actions
      }
    }


  return (
    <div>
      <h2>Create New Musicas</h2>
      <button className="create-button-musicas" onClick={() => setIsCreating(true)}>
            Create Musicas
          </button>
          {isCreating && (
            <div>
              <h3>Create New Musicas</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  createMusicas(newMusicasData);
                }}
              >
                <label>
                  Nome:
                  <input
                    type="text"
                    value={newMusicasData.nome}
                    onChange={(e) => setNewMusicasData({ ...newMusicasData, nome: e.target.value })}
                  />
                </label>
                <label>
                  genero:
                  <input
                    type="text"
                    value={newMusicasData.genero}
                    onChange={(e) =>
                      setNewMusicasData({ ...newMusicasData, genero: e.target.value })
                    }
                  />
                </label>
                <label>
                  DataLancamento:
                  <input
                    type="text"
                    value={newMusicasData.dataLancamento}
                    onChange={(e) =>
                      setNewMusicasData({ ...newMusicasData, dataLancamento: e.target.value })
                    }
                  />
                </label>
                <label>
                  ArtistaId:
                  <input
                    type="text"
                    value={newMusicasData.artistaId}
                    onChange={(e) =>
                      setNewMusicasData({ ...newMusicasData, artistaId: e.target.value })
                    }
                  />
                </label>
                <label>
                  AlbumId:
                  <input
                    type="text"
                    value={newMusicasData.albumId}
                    onChange={(e) =>
                      setNewMusicasData({ ...newMusicasData, albumId: e.target.value })
                    }
                  />
                </label>
                <button type="submit" className="musicasButtonCr">
                  Create
                </button>
                <button onClick={() => setIsCreating(false)} className="musicasButtonCa">
                  Cancel
                </button>
              </form>
        </div>
      )}
      <Link to="/musicas">
        <button className="create-button-artistaForm">Ver Musicas </button>
      </Link>
    </div>
  );
};

export { MusicasForm };
