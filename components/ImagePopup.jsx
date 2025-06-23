"use client"
import { useEffect } from "react"

export default function ImagePopup({ image, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="relative z-10 max-w-4xl max-h-[90vh] mx-4">
        <div className="relative">
          <img
            src={image.src || "/placeholder.svg"}
            alt={image.title}
            className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 bg-white text-gray-800 hover:bg-gray-100 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
            <h3 className="text-white text-xl font-bold mb-2">{image.title}</h3>
            <p className="text-white/80 text-sm">{image.category}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
