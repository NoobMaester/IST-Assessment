import { useState, useEffect, ReactNode } from 'react'
import { AuthContext } from './AuthContext.types'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    const storedRole = localStorage.getItem('role')
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(storedUser)
    }
    if (storedRole) {
      setRole(storedRole)
    }
  }, [])

  const login = (token: string, user: string, role: string) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', user)
    localStorage.setItem('role', role)
    setToken(token)
    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
