import PropTypes from 'prop-types'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  siblingCount = 1
}) {
  // If there's only one page, don't render pagination
  if (totalPages <= 1) return null
  
  // Calculate range of page numbers to show
  const generatePages = () => {
    const pages = []
    
    // Always show first page
    pages.push(1)
    
    // Calculate start and end of sibling range
    const leftSiblingIndex = Math.max(2, currentPage - siblingCount)
    const rightSiblingIndex = Math.min(totalPages - 1, currentPage + siblingCount)
    
    // Add dots before the range if needed
    if (leftSiblingIndex > 2) {
      pages.push('...')
    }
    
    // Add pages in the middle range
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      pages.push(i)
    }
    
    // Add dots after the range if needed
    if (rightSiblingIndex < totalPages - 1) {
      pages.push('...')
    }
    
    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pages.push(totalPages)
    }
    
    return pages
  }
  
  const pages = generatePages()
  
  return (
    <div className="mt-4 flex items-center justify-between border-t border-gray-200 px-2 py-3 dark:border-gray-700 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 ${
            currentPage === 1 
              ? 'cursor-not-allowed text-gray-400 dark:text-gray-500' 
              : 'text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 ${
            currentPage === totalPages 
              ? 'cursor-not-allowed text-gray-400 dark:text-gray-500' 
              : 'text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
          }`}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Showing page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium dark:border-gray-600 dark:bg-gray-700 ${
                currentPage === 1 
                  ? 'cursor-not-allowed text-gray-400 dark:text-gray-500' 
                  : 'text-gray-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <span className="sr-only">Previous</span>
              <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            
            {pages.map((page, index) => {
              if (page === '...') {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                  >
                    ...
                  </span>
                )
              }
              
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`relative inline-flex items-center border px-4 py-2 text-sm font-medium ${
                    page === currentPage
                      ? 'z-10 border-primary-500 bg-primary-50 text-primary-600 dark:border-primary-700 dark:bg-primary-900 dark:text-primary-400'
                      : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {page}
                </button>
              )
            })}
            
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium dark:border-gray-600 dark:bg-gray-700 ${
                currentPage === totalPages 
                  ? 'cursor-not-allowed text-gray-400 dark:text-gray-500' 
                  : 'text-gray-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <span className="sr-only">Next</span>
              <FiChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  siblingCount: PropTypes.number
}

export default Pagination