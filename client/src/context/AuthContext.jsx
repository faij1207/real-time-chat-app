import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("User"));
    if (user) {
      setUser(user);
    }
  }, []);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const registerUser = useCallback(async (e) => {
    e.preventDefault(); 
    setLoading(true);
    setRegisterError(null);
    try {
      const response = await postRequest(
        `${baseUrl}/users/register`,
        JSON.stringify(registerInfo)
      );
      if (response.error) {
        setRegisterError(response.message);
      }
      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    } catch (error) {
      setRegisterError(error.message);
    }
    setLoading(false);
  }, [registerInfo]);

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  const loginUser=useCallback(async(e)=>{
    e.preventDefault ();
    setLoading(true);
    setLoginError(null);
    try {
      const response = await postRequest(
        `${baseUrl}/users/login`,
        JSON.stringify(loginInfo)
      );
      if (response.error) {
        setLoginError(response.message);
      } else {
        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
      }
    } catch (error) {
      setLoginError(error.message);
    }
    setLoading(false);
  },[loginInfo]);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        loading,
        logoutUser,
        loginInfo,
        updateLoginInfo,
        loginUser,
        loginError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
