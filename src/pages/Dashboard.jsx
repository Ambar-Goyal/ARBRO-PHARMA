import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiSearch, FiFilter, FiPlus } from 'react-icons/fi'
import SampleTable from '../components/samples/SampleTable'
import SampleForm from '../components/samples/SampleForm'
import Modal from '../components/common/Modal'
import Pagination from '../components/common/Pagination'
import * as sampleService from '../services/sampleService'

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [samples, setSamples] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormLoading, setIsFormLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(8)
  const [sampleTypes, setSampleTypes] = useState([])
  const [sampleStatuses, setSampleStatuses] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [currentSample, setCurrentSample] = useState(null)
  
  // Check for 'action=new' in URL to open the add sample form
  useEffect(() => {
    if (searchParams.get('action') === 'new') {
      setShowModal(true)
      setCurrentSample(null)
      
      // Remove the action param after opening the modal
      const newParams = new URLSearchParams(searchParams)
      newParams.delete('action')
      setSearchParams(newParams)
    }
  }, [searchParams, setSearchParams])
  
  // Load sample types and statuses
  useEffect(() => {
    const loadFormOptions = async () => {
      try {
        const types = await sampleService.getSampleTypes()
        const statuses = await sampleService.getSampleStatuses()
        
        setSampleTypes(types)
        setSampleStatuses(statuses)
      } catch (error) {
        console.error('Failed to load form options:', error)
      }
    }
    
    loadFormOptions()
  }, [])
  
  // Load samples with filtering and sorting
  useEffect(() => {
    const loadSamples = async () => {
      try {
        setIsLoading(true)
        
        const filters = {
          searchTerm: searchTerm,
          status: statusFilter,
          sortBy: sortConfig.key === 'name' ? 'name' : 'date',
          sortDirection: sortConfig.direction
        }
        
        const data = await sampleService.getSamples(filters)
        setSamples(data)
      } catch (error) {
        console.error('Failed to load samples:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    // Add a small delay for search to avoid too many requests while typing
    const searchTimer = setTimeout(() => {
      loadSamples()
    }, 300)
    
    return () => clearTimeout(searchTimer)
  }, [searchTerm, statusFilter, sortConfig])
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, statusFilter])
  
  // Calculate paginated data
  const currentSamples = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    return samples.slice(indexOfFirstItem, indexOfLastItem)
  }, [samples, currentPage, itemsPerPage])
  
  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(samples.length / itemsPerPage)
  }, [samples, itemsPerPage])
  
  // Handle pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  
  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }
  
  // Handle status filter
  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value)
  }
  
  // Handle sorting
  const handleSort = (key, direction) => {
    setSortConfig({ key, direction })
  }
  
  // Handle editing a sample
  const handleEditSample = async (sampleId) => {
    try {
      const sample = await sampleService.getSampleById(sampleId)
      setCurrentSample(sample)
      setShowModal(true)
    } catch (error) {
      console.error('Failed to load sample for editing:', error)
    }
  }
  
  // Handle status change directly from the table
  const handleStatusChange = async (sampleId, newStatus) => {
    try {
      // Optimistic UI update
      setSamples(samples.map(sample => 
        sample.id === sampleId ? { ...sample, status: newStatus } : sample
      ))
      
      // API call
      await sampleService.updateSampleStatus(sampleId, newStatus)
    } catch (error) {
      console.error('Failed to update sample status:', error)
      
      // Revert optimistic update on failure
      const originalSamples = await sampleService.getSamples({})
      setSamples(originalSamples)
    }
  }
  
  // Handle form submission (create or update)
  const handleSampleSubmit = async (formData) => {
    try {
      setIsFormLoading(true)
      
      if (currentSample) {
        // Update existing sample
        await sampleService.updateSample(currentSample.id, formData)
      } else {
        // Create new sample
        await sampleService.createSample(formData)
      }
      
      // Refresh the sample list
      const updatedSamples = await sampleService.getSamples({
        searchTerm: searchTerm,
        status: statusFilter,
        sortBy: sortConfig.key === 'name' ? 'name' : 'date',
        sortDirection: sortConfig.direction
      })
      
      setSamples(updatedSamples)
      setShowModal(false)
      setCurrentSample(null)
    } catch (error) {
      console.error('Failed to save sample:', error)
    } finally {
      setIsFormLoading(false)
    }
  }
  
  return (
    <div className="container mx-auto">
      <div className="mb-6 flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <h1 className="mb-4 text-2xl font-bold sm:mb-0">Management Dashboard</h1>
        
        <button
          onClick={() => {
            setCurrentSample(null)
            setShowModal(true)
          }}
          className="btn-primary hidden md:inline-flex"
        >
          <FiPlus className="mr-2" /> Add New Sample
        </button>
      </div>
      
      {/* Filters and Search */}
      <div className="mb-6 flex flex-col items-stretch space-y-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 md:flex-row md:items-center md:space-x-4 md:space-y-0">
        <div className="flex-1">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search samples..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <FiFilter className="mr-2 text-gray-400" />
            <span className="mr-2 hidden text-sm text-gray-600 dark:text-gray-300 sm:inline">Status:</span>
          </div>
          <select
            value={statusFilter}
            onChange={handleStatusFilter}
            className="rounded-md border border-gray-300 py-2 pl-3 pr-8 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        
        <button
          onClick={() => {
            setCurrentSample(null)
            setShowModal(true)
          }}
          className="btn-primary md:hidden"
        >
          <FiPlus className="mr-2" /> Add New Sample
        </button>
      </div>
      
      {/* Loading State */}
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary-600"></div>
          <span className="ml-2">Loading samples...</span>
        </div>
      ) : (
        <>
          {/* Sample Table */}
          <SampleTable
            samples={currentSamples}
            onEditSample={handleEditSample}
            onStatusChange={handleStatusChange}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
          
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
      
      {/* Sample Form Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setCurrentSample(null)
        }}
        maxWidth="max-w-lg"
      >
        <SampleForm
          sample={currentSample}
          onSubmit={handleSampleSubmit}
          onCancel={() => {
            setShowModal(false)
            setCurrentSample(null)
          }}
          isLoading={isFormLoading}
          sampleTypes={sampleTypes}
          sampleStatuses={sampleStatuses}
        />
      </Modal>
    </div>
  )
}

export default Dashboard