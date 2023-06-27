import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import './navbar.css'
import GitHubAuthButton from './GitHubAuthButton';





// eslint-disable-next-line
const NavBar = () => {
  return (
    <div>
      <AppBar position="realative">
        <Toolbar>
          <div style={{ flexGrow: 1 }}></div> {/* Espaço em branco flexível */}
              <Link to="/artista" className="button">Artista</Link>
              <Link to="/musicas" className="button">Musicas</Link>
              <GitHubAuthButton className='button'>Login with GitHub</GitHubAuthButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;