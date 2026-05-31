"use client"

import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import Card from '../ui/Card'

export default function TxnChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // 18 hours of data (6AM–midnight)
    const labels = Array.from({ length: 18 }, (_, i) => `${i + 6}:00`)
    
    // Random txn volumes with anomaly spikes at hours 5,6,9,13 (indices)
    const volumes = labels.map((_, i) => [5, 6, 9, 13].includes(i) ? 400 + Math.random() * 200 : 100 + Math.random() * 150)
    
    // Risk score overlays
    const riskScores = labels.map((_, i) => [5, 6, 9, 13].includes(i) ? 80 + Math.random() * 15 : 20 + Math.random() * 20)

    const chart = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            type: 'line',
            label: 'Avg Anomaly Score',
            data: riskScores,
            borderColor: '#EF9F27',
            backgroundColor: '#EF9F27',
            borderWidth: 2,
            tension: 0.4,
            yAxisID: 'y1'
          },
          {
            type: 'bar',
            label: 'Transaction Volume',
            data: volumes,
            backgroundColor: volumes.map((_, i) => [5, 6, 9, 13].includes(i) ? '#E24B4A' : '#1D9E75'),
            borderRadius: 4,
            yAxisID: 'y'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 12, font: { size: 11 } },
          },
        },
        scales: {
          x: { ticks: { maxRotation: 45, autoSkip: true, maxTicksLimit: 10 } },
          y: { type: 'linear', display: true, position: 'left', title: { display: true, text: 'Volume' } },
          y1: { type: 'linear', display: true, position: 'right', grid: { drawOnChartArea: false }, min: 0, max: 100, title: { display: true, text: 'Risk Score' } }
        }
      }
    })

    return () => chart.destroy()
  }, [])

  return (
    <Card title="Traffic Volume vs Anomaly Score (Live)" className="h-64 sm:h-80 min-w-0">
      <div className="relative h-full w-full min-w-0 overflow-hidden">
        <canvas ref={canvasRef} className="max-w-full" />
      </div>
    </Card>
  )
}
