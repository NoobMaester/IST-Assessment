import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import LeaveTable from '../components/LeaveTable'
import { LeaveRequest } from '../components/types'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const { token } = useAuth()
  const [leaves, setLeaves] = useState<LeaveRequest[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

    const fetchLeaves = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/leaves', {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) {
          throw new Error('Failed to fetch leaves')
        }
        const data = await res.json()
        setLeaves(data)
      } catch (error) {
        console.error('Failed to fetch leaves:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaves()
  }, [token, navigate])

  if (!token) return null

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold text-indigo-600 mb-4">Admin Dashboard</h1>
      {loading ? (
        <p className="text-gray-600">Loading leave requests...</p>
      ) : (
        <LeaveTable leaves={leaves} setLeaves={setLeaves} token={token} role="admin" />
      )}
    </div>
  )
}
