import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
} from "@chakra-ui/react";
import axios from 'axios';
import {API} from '../../API';
import { ChatState } from "../../Context/ChatProvider";

const ProfileModal = ({ users, children }) => {
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();


  const blockUser = async() => {
    const block = await axios.put(`${API}/api/user/${user._id}`,{},{
      headers:{
        Authorization: `${user.token}`
      }
    });

    if(block.status===201){
      console.log("Blocked OP xD");
    }
  }

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
            {users.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={users.pic}
              alt={users.name}
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Work sans"
            >
              Email: {users.email}
            </Text>
            
          </ModalBody>
          <ModalFooter>
            {/* {
              user._id !== users._id ?
          <Button onClick={blockUser}>
              Block
            </Button>
             : ""
            } */}
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
