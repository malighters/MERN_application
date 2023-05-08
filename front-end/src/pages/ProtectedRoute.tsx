import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/appContext";

const ProtectedRoute = ({ children }: {children: JSX.Element}) => {
  const { user } = useContext(AppContext);
  if (!user) {
    return <Navigate to='/landing' />
  }
  return children
}

export default ProtectedRoute;