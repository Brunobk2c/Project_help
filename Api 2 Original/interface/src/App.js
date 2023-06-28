import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import { Musicas } from './components/musicas';
import { Artista } from './components/artista';
import { Album } from './components/album';
import { ArtistaForm } from './components/artistaForm';
import { ArtistaEdit } from './components/artistaEdit';
import { MusicasForm } from './components/musicasForm';
import { AlbumForm } from './components/albumForm';
import { Home } from './components/home';




function App ()  {

  return (
    <Router>
      <div className='App'>
        <NavBar  />
        <Routes>
          <Route path='/' element={ <Home/>} />
          <Route path='/artista' element={<Artista/>} />
          <Route path='/musicas' element={<Musicas />}  />
          <Route path='/album' element={<Album />}  />
          <Route path="/artista-form" element={ <ArtistaForm />} />
          <Route path="/artista-edit" element={ <ArtistaEdit />} />
          <Route path="/musicas-form" element={ <MusicasForm />} />
          <Route path="/album-form" element={ <AlbumForm />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
