import { createContext, useState, useEffect, useCallback } from "react";
import { getRequest, baseUrl, postRequest } from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const[isMessagesLoading,setIsMessagesLoading]=useState(false);
  const[messagesError,setMessagesError]=useState(null);
 
  console.log("messages",messages);


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

  useEffect(() => {
  // Fetches messages for the current chat from the server.
    const getMessages = async () => {
        setIsMessagesLoading(true);
        setMessagesError(null);

        const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);
        setIsMessagesLoading(false);
        if (response.error) {
           setMessagesError(response.message);
        } 
          setMessages(response);
      };
    getMessages();
  }, [currentChat]);

// Updates the current chat state with the selected chat.
const updateCurrentChat = useCallback((chat) => {
  setCurrentChat(chat);
}, []);

// Creates a new chat between two users and updates the userChats state.
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
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
