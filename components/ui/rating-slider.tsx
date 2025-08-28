'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface RatingSliderProps {
  value: number
  onChange: (value: number) => void
  label: string
  lowLabel?: string
  highLabel?: string
  className?: string
}

export function RatingSlider({ 
  value, 
  onChange, 
  label, 
  lowLabel = "Poor",
  highLabel = "Excellent",
  className 
}: RatingSliderProps) {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null)
  
  const displayValue = hoveredValue ?? value

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm text-blue-600 font-semibold">
          {displayValue}/10
        </span>
      </div>
      
      <div className="relative">
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => onChange(rating)}
              onMouseEnter={() => setHoveredValue(rating)}
              onMouseLeave={() => setHoveredValue(null)}
              className={cn(
                "flex-1 h-8 rounded transition-all duration-200 border-2",
                rating <= displayValue
                  ? rating <= 4
                    ? "bg-red-500 border-red-500"
                    : rating <= 7
                    ? "bg-yellow-500 border-yellow-500"
                    : "bg-green-500 border-green-500"
                  : "bg-gray-100 border-gray-200 hover:bg-gray-200",
                "hover:scale-105"
              )}
            >
              <span className={cn(
                "text-xs font-medium",
                rating <= displayValue ? "text-white" : "text-gray-500"
              )}>
                {rating}
              </span>
            </button>
          ))}
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{lowLabel}</span>
          <span>{highLabel}</span>
        </div>
      </div>
    </div>
  )
}