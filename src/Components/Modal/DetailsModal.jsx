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
} from '@chakra-ui/react';

export default function DetailsModal({
  isOpen,
  onOpen,
  onClose,
  eventDetails,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{eventDetails?.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{eventDetails?.description}</Text>

          <Text>Start time: {eventDetails?.start}</Text>
          <Text>End time: {eventDetails?.end}</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant='ghost'>Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
