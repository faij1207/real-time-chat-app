import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

export default function Chat() {
  const { userChats, isUserChatsLoading, userChatsError } =
    useContext(ChatContext);

    console.log("userChats", userChats);
    

  return <div>chat</div>;
}
