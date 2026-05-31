'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useResponsiveCanvas } from '@/lib/canvasUtils'

export interface GraphNode {
  id: string
  name: string
  risk: number
  x: number
  y: number
}

interface Edge {
  from: string
  to: string
  amount: number
}

interface GraphCanvasProps {
  nodes: GraphNode[]
  edges: Edge[]
  selectedNode: string | null
  onNodeClick: (nodeId: string) => void
  onNodesChange?: (nodes: GraphNode[]) => void
}

const DESIGN_WIDTH = 800
const DESIGN_HEIGHT = 500
const ZOOM_MIN = 0.4
const ZOOM_MAX = 3

type DragMode =
  | { type: 'none' }
  | { type: 'pan'; startX: number; startY: number; startPanX: number; startPanY: number }
  | {
      type: 'node'
      nodeId: string
      startDesignX: number
      startDesignY: number
      nodeStartX: number
      nodeStartY: number
    }

function getRiskColor(risk: number) {
  if (risk >= 85) return '#C00000'
  if (risk >= 70) return '#BD3D41'
  return '#006C95'
}

function getCanvasBg() {
  if (typeof window === 'undefined') return '#FFFFFF'
  return getComputedStyle(document.documentElement).getPropertyValue('--color-bg-primary').trim() || '#FFFFFF'
}

function screenToDesign(
  cssX: number,
  cssY: number,
  panX: number,
  panY: number,
  zoom: number,
  scaleX: number,
  scaleY: number,
) {
  return {
    x: (cssX - panX) / (zoom * scaleX),
    y: (cssY - panY) / (zoom * scaleY),
  }
}

export default function GraphCanvas({
  nodes,
  edges,
  selectedNode,
  onNodeClick,
  onNodesChange,
}: GraphCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scaleX, scaleY } = useResponsiveCanvas(canvasRef, DESIGN_WIDTH, DESIGN_HEIGHT)
  const [viewport, setViewport] = useState({ panX: 0, panY: 0, zoom: 1 })
  const [dragMode, setDragMode] = useState<DragMode>({ type: 'none' })
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [localNodes, setLocalNodes] = useState(nodes)

  useEffect(() => {
    setLocalNodes(nodes)
  }, [nodes])

  const findNodeAt = useCallback(
    (designX: number, designY: number) => {
      let closestNode: string | null = null
      let minDistance = Infinity
      const hitRadius = 35

      for (const node of localNodes) {
        const distance = Math.hypot(designX - node.x, designY - node.y)
        if (distance <= hitRadius && distance < minDistance) {
          minDistance = distance
          closestNode = node.id
        }
      }

      return closestNode
    },
    [localNodes],
  )

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const width = canvas.width / dpr
    const height = canvas.height / dpr
    const { panX, panY, zoom } = viewport

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.fillStyle = getCanvasBg()
    ctx.fillRect(0, 0, width, height)

    ctx.save()
    ctx.translate(panX, panY)
    ctx.scale(zoom * scaleX, zoom * scaleY)

    ctx.strokeStyle = '#E0E0E0'
    ctx.lineWidth = 2 / zoom
    edges.forEach((edge) => {
      const fromNode = localNodes.find((n) => n.id === edge.from)
      const toNode = localNodes.find((n) => n.id === edge.to)
      if (!fromNode || !toNode) return

      ctx.beginPath()
      ctx.moveTo(fromNode.x, fromNode.y)
      ctx.lineTo(toNode.x, toNode.y)
      ctx.stroke()

      const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x)
      const arrowSize = 10 / zoom
      ctx.fillStyle = '#999999'
      ctx.beginPath()
      ctx.moveTo(toNode.x, toNode.y)
      ctx.lineTo(
        toNode.x - arrowSize * Math.cos(angle - Math.PI / 6),
        toNode.y - arrowSize * Math.sin(angle - Math.PI / 6),
      )
      ctx.lineTo(
        toNode.x - arrowSize * Math.cos(angle + Math.PI / 6),
        toNode.y - arrowSize * Math.sin(angle + Math.PI / 6),
      )
      ctx.closePath()
      ctx.fill()
    })

    localNodes.forEach((node) => {
      const isSelected = selectedNode === node.id
      const isHovered = hoveredNode === node.id
      const radius = isSelected || isHovered ? 35 : 28

      ctx.fillStyle = getRiskColor(node.risk)
      ctx.beginPath()
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
      ctx.fill()

      if (isSelected) {
        ctx.strokeStyle = '#000000'
        ctx.lineWidth = 3 / zoom
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius + 5, 0, Math.PI * 2)
        ctx.stroke()
      }

      ctx.fillStyle = '#FFFFFF'
      ctx.font = `bold ${12 / zoom}px Poppins`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(node.id, node.x, node.y)
    })

    ctx.restore()
  }, [localNodes, edges, selectedNode, hoveredNode, viewport, scaleX, scaleY])

  useEffect(() => {
    draw()
  }, [draw])

  useEffect(() => {
    const observer = new MutationObserver(draw)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [draw])

  const getPointer = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const cssX = clientX - rect.left
    const cssY = clientY - rect.top
    const design = screenToDesign(cssX, cssY, viewport.panX, viewport.panY, viewport.zoom, scaleX, scaleY)
    return { cssX, cssY, ...design }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const rect = canvas.getBoundingClientRect()
      const cssX = e.clientX - rect.left
      const cssY = e.clientY - rect.top
      const delta = e.deltaY > 0 ? 0.9 : 1.1

      setViewport((prev) => {
        const nextZoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, prev.zoom * delta))
        const ratio = nextZoom / prev.zoom
        return {
          zoom: nextZoom,
          panX: cssX - ratio * (cssX - prev.panX),
          panY: cssY - ratio * (cssY - prev.panY),
        }
      })
    }

    canvas.addEventListener('wheel', onWheel, { passive: false })
    return () => canvas.removeEventListener('wheel', onWheel)
  }, [])

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x: designX, y: designY } = getPointer(e.clientX, e.clientY)
    const hit = findNodeAt(designX, designY)

    if (hit) {
      const node = localNodes.find((n) => n.id === hit)!
      setDragMode({
        type: 'node',
        nodeId: hit,
        startDesignX: designX,
        startDesignY: designY,
        nodeStartX: node.x,
        nodeStartY: node.y,
      })
      onNodeClick(hit)
      return
    }

    setDragMode({
      type: 'pan',
      startX: e.clientX,
      startY: e.clientY,
      startPanX: viewport.panX,
      startPanY: viewport.panY,
    })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const { x: designX, y: designY } = getPointer(e.clientX, e.clientY)

    if (dragMode.type === 'pan') {
      setViewport((prev) => ({
        ...prev,
        panX: dragMode.startPanX + (e.clientX - dragMode.startX),
        panY: dragMode.startPanY + (e.clientY - dragMode.startY),
      }))
      canvas.style.cursor = 'grabbing'
      return
    }

    if (dragMode.type === 'node') {
      const dx = designX - dragMode.startDesignX
      const dy = designY - dragMode.startDesignY
      setLocalNodes((prev) =>
        prev.map((n) =>
          n.id === dragMode.nodeId
            ? { ...n, x: dragMode.nodeStartX + dx, y: dragMode.nodeStartY + dy }
            : n,
        ),
      )
      canvas.style.cursor = 'grabbing'
      return
    }

    const hit = findNodeAt(designX, designY)
    setHoveredNode(hit)
    canvas.style.cursor = hit ? 'grab' : 'grab'
  }

  const handleMouseUp = () => {
    if (dragMode.type === 'node') {
      setLocalNodes((prev) => {
        onNodesChange?.(prev)
        return prev
      })
    }
    setDragMode({ type: 'none' })
    const canvas = canvasRef.current
    if (canvas) canvas.style.cursor = 'grab'
  }

  const resetView = () => setViewport({ panX: 0, panY: 0, zoom: 1 })

  return (
    <div ref={containerRef} className="relative w-full min-w-0">
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          setHoveredNode(null)
          if (dragMode.type !== 'none') handleMouseUp()
        }}
        className="border border-palette-light-gray rounded-lg bg-bg-primary w-full touch-none cursor-grab"
      />
      <div className="absolute bottom-2 left-2 flex flex-wrap gap-2 pointer-events-none">
        <span className="text-size3 text-text-text5 bg-bg-primary/90 border border-palette-light-gray rounded px-2 py-1">
          Scroll to zoom · Drag to pan · Drag nodes to move
        </span>
      </div>
      <button
        type="button"
        onClick={resetView}
        className="absolute top-2 right-2 p-2 rounded-lg bg-bg-primary border border-palette-light-gray text-text-text5 hover:text-text-primary hover:bg-bg-secondary transition-colors"
        title="Reset view"
        aria-label="Reset view"
      >
        <i className="ti ti-arrows-maximize text-size6"></i>
      </button>
    </div>
  )
}
