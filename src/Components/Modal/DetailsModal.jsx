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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function DetailsModal({ isOpen, onOpen, onClose, event }) {
  const [eventDetails, setEventDetails] = useState(event);

  const handleEdit = () => {
    console.log({ eventDetails });
  };

  const handleChange = (event) => {
    setEventDetails((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
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
          <Textarea
            type='text'
            name='description'
            onChange={handleChange}
            placeholder={eventDetails?.description}
            value={eventDetails?.description}
          />

          <Text>Start time: {eventDetails?.start}</Text>
          <Text>End time: {eventDetails?.end}</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme='blue' onClick={handleEdit}>
            Edit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
