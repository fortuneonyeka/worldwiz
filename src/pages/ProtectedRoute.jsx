import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }
  },[isAuthenticated,navigate])
  return isAuthenticated ? children : null 
}

export default ProtectedRoute
