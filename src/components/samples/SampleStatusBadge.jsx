import { useState } from 'react'
import PropTypes from 'prop-types'

function SampleStatusBadge({ status, onChange, isEditable = false }) {
  const [isChanging, setIsChanging] = useState(false)
  
  const getStatusClass = (statusType) => {
    switch (statusType) {
      case 'Pending':
        return 'badge-pending'
      case 'Processing':
        return 'badge-processing'
      case 'Completed':
        return 'badge-completed'
      default:
        return 'badge-pending'
    }
  }
  
  const handleStatusChange = (e) => {
    const newStatus = e.target.value
    onChange(newStatus)
    setIsChanging(false)
  }
  
  if (isEditable && isChanging) {
    return (
      <select 
        value={status}
        onChange={handleStatusChange}
        onBlur={() => setIsChanging(false)}
        autoFocus
        className="rounded border border-gray-300 px-1 py-0.5 text-xs"
      >
        <option value="Pending">Pending</option>
        <option value="Processing">Processing</option>
        <option value="Completed">Completed</option>
      </select>
    )
  }
  
  return (
    <span 
      className={`${getStatusClass(status)} ${isEditable ? 'cursor-pointer' : ''}`}
      onClick={isEditable ? () => setIsChanging(true) : undefined}
      title={isEditable ? "Click to change status" : undefined}
    >
      {status}
    </span>
  )
}

SampleStatusBadge.propTypes = {
  status: PropTypes.oneOf(['Pending', 'Processing', 'Completed']).isRequired,
  onChange: PropTypes.func,
  isEditable: PropTypes.bool
}

export default SampleStatusBadge