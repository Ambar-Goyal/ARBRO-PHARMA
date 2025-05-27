import { useState } from 'react'
import { FiChevronDown, FiChevronUp, FiSearch, FiLifeBuoy } from 'react-icons/fi'

function Support() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  
  const faqs = [
    {
      question: 'How do I add a new sample to the system?',
      answer: 'To add a new sample, click the "Add New Sample" button on the dashboard. Fill out the sample form with the required information such as Sample Name, Type, Collection Date, and Status. Click "Add Sample" to save the new sample to the system.'
    },
    {
      question: 'Can I change the status of a sample?',
      answer: 'Yes, there are two ways to update a sample status. You can either click directly on the status badge in the sample table to change it quickly, or you can click the edit button for the sample and change the status through the edit form.'
    },
    {
      question: 'How do I filter samples by status?',
      answer: 'On the dashboard, locate the filter dropdown labeled "Status" near the search bar. Click the dropdown and select the status you want to filter by (Pending, Processing, Completed, or All Statuses).'
    },
    {
      question: 'Can I search for specific samples?',
      answer: 'Yes, use the search bar at the top of the dashboard to search for samples by name or ID. Type your search term and the system will automatically filter the results to match your query.'
    },
    {
      question: 'How do I edit sample information?',
      answer: 'To edit a sample, find it in the table and click the edit icon (pencil) in the Actions column. This will open the edit form where you can update any information about the sample. Click "Update Sample" to save your changes.'
    },
    {
      question: 'What does each sample status mean?',
      answer: 'The system uses three status types: "Pending" means the sample has been registered but processing has not started, "Processing" means the sample is currently being analyzed, and "Completed" means all analysis for the sample has been finished.'
    },
    {
      question: 'How does sorting work in the sample table?',
      answer: 'You can sort the sample table by clicking on column headers that support sorting (Sample Name and Collected On). Clicking once sorts in ascending order, clicking again sorts in descending order.'
    },
    {
      question: 'Is there a dark mode available?',
      answer: 'Yes, you can toggle between light and dark mode by clicking the sun/moon icon in the navigation bar. Your preference will be saved for future visits.'
    }
  ]
  
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }
  
  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">Support Center</h1>
        <p className="mb-8 text-gray-600 dark:text-gray-300">
          Find answers to frequently asked questions about YLIMS. If you can't find what you're looking for,
          please contact our support team.
        </p>
        
        <div className="mx-auto mb-8 max-w-2xl">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FiSearch className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-gray-300 py-3 pl-10 pr-4 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>
      
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="rounded-lg bg-white shadow-md dark:bg-gray-800">
            <div className="border-b border-gray-200 p-6 dark:border-gray-700">
              <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            </div>
            
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredFAQs.length === 0 ? (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                  No results found for "{searchTerm}". Try a different search term.
                </div>
              ) : (
                filteredFAQs.map((faq, index) => (
                  <div key={index} className="px-6 py-4">
                    <button
                      className="flex w-full items-start justify-between text-left"
                      onClick={() => toggleFAQ(index)}
                    >
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {faq.question}
                      </h3>
                      {activeIndex === index ? (
                        <FiChevronUp className="ml-2 mt-1 flex-shrink-0 text-gray-500" />
                      ) : (
                        <FiChevronDown className="ml-2 mt-1 flex-shrink-0 text-gray-500" />
                      )}
                    </button>
                    
                    {activeIndex === index && (
                      <div className="mt-2 text-gray-600 dark:text-gray-300">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="rounded-lg bg-white shadow-md dark:bg-gray-800">
            <div className="border-b border-gray-200 p-6 dark:border-gray-700">
              <h2 className="text-xl font-bold">Need More Help?</h2>
            </div>
            
            <div className="p-6">
              <div className="mb-6 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-700 p-6 text-white">
                <div className="mb-4 flex items-center justify-center">
                  <FiLifeBuoy size={48} />
                </div>
                <h3 className="mb-2 text-center text-lg font-semibold">Contact Support</h3>
                <p className="mb-4 text-center text-sm">
                  Our support team is available to help you with any questions or issues.
                </p>
                <div className="flex justify-center">
                  <a 
                    href="/contact" 
                    className="inline-block rounded-md bg-white px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-50"
                  >
                    Get Support
                  </a>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">Resources</h3>
                
                <div className="rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
                  <h4 className="font-medium">User Manual</h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Download the complete user guide for YLIMS
                  </p>
                </div>
                
                <div className="rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
                  <h4 className="font-medium">Video Tutorials</h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Watch step-by-step guides for common tasks
                  </p>
                </div>
                
                <div className="rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
                  <h4 className="font-medium">API Documentation</h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Technical documentation for developers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Support