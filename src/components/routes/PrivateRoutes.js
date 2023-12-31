import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../api/context/AuthProvider";
import { useContext } from "react";

const PrivateRoutes = ({ children }) => {
  const { user } = useContext(AuthContext);
  let auth = false;
  if(user){
    auth = true;
  }
  
  // If auth --> children; if !auth --> navigate to login
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
