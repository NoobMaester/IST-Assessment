import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <h1 className="font-bold text-xl text-white">Leave Management</h1>
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-blue-200 transition-colors">
              Login
            </Link>
            <Link to="/register" className="text-white hover:text-blue-200 transition-colors">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
