import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import timeGridPlugin from '@fullcalendar/timegrid';

const API_KEY = process.env.REACT_APP_API_KEY;

export default function Calendar({ events }) {
  const setting = {
    plugins: [
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
      interactionPlugin,
      googleCalendarPlugin,
    ],
    height: '100%',
    events: events,
    googleCalendarApiKey: API_KEY,
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'today timeGridWeek dayGridMonth',
    },
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: 'short',
    },
    eventColor: '#EB0181',
  };

  return <FullCalendar {...setting} />;
}
