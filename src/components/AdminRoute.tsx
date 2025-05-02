import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import React from 'react'

export const AdminRoute = ({ children }: { children: React.ReactElement }) => {
    const { isAuthenticated, role } = useAuth()
    if (!isAuthenticated) return <Navigate to="/login" />
    return role === 'admin' ? children : <Navigate to="/unauthorized" />
  }