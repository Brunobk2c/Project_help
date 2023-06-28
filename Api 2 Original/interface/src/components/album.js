import React, { useEffect, useState } from 'react';
import './album.css';
import { Link } from 'react-router-dom';


const Album = () => {
  const [albumData, setAlbumData] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newAlbumData, setNewAlbumData] = useState({
    id: '',
    nome: '',
    artistaId: ''
  });
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  async function fetchAlbum() {
    const response = await fetch(`http://localhost:8080/album`);
    const data = await response.json();
    return data;
  }

  async function createAlbum(albumData) {
    try {
      const response = await fetch('http://localhost:8080/album', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(albumData),
      });

      if (!response.ok) {
        throw new Error('Failed to create album');
      }

      // Author created successfully, fetch the updated list of authors
      const updatedAlbum = await fetchAlbum();
      setAlbumData(updatedAlbum);
      setIsCreating(false);
      setNewAlbumData({
        id: '',
        nome: '',
        artistaId: ''

      });
    } catch (error) {
      console.error(error);
      // Handle the error here, show an error message, or perform any necessary actions
    }
  }

  async function deleteAlbum(id) {
    try {
      const response = await fetch(`http://localhost:8080/album/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete author');
      }

      // Author deleted successfully, fetch the updated list of authors
      const updatedAlbum = await fetchAlbum();
      setAlbumData(updatedAlbum);
    } catch (error) {
      console.error(error);
      // Handle the error here, show an error message, or perform any necessary actions
    }
  }

  async function updateAlbum(id, updatedData) {
    try {
      const response = await fetch(`http://localhost:8080/album/${id}`, {
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
      const updatedAlbum = await fetchAlbum();
      setAlbumData(updatedAlbum);
      setSelectedAlbumId(null);
      setIsUpdating(false);
    } catch (error) {
      console.error(error);
      // Handle the error here, show an error message, or perform any necessary actions
    }
  }

  useEffect(() => {
    fetchAlbum().then((data) => {
      setAlbumData(data);
      console.log(data);
    });
  }, []);

  const handleEditClick = (id) => {
    setSelectedAlbumId(id);
    setIsUpdating(true);
  };

  return (
    <div>
      <h2>Página de Album</h2>
      {albumData.length === 0 ? (
        <div>
          <p>Carregando os dados...</p>
        </div>
      ) : (
        <div className="table-container">
          <h3>Os dados foram carregados com sucesso!</h3>
          <Link to="/album-form">
             <button className="create-button-artista">Create Album</button>
          </Link>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>ArtistaId</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {albumData.map((album) => (
                <tr key={album.id}>
                  <td>{album.id}</td>
                  <td>{album.nome}</td>
                  <td>{album.artistaId}</td>

                  <td>
                    <button onClick={() => handleEditClick(album.id)} className='albumButton'>Edit</button>
                    <button onClick={() => deleteAlbum(album.id)} className='albumButtonD'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isUpdating && selectedAlbumId && (
  <div>
    <h3>Update Album</h3>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const updatedData = {
          nome: document.getElementById('updated-nome').value,
          artistaId: document.getElementById('updated-artistaId').value
        };
        updateAlbum(selectedAlbumId, updatedData);
      }}
    >
      <label>
        Nome:
        <input type="text" id="updated-nome" defaultValue={newAlbumData.nome} />
      </label>
      <label>
        ArtistaId:
        <input
          type="text"
          id="updated-artistaId"
          defaultValue={newAlbumData.artistaId}
        />
      </label>
      <button type="submit" className="albumButton">
        Update
      </button>
      <button onClick={() => setIsUpdating(false)} className="albumButtonCa">
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

const AlbumId = ({ id }) => {
  const [albumData, setAlbumData] = useState([]);

  useEffect(() => {
    const fetchAlbum = async () => {
      const response = await fetch(`http://localhost:8080/album/${id}`);
      const data = await response.json();
      setAlbumData(data);
      console.log(data);
    };

    fetchAlbum();
  }, [id]);

  return (
    <div>
      {albumData.length === 0 ? (
        <div>
          <p>..</p>
        </div>
      ) : (
        <div>
          <div key={albumData.id}>
          <p>{albumData.nome} {albumData.artistaId} </p>
          </div>
        </div>
      )}
    </div>
  );
}

export { Album, AlbumId };
