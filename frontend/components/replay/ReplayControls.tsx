'use client'

import { useEffect, useState } from 'react'

interface ReplayControlsProps {
  currentStep: number
  totalSteps: number
  isPlaying: boolean
  onPlay: () => void
  onPause: () => void
  onStep: (step: number) => void
  activeAmount?: number
}

export default function ReplayControls({
  currentStep,
  totalSteps,
  isPlaying,
  onPlay,
  onPause,
  onStep,
  activeAmount,
}: ReplayControlsProps) {
  const [localStep, setLocalStep] = useState(currentStep)

  useEffect(() => {
    setLocalStep(currentStep)
  }, [currentStep])

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStep = parseInt(e.target.value)
    setLocalStep(newStep)
    onStep(newStep)
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause()
    } else {
      onPlay()
    }
  }

  const handleReset = () => {
    onStep(0)
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      onStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      onStep(currentStep - 1)
    }
  }

  return (
    <div className="bg-bg-primary border border-palette-light-gray rounded-lg p-3 sm:p-4 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-size6 font-semibold text-text-primary font-poppins">
          Step {currentStep} / {totalSteps}
        </span>
        <div className="flex items-center justify-center sm:justify-end gap-2 flex-wrap">
          <button
            onClick={handleReset}
            className="p-2 rounded-lg hover:bg-bg-secondary text-text-text5 hover:text-text-primary transition-colors"
            title="Reset to start"
          >
            <i className="ti ti-player-skip-back"></i>
          </button>
          <button
            onClick={handlePrev}
            className="p-2 rounded-lg hover:bg-bg-secondary text-text-text5 hover:text-text-primary transition-colors"
            title="Previous step"
          >
            <i className="ti ti-player-pause"></i>
          </button>
          <button
            onClick={handlePlayPause}
            className={`px-3 sm:px-4 py-2 rounded-lg font-semibold text-text-secondary transition-colors flex items-center gap-2 text-size5 sm:text-size6 ${
              isPlaying ? 'bg-palette-red hover:bg-palette-red/90' : 'bg-palette-blue hover:bg-palette-blue/90'
            }`}
          >
            <i className={`ti ${isPlaying ? 'ti-player-pause' : 'ti-player-play'}`}></i>
            <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-lg hover:bg-bg-secondary text-text-text5 hover:text-text-primary transition-colors"
            title="Next step"
          >
            <i className="ti ti-player-play"></i>
          </button>
        </div>
      </div>

      {/* Seek bar */}
      <div className="space-y-2">
        <input
          type="range"
          min="0"
          max={totalSteps}
          value={localStep}
          onChange={handleSeek}
          className="w-full h-2 bg-palette-light-gray rounded-lg appearance-none cursor-pointer accent-palette-blue"
        />
        <div className="flex justify-between text-size3 text-text-text5">
          <span>0</span>
          <span>{totalSteps}</span>
        </div>
      </div>

      {/* Info message */}
      <p className="text-size5 text-text-text5 italic">
        {currentStep === 0
          ? 'Press Play to watch the transaction flow step by step'
          : currentStep === totalSteps
            ? 'Circular transaction complete!'
            : `Watching hop ${currentStep}: ₹${(activeAmount ?? 80000 - currentStep * 2000).toLocaleString()} transfer`}
      </p>
    </div>
  )
}
