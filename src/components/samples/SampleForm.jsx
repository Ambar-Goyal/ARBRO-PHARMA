import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { FiX } from 'react-icons/fi'

function SampleForm({ sample, onSubmit, onCancel, isLoading, sampleTypes, sampleStatuses }) {
  const today = new Date().toISOString().split('T')[0]
  
  const initialFormData = {
    name: '',
    type: sampleTypes[0] || '',
    collectedOn: today,
    status: sampleStatuses[0] || '',
    description: ''
  }
  
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  
  // Set form data when sample changes (for edit mode)
  useEffect(() => {
    if (sample) {
      setFormData({
        name: sample.name || '',
        type: sample.type || sampleTypes[0] || '',
        collectedOn: sample.collectedOn || today,
        status: sample.status || sampleStatuses[0] || '',
        description: sample.description || ''
      })
    } else {
      setFormData(initialFormData)
    }
  }, [sample, sampleTypes, sampleStatuses, today])
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Sample name is required'
    }
    
    if (!formData.type) {
      newErrors.type = 'Sample type is required'
    }
    
    if (!formData.collectedOn) {
      newErrors.collectedOn = 'Collection date is required'
    } else {
      const selectedDate = new Date(formData.collectedOn)
      const currentDate = new Date()
      
      if (selectedDate > currentDate) {
        newErrors.collectedOn = 'Future dates are not allowed'
      }
    }
    
    if (!formData.status) {
      newErrors.status = 'Status is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-gray-700">
        <h2 className="text-xl font-bold">
          {sample ? 'Edit Sample' : 'Add New Sample'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700"
        >
          <FiX size={20} />
        </button>
      </div>
      
      <div>
        <label htmlFor="name" className="form-label">
          Sample Name*
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`form-input ${errors.name ? 'border-error-500' : ''}`}
          placeholder="Enter sample name"
          disabled={isLoading}
        />
        {errors.name && <p className="form-error">{errors.name}</p>}
      </div>
      
      <div>
        <label htmlFor="type" className="form-label">
          Sample Type*
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className={`form-input ${errors.type ? 'border-error-500' : ''}`}
          disabled={isLoading}
        >
          {sampleTypes.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.type && <p className="form-error">{errors.type}</p>}
      </div>
      
      <div>
        <label htmlFor="collectedOn" className="form-label">
          Collected Date*
        </label>
        <input
          type="date"
          id="collectedOn"
          name="collectedOn"
          value={formData.collectedOn}
          onChange={handleChange}
          max={today}
          className={`form-input ${errors.collectedOn ? 'border-error-500' : ''}`}
          disabled={isLoading}
        />
        {errors.collectedOn && <p className="form-error">{errors.collectedOn}</p>}
      </div>
      
      <div>
        <label htmlFor="status" className="form-label">
          Status*
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className={`form-input ${errors.status ? 'border-error-500' : ''}`}
          disabled={isLoading}
        >
          {sampleStatuses.map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        {errors.status && <p className="form-error">{errors.status}</p>}
      </div>
      
      <div>
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="form-input"
          placeholder="Enter sample description (optional)"
          disabled={isLoading}
        ></textarea>
      </div>
      
      <div className="flex justify-end space-x-3 pt-3">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : sample ? 'Update Sample' : 'Add Sample'}
        </button>
      </div>
    </form>
  )
}

SampleForm.propTypes = {
  sample: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  sampleTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  sampleStatuses: PropTypes.arrayOf(PropTypes.string).isRequired
}

SampleForm.defaultProps = {
  sample: null,
  isLoading: false
}

export default SampleForm