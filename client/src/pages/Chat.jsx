import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { Container,Stack } from "react-bootstrap";
import UserChat from "../component/chat/UserChat";

export default function Chat() {
  const user = useContext(AuthContext);
  const { userChats, isUserChatsLoading, userChatsError } =
    useContext(ChatContext);
    

  return (
    <Container>
    {userChats?.length < 1 ? null :(
      <Stack direction="horizontal" gap={4} className="align-item-start">
        <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
          {isUserChatsLoading && <p>Loading chats...</p>}
          {userChats?.map((chat,index) => {
            return (
              <div key={index}>
                <UserChat chat={chat} user={user}/>
              </div>
            );
          })} 
        </Stack>
        <p>ChatBox</p>
      </Stack>
    )}
  </Container>
  );
}
