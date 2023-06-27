import React from 'react';
import GitHubLogin from 'react-github-login';

const GitHubAuthButton = () => {
    const onSuccess = (response) => {
        // Handle the authentication success
        console.log('Authentication successful!', response);
    };
    
    const onFailure = (response) => {
        // Handle the authentication failure
        console.log('Authentication failed!', response);
    };
    
    return (
        <GitHubLogin
            clientId="bafacc8bc2d0217a7841"
            redirectUri="http://localhost:3000/auth/github/callback"
            onSuccess={onSuccess}
            onFailure={onFailure}
    />
  );
};

export default GitHubAuthButton;
