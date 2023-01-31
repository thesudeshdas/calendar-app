import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

const CLIENT_ID =
  '986741280832-e719osmsgs3ck3csktejng81onkdvdd0.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAdgT4JxHeZe_Wf7LeCannvfE4HngQNFJI';

const DISCOVERY_DOC =
  'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

function App() {
  const [suc, setSuc] = useState(false);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope:
          'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar',
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      });
    };
    gapi.load('client:auth2', initClient);
  });

  useEffect(() => {
    if (suc) {
      (async () => {
        const request = {
          calendarId: 'primary',
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 10,
          orderBy: 'startTime',
        };

        let response = await gapi.client?.calendar?.events.list(request);

        console.log({ response });
      })();
    }
  }, [suc]);

  const onSuccess = (res) => {
    console.log('success:', res);

    setSuc(true);
  };
  const onFailure = (err) => {
    console.log('failed:', err);
  };

  return (
    <div className='App'>
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText='Sign in with Google'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />

      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
