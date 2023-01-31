import React, { useEffect, useState } from 'react';

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

export default function Calendar() {
  const [suc, setSuc] = useState(localStorage.getItem('signedIn'));
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [modalTitle, setModalTitle] = useState();

  const [events, setEvents] = useState([]);

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

  const getLatestEvents = async () => {
    console.log('is it trying?');

    const request = {
      calendarId: 'primary',
      timeMin: new Date('2023-01-01T00:00:00.000Z').toISOString(),
      showDeleted: false,
      singleEvents: true,
      orderBy: 'startTime',
    };

    const response = await gapi.client?.calendar?.events.list(request);

    console.log({ response });

    const items = response.result.items;

    const filteredItems = items.map((item) => ({
      title: item.summary,
      start: item.start.dateTime,
    }));

    setEvents(filteredItems);
  };

  console.log({ events, suc });

  return (
    <>
      <button onClick={getLatestEvents}>Events</button>
      <FullCalendar {...setting} />
    </>
  );
}
