'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function LogoutConfirmModal({ isOpen, onClose, onLogout }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!isOpen || !mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
      ></div>

      <div className="relative z-10 bg-white p-6 rounded-xl shadow-xl max-w-md w-full mx-4 text-center animate-fade-in">
        <p className="text-lg font-bold text-red-600 uppercase mb-6">
          Other user logged in to unit. Continue anyway?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onLogout}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  )
}
