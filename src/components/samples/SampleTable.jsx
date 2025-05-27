import { useState } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { FiEdit } from 'react-icons/fi'
import SampleStatusBadge from './SampleStatusBadge'

function SampleTable({ 
  samples, 
  onEditSample, 
  onStatusChange, 
  sortConfig, 
  onSort 
}) {
  const getSortIndicator = (name) => {
    if (sortConfig && sortConfig.key === name) {
      return sortConfig.direction === 'asc' ? ' ▲' : ' ▼'
    }
    return ''
  }
  
  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    onSort(key, direction)
  }
  
  return (
    <div className="table-container">
      <table className="table">
        <thead className="table-header">
          <tr>
            <th className="table-header-cell">Sample ID</th>
            <th 
              className="table-header-cell cursor-pointer"
              onClick={() => handleSort('name')}
            >
              Sample Name{getSortIndicator('name')}
            </th>
            <th className="table-header-cell">Type</th>
            <th 
              className="table-header-cell cursor-pointer"
              onClick={() => handleSort('date')}
            >
              Collected On{getSortIndicator('date')}
            </th>
            <th className="table-header-cell">Status</th>
            <th className="table-header-cell">Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {samples.length === 0 ? (
            <tr>
              <td colSpan="6\" className="py-8 text-center text-gray-500">
                No samples found. Try changing your filters or add a new sample.
              </td>
            </tr>
          ) : (
            samples.map((sample) => (
              <tr key={sample.id} className="table-row">
                <td className="table-cell font-medium">{sample.id}</td>
                <td className="table-cell">{sample.name}</td>
                <td className="table-cell">{sample.type}</td>
                <td className="table-cell">
                  {format(new Date(sample.collectedOn), 'MMM d, yyyy')}
                </td>
                <td className="table-cell">
                  <SampleStatusBadge 
                    status={sample.status} 
                    isEditable={true}
                    onChange={(status) => onStatusChange(sample.id, status)}
                  />
                </td>
                <td className="table-cell">
                  <button
                    onClick={() => onEditSample(sample.id)}
                    className="rounded p-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    aria-label={`Edit ${sample.name}`}
                  >
                    <FiEdit size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

SampleTable.propTypes = {
  samples: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      collectedOn: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired
    })
  ).isRequired,
  onEditSample: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  sortConfig: PropTypes.shape({
    key: PropTypes.string,
    direction: PropTypes.string
  }),
  onSort: PropTypes.func.isRequired
}

export default SampleTable