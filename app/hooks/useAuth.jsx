import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// This hook is used to access the authentication context
const useAuth = () => {
  const authContext = useContext(AuthContext);

  return authContext;
};

export default useAuth;
