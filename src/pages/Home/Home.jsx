import React, { useEffect, useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import timeGridPlugin from '@fullcalendar/timegrid';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API_KEY = process.env.REACT_APP_API_KEY;
const DISCOVERY_DOC = process.env.REACT_APP_DISCOVERY_DOC;

export default function Home() {
  const [authStatus, setAuthStatus] = useState(false);
  const [events, setEvents] = useState([]);

  const setting = {
    plugins: [
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
      interactionPlugin,
      googleCalendarPlugin,
    ],
    events: events,
    //Main Key
    googleCalendarApiKey: 'AIzaSyAdgT4JxHeZe_Wf7LeCannvfE4HngQNFJI',

    // eventClick: handleDateClick,
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: '',
      // right: "dayGridMonth,listYear"
    },
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: 'short',
    },
    // eventContent: renderEventContent,
  };

  const getLatestEvents = async () => {
    const request = {
      calendarId: 'primary',
      timeMin: new Date('2023-01-01T00:00:00.000Z').toISOString(),
      showDeleted: false,
      singleEvents: true,
      orderBy: 'startTime',
    };

    const response = await gapi.client?.calendar?.events.list(request);

    const items = response.result.items;

    const filteredItems = items.map((item) => ({
      title: item.summary,
      start: item.start.dateTime,
    }));

    setEvents(filteredItems);
  };

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

  const onSuccess = (res) => {
    console.log('success:', res);
    setAuthStatus(true);
    getLatestEvents();
  };
  const onFailure = (err) => {
    console.log('failed:', err);
  };

  const onSuccessLogout = (res) => {
    console.log('logout', res);
    setEvents([]);
    setAuthStatus(false);
  };

  const onFailureLogout = (res) => {
    console.log('logout failure', res);
  };

  console.log({ events });

  return (
    <div className='App'>
      {/* auth functionalities */}
      {authStatus ? (
        <GoogleLogout
          clientId={CLIENT_ID}
          buttonText='Logout'
          onLogoutSuccess={onSuccessLogout}
          onFailure={onFailureLogout}
        />
      ) : (
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText='Sign in with Google'
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      )}

      {/* Refresh button */}
      <button onClick={getLatestEvents}>Events</button>

      {/* Calendar */}

      {events.length > 0 && <FullCalendar {...setting} />}
    </div>
  );
}
