import { useEffect, useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { RepeatIcon } from '@chakra-ui/icons';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { AddEventModal, Calendar, DetailsModal } from '../../Components';
import { IconButton } from '@chakra-ui/button';
import { Spinner } from '@chakra-ui/spinner';
import useDocumentTitle from '../../utils/useDocumentTitle';

import { useDisclosure } from '@chakra-ui/react';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API_KEY = process.env.REACT_APP_API_KEY;
const DISCOVERY_DOC = process.env.REACT_APP_DISCOVERY_DOC;

export default function Home() {
  useDocumentTitle('Calendar');

  const [authStatus, setAuthStatus] = useState(false);
  const [error, setError] = useState();
  const [eventsLoading, setEventsLoading] = useState(false);
  const [events, setEvents] = useState([]);

  const [eventDetails, setEventDetails] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const getLatestEvents = async () => {
    try {
      setEventsLoading(true);

      const request = {
        calendarId: 'primary',
        // timeMin: new Date('2023-01-01T00:00:00.000Z').toISOString(),
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: 'startTime',
      };

      const response = await gapi.client?.calendar?.events.list(request);

      const filteredItems = response.result.items.map((item) => ({
        id: item.id,
        title: item.summary,
        start: item.start.dateTime,
        end: item.end.dateTime,
        description: item.description,
      }));

      setEvents(filteredItems);
      setEventsLoading(false);
    } catch (error) {
      setError('Something went wrong, please logout, refresh and try again!');
    }
  };

  // inital fetch
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

  const handleAddEvent = async (event) => {
    try {
      const request = await gapi.client?.calendar?.events.insert({
        calendarId: 'primary',
        resource: event,
      });

      if (request.status === 200) {
        getLatestEvents();
      }
    } catch (error) {
      setError('Something went wrong while adding event, please try again!');
    }
  };

  const onSuccess = (res) => {
    setAuthStatus(true);
    getLatestEvents();
  };

  const onFailure = (err) => {};

  const onSuccessLogout = (res) => {
    setEvents([]);
    setAuthStatus(false);
  };

  const onFailureLogout = (res) => {
    setError('Logout Failed! Please try again');
  };

  return (
    <Box>
      {/* Instruction to sign in */}
      <Text fontWeight='semibold' fontSize='xl' mb={4} textAlign='center'>
        {authStatus ? '' : 'Sign in using Google to see your Calendar'}
      </Text>

      {/* Error message */}
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

      {/* CTAs for sign in, logout & getting latest events */}
      <Flex
        justifyContent={authStatus ? 'flex-end' : 'center'}
        gap={2}
        position='relative'
        alignItems='center'
      >
        <AddEventModal handleAddEvent={handleAddEvent} />

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
            // position='absolute'
            // right='0'
            onClick={getLatestEvents}
          />
        )}
      </Flex>

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
          <Calendar
            events={events}
            setIsOpen={onOpen}
            setEventDetails={setEventDetails}
          />
        </Box>
      )}

      <DetailsModal isOpen={isOpen} onClose={onClose} event={eventDetails} />
    </Box>
  );
}
