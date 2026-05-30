'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useResponsiveCanvas } from '@/lib/canvasUtils'

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

const DESIGN_WIDTH = 800
const DESIGN_HEIGHT = 400

function getCanvasBg() {
  if (typeof window === 'undefined') return '#FFFFFF'
  return getComputedStyle(document.documentElement).getPropertyValue('--color-bg-primary').trim() || '#FFFFFF'
}

export default function ReplayCanvas({
  nodes,
  edges,
  activeEdge,
  currentStep,
  totalSteps,
}: ReplayCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { scaleX, scaleY } = useResponsiveCanvas(canvasRef, DESIGN_WIDTH, DESIGN_HEIGHT)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const width = canvas.width / dpr
    const height = canvas.height / dpr
    const nodeScale = Math.min(scaleX, scaleY)

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.fillStyle = getCanvasBg()
    ctx.fillRect(0, 0, width, height)

    ctx.save()
    ctx.scale(scaleX, scaleY)

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

    nodes.forEach((node) => {
      const isActive = activeEdge && (activeEdge.from === node.id || activeEdge.to === node.id)
      const radius = 28

      ctx.fillStyle = isActive ? '#C00000' : '#CCCCCC'
      ctx.beginPath()
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = isActive ? '#8B0000' : '#999999'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
      ctx.stroke()

      ctx.fillStyle = '#FFFFFF'
      ctx.font = `bold ${Math.max(10, 12 / nodeScale)}px Poppins`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(node.id, node.x, node.y)
    })

    ctx.restore()

    ctx.fillStyle =
      getComputedStyle(document.documentElement).getPropertyValue('--color-text-primary').trim() || '#000000'
    ctx.font = `${Math.max(12, 16 * nodeScale)}px Poppins`
    ctx.textAlign = 'left'
    ctx.fillText(`Step ${currentStep} of ${totalSteps}`, 20 * scaleX, height - 20 * scaleY)
  }, [nodes, edges, activeEdge, currentStep, totalSteps, scaleX, scaleY])

  useEffect(() => {
    draw()
  }, [draw])

  useEffect(() => {
    const observer = new MutationObserver(draw)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [draw])

  return (
    <div className="w-full min-w-0">
      <canvas
        ref={canvasRef}
        className="border border-palette-light-gray rounded-lg bg-bg-primary w-full touch-none"
      />
    </div>
  )
}
