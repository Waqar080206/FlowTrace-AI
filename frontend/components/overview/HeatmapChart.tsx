"use client"

import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import Card from '../ui/Card'
import { BRANCHES, CHANNELS } from '../../lib/constants'

export default function HeatmapChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const datasets = CHANNELS.map(channel => ({
      label: channel,
      data: BRANCHES.map(() => Math.floor(Math.random() * 50) + 10),
      backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`
    }))

    const chart = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: [...BRANCHES],
        datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 12, font: { size: 11 } },
          },
        },
        scales: {
          x: {
            stacked: true,
            ticks: { maxRotation: 45, minRotation: 0, autoSkip: true, maxTicksLimit: 8 },
          },
          y: { stacked: true },
        },
      }
    })

    return () => chart.destroy()
  }, [])

  return (
    <Card title="Fraud Instances (Branch x Channel)" className="h-64 sm:h-80 min-w-0">
      <div className="relative h-full w-full min-w-0 overflow-hidden">
        <canvas ref={canvasRef} className="max-w-full" />
      </div>
    </Card>
  )
}
