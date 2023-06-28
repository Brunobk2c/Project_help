import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './artistaForm.css'


const AlbumForm = () => {
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

    return (
        <div>
          <h2>Create New Artista</h2>
          <button className="create-button-album" onClick={() => setIsCreating(true)}>
            Create Album
          </button>
          {isCreating && (
            <div>
              <h3>Create New Album</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  createAlbum(newAlbumData);
                }}
              >
                <label>
                  Nome:
                  <input
                    type="text"
                    value={newAlbumData.nome}
                    onChange={(e) => setNewAlbumData({ ...newAlbumData, nome: e.target.value })}
                  />
                </label>
                <label>
                  ArtistaId:
                  <input
                    type="text"
                    value={newAlbumData.artistaId}
                    onChange={(e) =>
                      setNewAlbumData({ ...newAlbumData, artistaId: e.target.value })
                    }
                  />
                </label>
                <button type="submit" className="albumButtonCr">
                  Create
                </button>
                <button onClick={() => setIsCreating(false)} className="albumButtonCa">
                  Cancel
                </button>
              </form>
            </div>
          )}
          <Link to="/album">
            <button className="create-button-artistaForm">Ver Albums </button>
          </Link>
        </div>
      );
    };
    
export { AlbumForm };
    