// Mock sample data with Indian names
const mockSamples = [
  {
    id: 'SAM-001',
    name: 'Ravi Kumar - Blood Sample',
    type: 'Blood',
    collectedOn: '2025-03-01',
    status: 'Completed',
    description: 'Routine blood work for annual physical'
  },
  {
    id: 'SAM-002',
    name: 'Priya Singh - Urine Sample',
    type: 'Urine',
    collectedOn: '2025-03-02',
    status: 'Processing',
    description: 'UTI screening'
  },
  {
    id: 'SAM-003',
    name: 'Anjali Mehta - Tissue Sample',
    type: 'Tissue',
    collectedOn: '2025-03-03',
    status: 'Pending',
    description: 'Biopsy for suspicious growth'
  },
  {
    id: 'SAM-004',
    name: 'Amit Sharma - Blood Sample',
    type: 'Blood',
    collectedOn: '2025-03-04',
    status: 'Completed',
    description: 'CBC with differential'
  },
  {
    id: 'SAM-005',
    name: 'Neha Verma - Urine Sample',
    type: 'Urine',
    collectedOn: '2025-03-05',
    status: 'Processing',
    description: 'Drug screening panel'
  },
  {
    id: 'SAM-006',
    name: 'Vikram Patel - Tissue Sample',
    type: 'Tissue',
    collectedOn: '2025-03-06',
    status: 'Pending',
    description: 'Skin biopsy for dermatological evaluation'
  },
  {
    id: 'SAM-007',
    name: 'Kavita Joshi - Blood Sample',
    type: 'Blood',
    collectedOn: '2025-03-07',
    status: 'Completed',
    description: 'Lipid panel'
  },
  {
    id: 'SAM-008',
    name: 'Arjun Nair - Urine Sample',
    type: 'Urine',
    collectedOn: '2025-03-08',
    status: 'Processing',
    description: 'Pregnancy test'
  },
  {
    id: 'SAM-009',
    name: 'Sneha Reddy - Tissue Sample',
    type: 'Tissue',
    collectedOn: '2025-03-09',
    status: 'Pending',
    description: 'Lung tissue analysis'
  },
  {
    id: 'SAM-010',
    name: 'Rahul Iyer - Blood Sample',
    type: 'Blood',
    collectedOn: '2025-03-10',
    status: 'Completed',
    description: 'Thyroid panel'
  },
  {
    id: 'SAM-011',
    name: 'Meena Das - Urine Sample',
    type: 'Urine',
    collectedOn: '2025-03-11',
    status: 'Processing',
    description: 'Urinalysis'
  },
  {
    id: 'SAM-012',
    name: 'Suresh Shetty - Tissue Sample',
    type: 'Tissue',
    collectedOn: '2025-03-12',
    status: 'Pending',
    description: 'Breast tissue analysis'
  }
];


// Simulate local storage persistence
const STORAGE_KEY = 'ylims_samples';

// Load samples from localStorage or use mock data
const loadSamples = () => {
  const storedSamples = localStorage.getItem(STORAGE_KEY);
  return storedSamples ? JSON.parse(storedSamples) : mockSamples;
};

// Save samples to localStorage
const saveSamples = (samples) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(samples));
};

// Initial load
let samples = loadSamples();

// Get all samples with optional filtering
export const getSamples = async (filters = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filteredSamples = [...samples];
  
  // Apply name search filter
  if (filters.searchTerm) {
    const searchTerm = filters.searchTerm.toLowerCase();
    filteredSamples = filteredSamples.filter(sample => 
      sample.name.toLowerCase().includes(searchTerm) || 
      sample.id.toLowerCase().includes(searchTerm)
    );
  }
  
  // Apply status filter
  if (filters.status && filters.status !== 'All') {
    filteredSamples = filteredSamples.filter(sample => 
      sample.status === filters.status
    );
  }
  
  // Apply sorting
  if (filters.sortBy) {
    filteredSamples.sort((a, b) => {
      if (filters.sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (filters.sortBy === 'date') {
        return new Date(a.collectedOn) - new Date(b.collectedOn);
      }
      return 0;
    });
    
    // Apply sort direction
    if (filters.sortDirection === 'desc') {
      filteredSamples.reverse();
    }
  }
  
  return filteredSamples;
};

// Get a sample by ID
export const getSampleById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return samples.find(sample => sample.id === id);
};

// Create a new sample
export const createSample = async (sampleData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Generate new ID (incremental from last ID)
  const lastId = samples.length > 0 
    ? parseInt(samples[samples.length - 1].id.split('-')[1]) 
    : 0;
  
  const newId = `SAM-${String(lastId + 1).padStart(3, '0')}`;
  
  const newSample = {
    id: newId,
    ...sampleData
  };
  
  samples = [...samples, newSample];
  saveSamples(samples);
  
  return newSample;
};

// Update a sample
export const updateSample = async (id, sampleData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const index = samples.findIndex(sample => sample.id === id);
  
  if (index === -1) {
    throw new Error(`Sample with ID ${id} not found`);
  }
  
  const updatedSample = {
    ...samples[index],
    ...sampleData
  };
  
  samples = [
    ...samples.slice(0, index),
    updatedSample,
    ...samples.slice(index + 1)
  ];
  
  saveSamples(samples);
  
  return updatedSample;
};

// Update sample status only (for quick status updates)
export const updateSampleStatus = async (id, status) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const index = samples.findIndex(sample => sample.id === id);
  
  if (index === -1) {
    throw new Error(`Sample with ID ${id} not found`);
  }
  
  const updatedSample = {
    ...samples[index],
    status
  };
  
  samples = [
    ...samples.slice(0, index),
    updatedSample,
    ...samples.slice(index + 1)
  ];
  
  saveSamples(samples);
  
  return updatedSample;
};

// Get sample types (for dropdown options)
export const getSampleTypes = async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return ['Blood', 'Urine', 'Tissue'];
};

// Get sample statuses (for dropdown options)
export const getSampleStatuses = async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return ['Pending', 'Processing', 'Completed'];
};