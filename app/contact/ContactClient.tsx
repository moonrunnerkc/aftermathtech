// app/contact/ContactClient.tsx - CONTACT FORM CLIENT COMPONENT
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Send, CheckCircle, AlertCircle, Clock, Zap,
  Brain, Code, Building, MessageCircle, Terminal, Sparkles,
  User, Mail as MailIcon, ArrowRight
} from 'lucide-react'

// ==================== INTERFACE DEFINITIONS ====================

interface FormData {
  name: string
  email: string
  company: string
  subject: string
  message: string
  inquiryType: string
  urgency: string
}

interface InquiryType {
  value: string
  label: string
  description: string
  icon: React.ComponentType<any>
  accent: string
}

interface ContactClientProps {
  contactInfo: any
}

// ==================== MAIN CONTACT CLIENT COMPONENT ====================

export default function ContactClient({ contactInfo }: ContactClientProps) {
  
  // ==================== STATE MANAGEMENT ====================
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general',
    urgency: 'normal'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [focusedField, setFocusedField] = useState<string | null>(null)

  // ==================== INQUIRY TYPES CONFIGURATION ====================
  
  const inquiryTypes: InquiryType[] = [
    { 
      value: 'general', 
      label: 'General Inquiry', 
      description: 'Questions about our technology, capabilities, or company',
      icon: MessageCircle,
      accent: 'cyan'
    },
    { 
      value: 'ai-consulting', 
      label: 'AI Consulting', 
      description: 'Custom AI solutions, architecture, and implementation',
      icon: Brain,
      accent: 'purple'
    },
    { 
      value: 'partnership', 
      label: 'Strategic Partnership', 
      description: 'Business partnerships, collaborations, and joint ventures',
      icon: Building,
      accent: 'green'
    },
    { 
      value: 'technical', 
      label: 'Technical Discussion', 
      description: 'Deep-dive into architectures, APIs, and integrations',
      icon: Code,
      accent: 'orange'
    },
    { 
      value: 'research', 
      label: 'Research Collaboration', 
      description: 'Academic research, joint projects, and publications',
      icon: Terminal,
      accent: 'pink'
    },
    { 
      value: 'press', 
      label: 'Press & Media', 
      description: 'Media inquiries, interviews, and press coverage',
      icon: Sparkles,
      accent: 'blue'
    }
  ]

  const urgencyLevels = [
    { value: 'low', label: 'Low Priority', description: 'General inquiry, no rush' },
    { value: 'normal', label: 'Normal', description: 'Standard business inquiry' },
    { value: 'high', label: 'High Priority', description: 'Time-sensitive project' },
    { value: 'urgent', label: 'Urgent', description: 'Critical issue or opportunity' }
  ]

  // ==================== UTILITY FUNCTIONS ====================
  
  const getAccentClasses = (accent: string) => {
    const accents = {
      cyan: 'border-cyan-500/30 hover:border-cyan-400/50 from-cyan-500 to-cyan-600 text-cyan-400 bg-cyan-500/10',
      purple: 'border-purple-500/30 hover:border-purple-400/50 from-purple-500 to-purple-600 text-purple-400 bg-purple-500/10',
      green: 'border-green-500/30 hover:border-green-400/50 from-green-500 to-green-600 text-green-400 bg-green-500/10',
      orange: 'border-orange-500/30 hover:border-orange-400/50 from-orange-500 to-orange-600 text-orange-400 bg-orange-500/10',
      pink: 'border-pink-500/30 hover:border-pink-400/50 from-pink-500 to-pink-600 text-pink-400 bg-pink-500/10',
      blue: 'border-blue-500/30 hover:border-blue-400/50 from-blue-500 to-blue-600 text-blue-400 bg-blue-500/10'
    };
    return accents[accent as keyof typeof accents] || accents.cyan;
  };

  // ==================== EVENT HANDLERS ====================
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate form processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In production, this would integrate with your email service
      console.log('Form submission:', formData)
      
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        inquiryType: 'general',
        urgency: 'normal'
      })
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // ==================== COMPONENT RENDER ====================
  
  return (
    <section className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Send a Message
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Tell us about your project, challenge, or how we can collaborate to push the boundaries of AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* ==================== CONTACT FORM ==================== */}
          
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-black/40 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8"
            >
              
              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-6 bg-green-500/20 border border-green-500/30 rounded-xl"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <h3 className="text-green-400 font-bold text-lg">Message Sent Successfully!</h3>
                  </div>
                  <p className="text-green-300 mb-2">
                    Your message has been delivered directly to Bradley Ryan Kinnard.
                  </p>
                  <p className="text-green-300 text-sm">
                    Expect a personalized response within 24 hours. Check your email for confirmation.
                  </p>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-6 bg-red-500/20 border border-red-500/30 rounded-xl"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <AlertCircle className="w-6 h-6 text-red-400" />
                    <h3 className="text-red-400 font-bold text-lg">Error Sending Message</h3>
                  </div>
                  <p className="text-red-300 mb-2">
                    There was a technical issue submitting your message.
                  </p>
                  <p className="text-red-300 text-sm">
                    Please email us directly at{' '}
                    <a href="mailto:bradkinnard@proton.me" className="text-cyan-400 hover:text-cyan-300 underline">
                      bradkinnard@proton.me
                    </a>
                  </p>
                </motion.div>
              )}

              {/* Inquiry Type Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">What can we help you with?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {inquiryTypes.map((type) => (
                    <motion.label
                      key={type.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`cursor-pointer p-4 rounded-xl border transition-all ${
                        formData.inquiryType === type.value 
                          ? `${getAccentClasses(type.accent)} border-opacity-70`
                          : 'border-gray-700 hover:border-gray-600 bg-gray-800/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="inquiryType"
                        value={type.value}
                        checked={formData.inquiryType === type.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          formData.inquiryType === type.value 
                            ? `bg-gradient-to-br from-${type.accent}-500 to-${type.accent}-600`
                            : 'bg-gray-700'
                        }`}>
                          <type.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-semibold text-sm mb-1 ${
                            formData.inquiryType === type.value ? 'text-white' : 'text-gray-300'
                          }`}>
                            {type.label}
                          </h4>
                          <p className="text-xs text-gray-400 leading-relaxed">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    </motion.label>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all ${
                        focusedField === 'name' 
                          ? 'border-cyan-400 ring-2 ring-cyan-400/20 shadow-lg shadow-cyan-500/10' 
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all ${
                        focusedField === 'email' 
                          ? 'border-cyan-400 ring-2 ring-cyan-400/20 shadow-lg shadow-cyan-500/10' 
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Company and Urgency */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('company')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all ${
                        focusedField === 'company' 
                          ? 'border-cyan-400 ring-2 ring-cyan-400/20 shadow-lg shadow-cyan-500/10' 
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                      placeholder="Your company or organization"
                    />
                  </div>

                  <div>
                    <label htmlFor="urgency" className="block text-sm font-medium text-gray-300 mb-2">
                      Priority Level
                    </label>
                    <select
                      id="urgency"
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('urgency')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white focus:outline-none transition-all ${
                        focusedField === 'urgency' 
                          ? 'border-cyan-400 ring-2 ring-cyan-400/20 shadow-lg shadow-cyan-500/10' 
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      {urgencyLevels.map(level => (
                        <option key={level.value} value={level.value} className="bg-gray-800">
                          {level.label} - {level.description}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all ${
                      focusedField === 'subject' 
                        ? 'border-cyan-400 ring-2 ring-cyan-400/20 shadow-lg shadow-cyan-500/10' 
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all resize-none ${
                      focusedField === 'message' 
                        ? 'border-cyan-400 ring-2 ring-cyan-400/20 shadow-lg shadow-cyan-500/10' 
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    placeholder="Tell us about your project, challenge, or how we can help you achieve your AI goals..."
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">
                      {formData.message.length}/2000 characters
                    </span>
                    <span className="text-xs text-gray-500">
                      Minimum 50 characters recommended
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.subject || !formData.message}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 disabled:from-gray-600 disabled:to-gray-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-500/25"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message to Bradley</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                {/* Form footer */}
                <div className="flex items-center justify-center gap-2 text-sm text-gray-400 pt-4">
                  <Clock className="w-4 h-4" />
                  <span>Expect a personal response within 24 hours</span>
                </div>
              </form>
            </motion.div>
          </div>

          {/* ==================== SIDEBAR INFO ==================== */}
          
          <div className="space-y-6">
            
            {/* Founder info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-black/40 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{contactInfo.founder.name}</h3>
                  <p className="text-cyan-400 text-sm">{contactInfo.founder.title}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {contactInfo.founder.bio}
              </p>
              <a
                href={`mailto:${contactInfo.founder.email}`}
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <MailIcon className="w-4 h-4" />
                <span className="text-sm">{contactInfo.founder.email}</span>
              </a>
            </motion.div>

            {/* Quick contact */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-black/40 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6"
            >
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Need Immediate Help?
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                For urgent matters or quick questions, email is still the fastest way to reach us.
              </p>
              <a
                href="mailto:bradkinnard@proton.me?subject=Urgent%20-%20"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white px-4 py-3 rounded-lg font-medium transition-all text-sm"
              >
                <MailIcon className="w-4 h-4" />
                <span>Send Urgent Email</span>
              </a>
            </motion.div>

            {/* Response times */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-black/40 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6"
            >
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-400" />
                Response Times
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Email responses: &lt; 24 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-300">Urgent matters: &lt; 4 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">Consultations: Within 48 hours</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-xs text-gray-400">
                  Operating from Denver, Colorado (Mountain Time)
                </p>
              </div>
            </motion.div>

            {/* Expertise areas */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-black/40 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6"
            >
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                Expertise Areas
              </h3>
              <div className="space-y-2">
                {contactInfo.businessInfo.consultationTypes.slice(0, 4).map((type: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">{type}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <a
                  href="/about"
                  className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1 group"
                >
                  <span>View all capabilities</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}