import { FiCheckCircle, FiClipboard, FiDatabase, FiCalendar } from 'react-icons/fi'

function About() {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">About YLIMS</h1>
        <p className="mb-8 text-xl font-light text-gray-600 dark:text-gray-300">
          Your Laboratory Information Management System (YLIMS) is designed to streamline your lab operations
          and help you manage samples efficiently.
        </p>
      </div>

      <div className="mb-12 grid gap-8 md:grid-cols-2">
        <div className="card">
          <div className="card-body">
            <div className="mb-4 flex items-center">
              <FiCheckCircle className="mr-3 text-primary-600" size={24} />
              <h2 className="text-xl font-bold">Our Mission</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              We're committed to providing laboratories with powerful, intuitive tools that simplify
              sample management, enhance data integrity, and improve overall efficiency.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="mb-4 flex items-center">
              <FiClipboard className="mr-3 text-primary-600" size={24} />
              <h2 className="text-xl font-bold">Key Features</h2>
            </div>
            <ul className="ml-2 space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start">
                <span className="mr-2 text-primary-600">•</span>
                Comprehensive sample tracking and management
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary-600">•</span>
                Intuitive search and filtering capabilities
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary-600">•</span>
                Status-based workflow organization
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-primary-600">•</span>
                Detailed sample information storage
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Why Choose YLIMS?</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="card transform transition-transform hover:-translate-y-1">
            <div className="card-body">
              <div className="mb-4 rounded-full bg-primary-100 p-3 text-primary-600 dark:bg-primary-900 dark:text-primary-400">
                <FiDatabase size={24} />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Data Integrity</h3>
              <p className="text-gray-600 dark:text-gray-300">
                YLIMS ensures your sample data remains accurate, consistent, and protected.
              </p>
            </div>
          </div>
          
          <div className="card transform transition-transform hover:-translate-y-1">
            <div className="card-body">
              <div className="mb-4 rounded-full bg-primary-100 p-3 text-primary-600 dark:bg-primary-900 dark:text-primary-400">
                <FiCalendar size={24} />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Efficiency</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Streamlined workflows and intuitive interfaces save time and reduce errors.
              </p>
            </div>
          </div>
          
          <div className="card transform transition-transform hover:-translate-y-1">
            <div className="card-body">
              <div className="mb-4 rounded-full bg-primary-100 p-3 text-primary-600 dark:bg-primary-900 dark:text-primary-400">
                <FiCheckCircle size={24} />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Reliability</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Built with modern technology to ensure stability and consistent performance.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-700 p-8 text-white shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Ready to Transform Your Lab Management?</h2>
        <p className="mb-6">
          YLIMS is designed to help laboratories of all sizes improve their sample management processes. 
      
        </p>
        <button className="rounded-md bg-white px-6 py-2 font-medium text-indigo-700 transition-colors hover:bg-indigo-50">
          Learn More
        </button>
      </div>
    </div>
  )
}

export default About