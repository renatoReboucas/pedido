'use client'
import React from 'react'
import { X } from 'lucide-react'

export default function modal({
  isOpen,
  onClose,
  children,
  title,
  onSubmit,
  txtBtn,
}) {
  if (!isOpen) {
    return null
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-4 md:mx-auto rounded-lg bg-white shadow-lg">
          {/* Cabeçalho da Modal */}
          <div className="flex items-start justify-between rounded-t border-b p-4">
            <h3 className="className text-xl text-zinc-900">{title}</h3>
            <button
              type="button"
              className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm  text-zinc-600 hover:bg-gray-200 hover:text-zinc-900"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-6 p-6">{children}</div>
          <div className="flex items-center justify-end rounded-b border-t p-6">
            <button
              type="button"
              onClick={onSubmit}
              className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              {txtBtn}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
