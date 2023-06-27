import React, { useEffect, useState } from 'react';
import './musicas.css';


const Musicas = () => {
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

  async function createMusicas(authorData) {
    try {
      const response = await fetch('http://localhost:8080/musicas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authorData),
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

  async function deleteMusicas(id) {
    try {
      const response = await fetch(`http://localhost:8080/musicas/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete author');
      }

      // Author deleted successfully, fetch the updated list of authors
      const updatedMusicas = await fetchMusicas();
      setMusicasData(updatedMusicas);
    } catch (error) {
      console.error(error);
      // Handle the error here, show an error message, or perform any necessary actions
    }
  }

  async function updateMusicas(id, updatedData) {
    try {
      const response = await fetch(`http://localhost:8080/musicas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update author');
      }
  
      // Author updated successfully, fetch the updated list of authors
      const updatedMusicas = await fetchMusicas();
      setMusicasData(updatedMusicas);
      setSelectedMusicasId(null);
      setIsUpdating(false);
    } catch (error) {
      console.error(error);
      // Handle the error here, show an error message, or perform any necessary actions
    }
  }

  useEffect(() => {
    fetchMusicas().then((data) => {
      setMusicasData(data);
      console.log(data);
    });
  }, []);

  const handleEditClick = (id) => {
    setSelectedMusicasId(id);
    setIsUpdating(true);
  };

  return (
    <div>
      <h2>Página de Musicas</h2>
      {musicasData.length === 0 ? (
        <div>
          <p>Carregando os dados...</p>
        </div>
      ) : (
        <div className="table-container">
          <h3>Os dados foram carregados com sucesso!</h3>
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
                <button type="submit" className="musicasButton">
                  Create
                </button>
                <button onClick={() => setIsCreating(false)} className="musicasButton">
                  Cancel
                </button>
              </form>
            </div>
          )}
          <table className="custom-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Genero</th>
                <th>DataLancamento</th>
                <th>ArtistaId</th>
                <th>AlbumId</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {musicasData.map((musicas) => (
                <tr key={musicas.id}>
                  <td>{musicas.id}</td>
                  <td>{musicas.nome}</td>
                  <td>{musicas.genero}</td>
                  <td>{musicas.dataLancamento}</td>
                  <td>{musicas.artistaId}</td>
                  <td>{musicas.albumId}</td>
                  <td>
                    <button onClick={() => handleEditClick(musicas.id)} className='musicasButton'>Edit</button>
                    <button onClick={() => deleteMusicas(musicas.id)} className='musicasButton'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isUpdating && selectedMusicasId && (
  <div>
    <h3>Update Musicas</h3>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const updatedData = {
          nome: document.getElementById('updated-nome').value,
          genero: document.getElementById('updated-genero').value,
          dataLancamento: document.getElementById('updated-dataLancamento').value,
          artistaId: document.getElementById('updated-artistaId').value,
          albumId: document.getElementById('updated-albumId').value,
        };
        updateMusicas(selectedMusicasId, updatedData);
      }}
    >
      <label>
        Nome:
        <input type="text" id="updated-nome" defaultValue={newMusicasData.nome} />
      </label>
      <label>
        Genero:
        <input
          type="text"
          id="updated-genero"
          defaultValue={newMusicasData.genero}
        />
      </label>
      <label>
        DataLancamento:
        <input
          type="text"
          id="updated-dataLancamento"
          defaultValue={newMusicasData.dataLancamento}
        />
      </label>
      <label>
        ArtistaId:
        <input
          type="text"
          id="updated-artistaId"
          defaultValue={newMusicasData.artistaId}
        />
      </label>
      <label>
        AlbumId:
        <input
          type="text"
          id="updated-albumId"
          defaultValue={newMusicasData.albumId}
        />
      </label>
      <button type="submit" className="musicasButton">
        Update
      </button>
      <button onClick={() => setIsUpdating(false)} className="musicasButton">
        Cancel
      </button>
    </form>
  </div>
)}
        </div>
      )}
    </div>
  );
};

const MusicasId = ({ id }) => {
  const [musicasData, setMusicasData] = useState([]);

  useEffect(() => {
    const fetchMusicas = async () => {
      const response = await fetch(`http://localhost:8080/musicas/${id}`);
      const data = await response.json();
      setMusicasData(data);
      console.log(data);
    };

    fetchMusicas();
  }, [id]);

  return (
    <div>
      {musicasData.length === 0 ? (
        <div>
          <p>..</p>
        </div>
      ) : (
        <div>
          <div key={musicasData.id}>
          <p>{musicasData.nome} {musicasData.genero} {musicasData.dataLancamento} {musicasData.artistaId} {musicasData.albumId}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export { Musicas, MusicasId };
