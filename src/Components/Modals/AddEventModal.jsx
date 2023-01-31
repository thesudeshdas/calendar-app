import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Input,
  Textarea,
  useDisclosure,
  Stack,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function AddEventModal({ handleAddEvent }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [eventDetails, setEventDetails] = useState();

  const handleChange = (event) => {
    setEventDetails((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleClose = () => {
    setEventDetails({});
    onClose();
  };

  const handleAdd = () => {
    const event = {
      summary: eventDetails?.title,
      description: eventDetails?.description,
      start: {
        dateTime: new Date(eventDetails?.start),
        timeZone: 'Asia/Kolkata',
      },
      end: {
        dateTime: new Date(eventDetails?.end),
        timeZone: 'Asia/Kolkata',
      },
    };

    handleAddEvent(event);
    handleClose();
  };

  return (
    <>
      <Button onClick={onOpen}>Add Event</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Input
              type='text'
              name='title'
              onChange={handleChange}
              placeholder='Add Event Title'
              value={eventDetails?.title}
              w='70%'
            />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack gap={2}>
              <Textarea
                type='text'
                name='description'
                onChange={handleChange}
                placeholder='Add Event Description'
                value={eventDetails?.description}
              />

              <Text>
                Start time:{' '}
                <Input
                  onChange={handleChange}
                  name='start'
                  placeholder='Select Start Date and Time'
                  size='md'
                  type='datetime-local'
                  w='50%'
                />
              </Text>

              <Text>
                End time:{' '}
                <Input
                  onChange={handleChange}
                  name='end'
                  placeholder='Select End Date and Time'
                  size='md'
                  type='datetime-local'
                  w='50%'
                />
              </Text>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='blue'
              variant='outline'
              mr={3}
              onClick={handleClose}
            >
              Close
            </Button>
            <Button colorScheme='blue' onClick={handleAdd}>
              Add Event
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
