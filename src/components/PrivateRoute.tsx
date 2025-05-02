
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" />
}
