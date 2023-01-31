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
  Stack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function DetailsModal({
  isOpen,
  onClose,
  event,
  handleDeleteEvent,
}) {
  const [eventDetails, setEventDetails] = useState(event);

  const handleEdit = () => {
    console.log({ eventDetails });
  };

  const handleDelete = () => {
    handleDeleteEvent(eventDetails?.id);
    handleClose();
  };

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

  useEffect(() => {
    setEventDetails(event);
  }, [event]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Input
            type='text'
            name='title'
            onChange={handleChange}
            placeholder={eventDetails?.title}
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
              placeholder={eventDetails?.description}
              value={eventDetails?.description}
            />

            <Text>Start time: {eventDetails?.start}</Text>
            <Text>End time: {eventDetails?.end}</Text>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme='blue'
            variant='outline'
            mr={3}
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button colorScheme='blue' onClick={handleEdit}>
            Edit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
