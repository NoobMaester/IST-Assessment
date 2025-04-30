import { createContext } from 'react'

export interface AuthContextType {
  user: string | null
  token: string | null
  isAuthenticated: boolean
  login: (token: string, user: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)