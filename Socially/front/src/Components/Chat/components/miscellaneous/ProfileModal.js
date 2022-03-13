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
import { ChatState } from "../../Context/ChatProvider";
import { getIsBlocked } from "../../config/ChatLogics";
import { API } from "../../../../API";
import { useSelector } from "react-redux";

const ProfileModal = ({ users, children }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
    const { user } = useSelector((state)=>state.user);



  const blockUser = async () => {
    const block = await axios.put(`${API}/api/v1/${users?._id}`, {}, {
      headers: {
        Authorization: localStorage.getItem("token"),
      }
    });

    if (block.status === 201) {
      window.location.reload();
      console.log("Blocked OP xD");
    }
  }

  const unBlockUser = async () => {
    const block = await axios.put(`${API}/api/v1/unblockUser/${users?._id}`, {}, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });

    if (block.status === 201) {
      window.location.reload();
      console.log("Blocked OP XD");
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
              src={users.avatar.url}
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

            {
              users?._id !== user._id &&
              <div>
                {
                  selectedChat &&
                    getIsBlocked(user, selectedChat?.users) ? <Button onClick={unBlockUser}>
                    Unblock
                  </Button>
                    : <Button onClick={blockUser}>
                      Block
                    </Button>
                }
              </div>
            }

            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
