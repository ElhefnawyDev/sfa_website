"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Send, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

export default function BookDemoPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contact: "",
    email: "",
    natureOfBusiness: "",
    sizeOfManpower: "",
    additionalNotes: "",
    contactNumber: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const value = e.target.value.replace(/[^0-9]/g, "") // Remove all non-numeric characters
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }))
  }

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9+]/g, "") // Allow only numbers and +

    // If user starts typing without +, automatically add +6
    if (value.length > 0 && !value.startsWith("+")) {
      value = "+6" + value
    }

    // If user types just +, suggest +6
    if (value === "+") {
      value = "+6"
    }

    // Ensure it starts with +6
    if (value.startsWith("+") && !value.startsWith("+6")) {
      // If they typed +60, +61, etc., keep it as is for now
      // But if they typed just + followed by non-6, redirect to +6
      if (value.length === 2 && value !== "+6") {
        value = "+6"
      }
    }

    // Limit total length (+6 + 11 digits = 14 characters)
    if (value.length > 14) {
      value = value.substring(0, 14)
    }

    setFormData((prev) => ({
      ...prev,
      contactNumber: value,
    }))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter, home, end, left, right
    if (
      [8, 9, 27, 13, 46, 35, 36, 37, 39].indexOf(e.keyCode) !== -1 ||
      // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode === 67 && e.ctrlKey === true) ||
      (e.keyCode === 86 && e.ctrlKey === true) ||
      (e.keyCode === 88 && e.ctrlKey === true)
    ) {
      return
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault()
    }
  }

  const validatePhoneNumber = (phone: string) => {
    // Must start with +6 and have exactly 11 digits after +6
    // Total format: +6XXXXXXXXXXX (14 characters total)
    const phoneRegex = /^\+6\d{11}$/
    
    if (!phoneRegex.test(phone)) {
      return false
    }

    // Additional validation: ensure the number after +6 is a valid Malaysian mobile number
    const malaysianNumber = phone.substring(2) // Remove +6
    // Malaysian mobile numbers typically start with 01, 03, 04, 05, 06, 07, 08, 09
    // But we'll be more flexible and just ensure it's 11 digits starting with 0 or 1
    return /^[01]\d{10}$/.test(malaysianNumber)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // Validate phone number format
    if (!validatePhoneNumber(formData.contactNumber)) {
      setError("Please enter a valid Malaysian phone number in format +6XXXXXXXXXXX (14 characters total)")
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        const errorData = await response.json()
        setError(errorData.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
              <p className="text-gray-600 mb-6">
                Your demo request has been submitted successfully. Our team will contact you within 24 hours.
              </p>
              <Link href="/">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                  Back to Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Your SFA365 Demo</h1>
          <p className="text-gray-600">
            Fill out the form below and our team will schedule a personalized demo for your business.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Demo Request Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Name */}
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Enter your company name"
                  />
                </div>

                {/* Contact */}
                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    required
                    value={formData.contact}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Enter contact person name"
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="text"
                    id="contactNumber"
                    name="contactNumber"
                    required
                    value={formData.contactNumber}
                    onChange={handlePhoneInput}
                    onPaste={(e) => {
                      e.preventDefault()
                      const paste = (e.clipboardData || window.Clipboard).getData("text")
                      let cleanPaste = paste.replace(/[^0-9+]/g, "")

                      // Auto-format pasted numbers
                      if (cleanPaste.length > 0 && !cleanPaste.startsWith("+")) {
                        cleanPaste = "+6" + cleanPaste
                      }

                      if (cleanPaste === "+") {
                        cleanPaste = "+6"
                      }

                      // Ensure it starts with +6
                      if (cleanPaste.startsWith("+") && !cleanPaste.startsWith("+6")) {
                        cleanPaste = "+6" + cleanPaste.substring(1)
                      }

                      if (cleanPaste.length <= 14) {
                        setFormData((prev) => ({ ...prev, contactNumber: cleanPaste }))
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="+601139799153"
                    maxLength={14}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Format: +6XXXXXXXXXXX (exactly 14 characters - +6 followed by 11 digits)
                  </p>
                  {formData.contactNumber && !validatePhoneNumber(formData.contactNumber) && (
                    <p className="text-xs text-red-500 mt-1">Please enter a valid Malaysian phone number (+6 followed by exactly 11 digits)</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Nature of Business */}
                <div>
                  <label htmlFor="natureOfBusiness" className="block text-sm font-medium text-gray-700 mb-2">
                    Nature of Business *
                  </label>
                  <select
                    id="natureOfBusiness"
                    name="natureOfBusiness"
                    required
                    value={formData.natureOfBusiness}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    <option value="">Select your business type</option>
                    <option value="Technology">Technology</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Retail">Retail</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Education">Education</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Size of Manpower */}
                <div>
                  <label htmlFor="sizeOfManpower" className="block text-sm font-medium text-gray-700 mb-2">
                    Size of Manpower *
                  </label>
                  <input
                    type="text"
                    id="sizeOfManpower"
                    name="sizeOfManpower"
                    required
                    value={formData.sizeOfManpower}
                    onChange={(e) => handleNumericInput(e, "sizeOfManpower")}
                    onKeyDown={handleKeyDown}
                    onPaste={(e) => {
                      e.preventDefault()
                      const paste = (e.clipboardData || window.Clipboard).getData("text")
                      const numericValue = paste.replace(/[^0-9]/g, "")
                      if (Number.parseInt(numericValue) <= 10000) {
                        setFormData((prev) => ({ ...prev, sizeOfManpower: numericValue }))
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Enter number of employees (numbers only)"
                    maxLength={5}
                  />
                  <p className="text-xs text-gray-500 mt-1">Maximum 10,000 employees</p>
                </div>

                {/* Additional Notes */}
                <div>
                  <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    rows={4}
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Any specific requirements or questions about SFA365?"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="w-4 h-4 mr-2" />
                      Submit Demo Request
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}