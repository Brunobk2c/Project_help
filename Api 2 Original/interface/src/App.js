import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import { Musicas } from './components/musicas';
import { Artista } from './components/artista';

function App() {
  return (
    <Router>
      <div className='App'>
        <NavBar/>
        <Routes>
          <Route path='/artista' element={<Artista />}  />
          <Route path='/musicas' element={<Musicas />}  />
        </Routes>

      </div>
    </Router>
    
  );
}

export default App;
