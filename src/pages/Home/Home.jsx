import React, { useEffect, useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';

import { RepeatIcon } from '@chakra-ui/icons';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Calendar } from '../../Components';
import { Button, IconButton } from '@chakra-ui/button';
import { Spinner } from '@chakra-ui/spinner';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API_KEY = process.env.REACT_APP_API_KEY;
const DISCOVERY_DOC = process.env.REACT_APP_DISCOVERY_DOC;

export default function Home() {
  const [authStatus, setAuthStatus] = useState(false);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState();
  const [eventsLoading, setEventsLoading] = useState(false);

  const getLatestEvents = async () => {
    try {
      setEventsLoading(true);

      const request = {
        calendarId: 'primary',
        timeMin: new Date('2023-01-01T00:00:00.000Z').toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: 'startTime',
      };

      const response = await gapi.client?.calendar?.events.list(request);

      const filteredItems = response.result.items.map((item) => ({
        title: item.summary,
        start: item.start.dateTime,
      }));

      setEvents(filteredItems);
      setEventsLoading(false);
    } catch (error) {
      setError('Something went wrong, please logout and try again!');
    }
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

  console.log({ eventsLoading });

  return (
    <Box>
      <Text fontWeight='semibold' fontSize='xl' mb={4} textAlign='center'>
        {authStatus ? '' : 'Sign in using Google to see your Calendar'}
      </Text>

      {error && (
        <Text
          fontWeight='semibold'
          color='red'
          fontSize='xl'
          mb={4}
          textAlign='center'
        >
          Uh Oh! {error}
        </Text>
      )}

      <Flex justifyContent='center' gap={8} position='relative'>
        {authStatus ? (
          <GoogleLogout
            clientId={CLIENT_ID}
            buttonText='Logout'
            onLogoutSuccess={onSuccessLogout}
            onFailure={onFailureLogout}
            redirectUri='postmessage'
          />
        ) : (
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText='Sign in with Google'
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
            redirectUri='postmessage'
          />
        )}

        {authStatus && (
          <IconButton
            variant='ghost'
            title='Refresh events'
            icon={<RepeatIcon />}
            position='absolute'
            right='0'
          />
        )}
      </Flex>

      {/* Refresh button */}
      {/* <button onClick={getLatestEvents}>Events</button> */}

      {/* when events are laoding */}
      {eventsLoading && (
        <Flex justifyContent='center' mt={8} alignItems='center' gap={8}>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
          <Text fontWeight='semibold' fontSize='xl' textAlign='center'>
            Please wait while your calendar loads
          </Text>
        </Flex>
      )}

      {/* Calendar - show only if there are events*/}
      {events.length > 0 && (
        <Box mt={10} h='70vh' overflowY='hidden'>
          <Calendar events={events} />
        </Box>
      )}
    </Box>
  );
}
