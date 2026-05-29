'use client'

import { useEffect, useRef } from 'react'

interface ReplayNode {
  id: string
  name: string
  x: number
  y: number
}

interface ReplayEdge {
  from: string
  to: string
}

interface ReplayCanvasProps {
  nodes: ReplayNode[]
  edges: ReplayEdge[]
  activeEdge: ReplayEdge | null
  currentStep: number
  totalSteps: number
}

export default function ReplayCanvas({ nodes, edges, activeEdge, currentStep, totalSteps }: ReplayCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, width, height)

    // Draw inactive edges
    ctx.strokeStyle = '#E0E0E0'
    ctx.lineWidth = 2
    edges.forEach((edge) => {
      const fromNode = nodes.find((n) => n.id === edge.from)
      const toNode = nodes.find((n) => n.id === edge.to)
      if (fromNode && toNode) {
        ctx.beginPath()
        ctx.moveTo(fromNode.x, fromNode.y)
        ctx.lineTo(toNode.x, toNode.y)
        ctx.stroke()
      }
    })

    // Draw active edge
    if (activeEdge) {
      const fromNode = nodes.find((n) => n.id === activeEdge.from)
      const toNode = nodes.find((n) => n.id === activeEdge.to)
      if (fromNode && toNode) {
        ctx.strokeStyle = '#C00000'
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.moveTo(fromNode.x, fromNode.y)
        ctx.lineTo(toNode.x, toNode.y)
        ctx.stroke()

        // Draw arrow
        const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x)
        ctx.fillStyle = '#C00000'
        ctx.beginPath()
        ctx.moveTo(toNode.x, toNode.y)
        ctx.lineTo(toNode.x - 15 * Math.cos(angle - Math.PI / 6), toNode.y - 15 * Math.sin(angle - Math.PI / 6))
        ctx.lineTo(toNode.x - 15 * Math.cos(angle + Math.PI / 6), toNode.y - 15 * Math.sin(angle + Math.PI / 6))
        ctx.closePath()
        ctx.fill()
      }
    }

    // Draw nodes
    nodes.forEach((node) => {
      const isActive = activeEdge && (activeEdge.from === node.id || activeEdge.to === node.id)
      const radius = 28

      ctx.fillStyle = isActive ? '#C00000' : '#CCCCCC'
      ctx.beginPath()
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
      ctx.fill()

      // Draw node border
      ctx.strokeStyle = isActive ? '#8B0000' : '#999999'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
      ctx.stroke()

      // Draw account ID text
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 12px Poppins'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(node.id, node.x, node.y)
    })

    // Draw step counter
    ctx.fillStyle = '#000000'
    ctx.font = '16px Poppins'
    ctx.textAlign = 'left'
    ctx.fillText(`Step ${currentStep} of ${totalSteps}`, 20, height - 20)
  }, [nodes, edges, activeEdge, currentStep, totalSteps])

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={400}
      className="border border-palette-light-gray rounded-lg bg-bg-primary w-full"
    />
  )
}
