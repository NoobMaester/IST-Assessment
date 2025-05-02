import { createContext } from 'react'

export interface AuthContextType {
  user: string | null
  role: string | null
  token: string | null
  isAuthenticated: boolean
  login: (token: string, user: string, role: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)