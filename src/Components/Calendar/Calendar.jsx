import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box, Flex, Text } from '@chakra-ui/layout';

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

  return <FullCalendar {...setting} />;
}
