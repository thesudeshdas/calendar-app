import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import timeGridPlugin from '@fullcalendar/timegrid';

const API_KEY = process.env.REACT_APP_API_KEY;

export default function Calendar({ events, setIsOpen, setEventDetails }) {
  const handleEventClick = (arg) => {
    arg.jsEvent.preventDefault();
    setIsOpen(true);

    setEventDetails({
      id: arg.event.id,
      title: arg.event.title,
      description: arg.event.extendedProps.description,
      start: new Date(arg.event.start).toLocaleString(),
      end: new Date(arg.event.end).toLocaleString(),
    });

    // setModalTitle(arg.event.title);
    // setModalContent(arg.event.extendedProps.description);

    // console.log('handle event', arg.event.id);
  };

  const renderEventContent = (eventInfo) => {
    console.log({ eventInfo });

    return (
      <>
        <div>
          <div>{eventInfo.event.title}</div>
          <div>{eventInfo.timeText} EST</div>
        </div>
      </>
    );
  };

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
    eventClick: handleEventClick,
    // eventContent: renderEventContent,
  };

  return <FullCalendar {...setting} />;
}
