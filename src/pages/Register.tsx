import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post('/auth/register', { name, email, password })
      navigate('/')
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Create Account</h2>
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-[#ff5c35]"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm  focus:border-[#ff5c35] focus:outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-[#ff5c35]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#ff5c35] cursor-pointer' text-white py-2 px-4 rounded-md hover:bg-[#192733] focus:outline-none transition-colors"
            >
              Register
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/" className="text-[#ff5c35] hover:underline font-bold">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
