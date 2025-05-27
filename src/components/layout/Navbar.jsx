import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiMenu, FiX, FiSun, FiMoon, FiPlus } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { darkMode, toggleDarkMode } = useTheme()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    if (isOpen) setIsOpen(false)
  }

  const activeClass = "text-white font-medium border-b-2 border-white"
  const inactiveClass = "text-indigo-100 hover:text-white"

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 to-indigo-700 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex flex-shrink-0 items-center">
            <Link 
              to="/" 
              className="text-xl font-bold text-white"
              onClick={closeMenu}
            >
              Laboratory Management System
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? activeClass : inactiveClass}
                end
              >
                Dashboard
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => isActive ? activeClass : inactiveClass}
              >
                About
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => isActive ? activeClass : inactiveClass}
              >
                Contact
              </NavLink>
              <NavLink 
                to="/support" 
                className={({ isActive }) => isActive ? activeClass : inactiveClass}
              >
                Support
              </NavLink>
            </div>
          </div>

       
          <div className="flex items-center">
            {/* New Sample Button (Desktop) */}
            <Link 
              to="/?action=new" 
              className="mr-4 hidden items-center rounded-md bg-white px-3 py-1.5 text-sm font-medium text-indigo-700 shadow-sm hover:bg-indigo-50 md:flex"
            >
              <FiPlus className="mr-1" /> New Sample
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="rounded-md p-2 text-indigo-100 hover:bg-indigo-600 hover:text-white"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {/* Mobile Menu Button */}
            <div className="ml-2 flex md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center rounded-md p-2 text-indigo-100 hover:bg-indigo-600 hover:text-white"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="space-y-1 px-2 pb-3 pt-2">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `block rounded-md px-3 py-2 text-base font-medium ${
                isActive 
                  ? 'bg-indigo-800 text-white' 
                  : 'text-indigo-100 hover:bg-indigo-600 hover:text-white'
              }`
            }
            onClick={closeMenu}
            end
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `block rounded-md px-3 py-2 text-base font-medium ${
                isActive 
                  ? 'bg-indigo-800 text-white' 
                  : 'text-indigo-100 hover:bg-indigo-600 hover:text-white'
              }`
            }
            onClick={closeMenu}
          >
            About
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `block rounded-md px-3 py-2 text-base font-medium ${
                isActive 
                  ? 'bg-indigo-800 text-white' 
                  : 'text-indigo-100 hover:bg-indigo-600 hover:text-white'
              }`
            }
            onClick={closeMenu}
          >
            Contact
          </NavLink>
          <NavLink 
            to="/support" 
            className={({ isActive }) => 
              `block rounded-md px-3 py-2 text-base font-medium ${
                isActive 
                  ? 'bg-indigo-800 text-white' 
                  : 'text-indigo-100 hover:bg-indigo-600 hover:text-white'
              }`
            }
            onClick={closeMenu}
          >
            Support
          </NavLink>
          
          {/* New Sample Button (Mobile) */}
          <Link 
            to="/?action=new" 
            className="mt-3 flex items-center rounded-md bg-white px-3 py-2 text-base font-medium text-indigo-700"
            onClick={closeMenu}
          >
            <FiPlus className="mr-2" /> New Sample
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar