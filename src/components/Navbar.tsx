import { Link } from 'react-router-dom'
import { CalendarRange } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className="bg-[#192733] shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
        <Link className='text-white hover:text-[#ff5c35] cursor-pointer' to="/">
        <CalendarRange/></Link>
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-[#ff5c35] transition-colors">
              Login
            </Link>
            <Link to="/register" className="text-white hover:text-[#ff5c35] transition-colors">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
