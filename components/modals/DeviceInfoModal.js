'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function DeviceInfoModal() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const onClose = () => {
    setMounted(false);
  }

  if (!mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
      ></div>

      {/* Modal Content */}
      <div className="relative z-10 bg-white p-6 rounded-xl shadow-xl max-w-md w-full mx-4 text-center animate-fade-in">
        <p className="text-lg font-bold text-red-600 uppercase mb-6">
          Please check the print parameter before testing.
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Okay
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")
  )
}
