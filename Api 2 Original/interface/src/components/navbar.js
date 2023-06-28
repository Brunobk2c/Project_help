import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import './navbar.css'
import GitHubLogin from 'react-github-login';
import React, { useState } from 'react';






// eslint-disable-next-line
const NavBar = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const handleGithubLoginSuccess = (response) => {
    console.log('Authentication successful', response);
    setAuthenticated(true);
  };

  const handleGithubLoginFailure = (response) => {
    console.error('Authentication error', response);
    // Handle error gracefully
  };

  return (
    <div>
      <AppBar position="realative">
        <Toolbar className='toolbar'>
          <div style={{ flexGrow: 1 }}></div> {/* Espaço em branco flexível */}
          
              <Link to="/artista" className="button">Artista</Link>
              <Link to="/musicas" className="button">Musicas</Link>
              <Link to="/album" className="button">Album</Link>
              {authenticated ? (
          <button className='btGit'>Access Authenticated Content</button>
        ) : (
          <GitHubLogin
            clientId="6b4ab6b2ad9793cf32e9"
            redirectUri="http://localhost:3000/auth/github/callback"
            onSuccess={handleGithubLoginSuccess}
            onFailure={handleGithubLoginFailure}
          />
        )}
        </Toolbar>
        
      </AppBar>
    </div>
  );
};

export default NavBar;