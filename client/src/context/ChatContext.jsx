import { createContext, useState, useEffect, useCallback } from "react";
import { getRequest, baseUrl, postRequest } from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);

  useEffect(() => {
    
    // Fetches users from the server and filters out users who already have a chat created with the current user.
 
    const getUsers= async()=>{
      const response = await getRequest(`${baseUrl}/users`);
      if (response.error) {
        return console.log("Error fetching users",response.message);
      } 

      const pChats=response.filter((u)=>{
        let isChatCreated=false;

        if(user?._id===u._id){
          return false;
        }
        if(userChats){
          isChatCreated=userChats?.some((chat)=>{
            return chat.members[0]===u._id || chat.members[1]===u._id;
      });
    }
    return !isChatCreated;
  });
  setPotentialChats(pChats);
    }
    getUsers();
  },[userChats]);

  useEffect(() => {
    // Fetches chats for the current user from the server.
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);

        const response = await getRequest(`${baseUrl}/chats/${user?._id}`);
        setIsUserChatsLoading(false);
        if (response.error) {
          setUserChatsError(response.message);
        } else {
          setUserChats(response);
        }
      }
    };

    getUserChats();
  }, [user]);

  const createChat=useCallback(async (firstId,secondId)=>{
    const response=await postRequest(
      `${baseUrl}/chats`,
      JSON.stringify({
        firstId,
        secondId,
    })
  );
  if(response.error){
    console.log("Error creating chat",response.message);
  }

  setUserChats((prev)=> [...prev,response]);
  },[]);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
