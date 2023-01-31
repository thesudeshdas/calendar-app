import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import timeGridPlugin from '@fullcalendar/timegrid';

const CLIENT_ID =
  '986741280832-e719osmsgs3ck3csktejng81onkdvdd0.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAdgT4JxHeZe_Wf7LeCannvfE4HngQNFJI';

const DISCOVERY_DOC =
  'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

function App() {
  const [suc, setSuc] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [modalTitle, setModalTitle] = useState();
  // const [events, setEvents] = useState([
  //   {
  //     title: 'event1',
  //     start: '2023-01-31',
  //   },
  //   {
  //     title: 'event2',
  //     start: '2023-01-31',
  //     end: '2023-01-31',
  //   },
  //   {
  //     title: 'event3',
  //     start: '2023-01-31T12:30:00',
  //   },
  // ]);

  const [events, setEvents] = useState([
    {
      created: '2022-12-06T07:49:39.000Z',
      creator: { email: 'sudeshkumardas7@gmail.com', self: true },
      end: { dateTime: '2023-01-31T21:30:00+05:30', timeZone: 'Asia/Kolkata' },
      etag: '"3340625958848000"',
      eventType: 'default',
      htmlLink:
        'https://www.google.com/calendar/event?eid=NXMxc2QxOWo1aGsxcnU0amI2ajNtaGFxcDJfMjAyMzAxMzFUMTIzMDAwWiBzdWRlc2hrdW1hcmRhczdAbQ',
      iCalUID: '5s1sd19j5hk1ru4jb6j3mhaqp2@google.com',
      id: '5s1sd19j5hk1ru4jb6j3mhaqp2_20230131T123000Z',
      kind: 'calendar#event',
      organizer: { email: 'sudeshkumardas7@gmail.com', self: true },
      originalStartTime: {
        dateTime: '2023-01-31T18:00:00+05:30',
        timeZone: 'Asia/Kolkata',
      },
      recurringEventId: '5s1sd19j5hk1ru4jb6j3mhaqp2',
      reminders: { useDefault: true },
      sequence: 0,
      start: {
        dateTime: '2023-01-31T18:00:00+05:30',
        timeZone: 'Asia/Kolkata',
      },
      status: 'confirmed',
      summary: 'Gym Time',
      updated: '2022-12-06T07:49:39.424Z',
    },
  ]);

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <div className={'fcContent'}>
          <div className={'eventTitle'}>{eventInfo.event.title}</div>
          <div className={'eventTime'}>{eventInfo.timeText} EST</div>
        </div>
      </>
    );
  };
  const handleDateClick = (arg) => {
    arg.jsEvent.preventDefault();
    setIsOpen(true);
    setModalTitle(arg.event.title);
    setModalContent(arg.event.extendedProps.description);
  };

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

    // eventSources: [
    //   {
    //     googleCalendarId: 'sudeshkumardas7@gmail.com',
    //     className: 'calEvents',
    //   },
    // ],
    eventClick: handleDateClick,
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
    eventContent: renderEventContent,
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

  useEffect(() => {
    if (suc) {
      (async () => {
        const request = {
          calendarId: 'primary',
          timeMin: new Date('2023-01-01T00:00:00.000Z').toISOString(),
          showDeleted: false,
          singleEvents: true,
          orderBy: 'startTime',
        };

        let response = await gapi.client?.calendar?.events.list(request);

        console.log({ response });

        const items = response.result.items;

        const filteredItems = items.map((item) => ({
          title: item.summary,
          start: item.start.dateTime,
        }));

        setEvents(filteredItems);
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

  console.log({ events });

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

      <FullCalendar {...setting} />

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
