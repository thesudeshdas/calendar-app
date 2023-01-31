import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import timeGridPlugin from '@fullcalendar/timegrid';

// import CalendarModal from '../Modal/Modal';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [modalTitle, setModalTitle] = useState();
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
    //Main Key
    googleCalendarApiKey: 'AIzaSyAdgT4JxHeZe_Wf7LeCannvfE4HngQNFJI',

    eventSources: [
      {
        googleCalendarId: 'sudeshkumardas7@gmail.com',
        className: 'calEvents',
      },
    ],
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

  return (
    <div className='App'>
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
