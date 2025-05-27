import { useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
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
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsSubmitting(true)
      
      // Simulate API call with a timeout
      setTimeout(() => {
        setIsSubmitting(false)
        setSubmitSuccess(true)
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setSubmitSuccess(false)
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          })
        }, 3000)
      }, 1500)
    }
  }
  
  return (
    <div className="container mx-auto">
      <h1 className="mb-8 text-3xl font-bold">Contact Us</h1>
      
      <div className="grid gap-8 md:grid-cols-3">
        <div className="col-span-1 md:col-span-1">
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">Get in Touch</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Have questions about YLIMS? Our team is here to help you. Reach out to us using any of the methods below.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="mt-1 flex-shrink-0 rounded-full bg-primary-100 p-2 text-primary-600 dark:bg-primary-900 dark:text-primary-400">
                <FiMail size={18} />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Email</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  <a href="mailto:support@ylims.com" className="hover:text-primary-600 dark:hover:text-primary-400">
                    support@ylims.com
                  </a>
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mt-1 flex-shrink-0 rounded-full bg-primary-100 p-2 text-primary-600 dark:bg-primary-900 dark:text-primary-400">
                <FiPhone size={18} />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Phone</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  <a href="tel:+18005551234" className="hover:text-primary-600 dark:hover:text-primary-400">
                    +1 (800) 555-1234
                  </a>
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mt-1 flex-shrink-0 rounded-full bg-primary-100 p-2 text-primary-600 dark:bg-primary-900 dark:text-primary-400">
                <FiMapPin size={18} />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Address</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Kirti Nagar<br />
                  New Delhi<br />
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-700 p-6 text-white shadow-md">
            <h3 className="mb-3 text-lg font-semibold">Business Hours</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span>10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-semibold">Send Us a Message</h2>
            
            {submitSuccess ? (
              <div className="rounded-md bg-success-50 p-4 text-success-700 dark:bg-success-700/20 dark:text-success-500">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FiSend className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">
                      Thank you for your message! We'll respond as soon as possible.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="form-label">
                    Your Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? 'border-error-500' : ''}`}
                    placeholder="John Doe"
                    disabled={isSubmitting}
                  />
                  {errors.name && <p className="form-error">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="form-label">
                    Your Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'border-error-500' : ''}`}
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && <p className="form-error">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="subject" className="form-label">
                    Subject*
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`form-input ${errors.subject ? 'border-error-500' : ''}`}
                    placeholder="How can we help you?"
                    disabled={isSubmitting}
                  />
                  {errors.subject && <p className="form-error">{errors.subject}</p>}
                </div>
                
                <div>
                  <label htmlFor="message" className="form-label">
                    Message*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`form-input ${errors.message ? 'border-error-500' : ''}`}
                    placeholder="Your message here..."
                    disabled={isSubmitting}
                  ></textarea>
                  {errors.message && <p className="form-error">{errors.message}</p>}
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <FiSend className="mr-2" />
                        Send Message
                      </span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact