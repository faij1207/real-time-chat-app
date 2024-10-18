import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { Container,Stack } from "react-bootstrap";
import UserChat from "../component/chat/UserChat";
import PotentialChats from "../component/chat/PotentialChats";
import ChatBox from "../component/chat/ChatBox";

export default function Chat() {
  const user = useContext(AuthContext);
  const { userChats, isUserChatsLoading, userChatsError,updateCurrentChat } =
    useContext(ChatContext);
    

  return (
    <Container>
      <PotentialChats />
    {userChats?.length < 1 ? null :(
      <Stack direction="horizontal" gap={4} className="align-items-start">
        <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
          {isUserChatsLoading && <p>Loading chats...</p>}
          {userChats?.map((chat,index) => {
            return (
              <div key={index} onClick={()=>updateCurrentChat(chat)}>
                <UserChat chat={chat} user={user}/>
              </div>
            );
          })} 
        </Stack>
        <ChatBox />
      </Stack>
    )}
  </Container>
  );
}
