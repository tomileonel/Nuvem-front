"use client"

import { useEffect, useState } from "react"

export default function LoadingAnimation() {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center">
      <div className="text-center">
        <div
          className={`text-6xl font-bold text-white mb-4 transition-all duration-1000 ${
            animate ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          NuvemVoice
        </div>
        <div
          className={`w-16 h-1 bg-white rounded-full mx-auto transition-all duration-1500 delay-500 ${
            animate ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
        />
        <div
          className={`text-white text-lg mt-4 transition-all duration-1000 delay-1000 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Loading...
        </div>
      </div>
    </div>
  )
}
