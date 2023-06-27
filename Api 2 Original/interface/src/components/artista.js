import React, { useEffect, useState } from 'react';
import './artista.css';


const Artista = () => {
  const [artistaData, setArtistaData] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newArtistaData, setNewArtistaData] = useState({
    id: '',
    nome: '',
    pais: '',
  });
  const [selectedArtistaId, setSelectedArtistaId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  async function fetchArtista() {
    const response = await fetch(`http://localhost:8080/artista`);
    const data = await response.json();
    return data;
  }

  async function createArtista(authorData) {
    try {
      const response = await fetch('http://localhost:8080/artista', {
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

  async function deleteArtista(id) {
    try {
      const response = await fetch(`http://localhost:8080/artista/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete author');
      }

      // Author deleted successfully, fetch the updated list of authors
      const updatedArtista = await fetchArtista();
      setArtistaData(updatedArtista);
    } catch (error) {
      console.error(error);
      // Handle the error here, show an error message, or perform any necessary actions
    }
  }

  async function updateArtista(id, updatedData) {
    try {
      const response = await fetch(`http://localhost:8080/artista/${id}`, {
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
      const updatedArtista = await fetchArtista();
      setArtistaData(updatedArtista);
      setSelectedArtistaId(null);
      setIsUpdating(false);
    } catch (error) {
      console.error(error);
      // Handle the error here, show an error message, or perform any necessary actions
    }
  }

  useEffect(() => {
    fetchArtista().then((data) => {
      setArtistaData(data);
      console.log(data);
    });
  }, []);

  const handleEditClick = (id) => {
    setSelectedArtistaId(id);
    setIsUpdating(true);
  };

  return (
    <div>
      <h2>Página de Artista</h2>
      {artistaData.length === 0 ? (
        <div>
          <p>Carregando os dados...</p>
        </div>
      ) : (
        <div className="table-container">
          <h3>Os dados foram carregados com sucesso!</h3>
          <button className="create-button-artista" onClick={() => setIsCreating(true)}>
            Create Artista
          </button>
          {isCreating && (
            <div>
              <h3>Create New Artista</h3>
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
                <button type="submit" className="artistaButton">
                  Create
                </button>
                <button onClick={() => setIsCreating(false)} className="artistaButton">
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
                <th>Pais</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {artistaData.map((artista) => (
                <tr key={artista.id}>
                  <td>{artista.id}</td>
                  <td>{artista.nome}</td>
                  <td>{artista.pais}</td>
                  <td>
                    <button onClick={() => handleEditClick(artista.id)} className='artistaButton'>Edit</button>
                    <button onClick={() => deleteArtista(artista.id)} className='artistaButton'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isUpdating && selectedArtistaId && (
  <div>
    <h3>Update Artista</h3>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const updatedData = {
          nome: document.getElementById('updated-nome').value,
          pais: document.getElementById('updated-pais').value,
        };
        updateArtista(selectedArtistaId, updatedData);
      }}
    >
      <label>
        Nome:
        <input type="text" id="updated-nome" defaultValue={newArtistaData.nome} />
      </label>
      <label>
        Pais:
        <input
          type="text"
          id="updated-pais"
          defaultValue={newArtistaData.pais}
        />
      </label>
      <button type="submit" className="artistaButton">
        Update
      </button>
      <button onClick={() => setIsUpdating(false)} className="artistaButton">
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

const ArtistaId = ({ id }) => {
  const [artistaData, setArtistaData] = useState([]);

  useEffect(() => {
    const fetchArtista = async () => {
      const response = await fetch(`http://localhost:8080/artista/${id}`);
      const data = await response.json();
      setArtistaData(data);
      console.log(data);
    };

    fetchArtista();
  }, [id]);

  return (
    <div>
      {artistaData.length === 0 ? (
        <div>
          <p>..</p>
        </div>
      ) : (
        <div>
          <div key={artistaData.id}>
          <p>{artistaData.nome} {artistaData.pais}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export { Artista, ArtistaId };
