 import { useEffect ,useState } from "react";
 import { baseUrl, getRequest } from "../utils/services";

export const useFetchRecipientUser = ({chat , user}) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const[error , setError] = useState(null);

    const recipientId = chat?.members?.find((id) => id  !== user?._id);
 
    useEffect(() => {

      const getUser = async () => {
        if (!recipientId) return null;
        const resoponse= await getRequest(`${baseUrl}/users/find/${recipientId}`);
        if(resoponse.error){
          setError(resoponse.error);
        }
        setRecipientUser(resoponse);
        };
        getUser();
    }, [chat, user]);
     return { recipientUser, error };   
}
