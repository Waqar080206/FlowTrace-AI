'use client'

import { useEffect, useRef, useState } from 'react'

interface Node {
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
  nodes: Node[]
  edges: Edge[]
  selectedNode: string | null
  onNodeClick: (nodeId: string) => void
}

export default function GraphCanvas({ nodes, edges, selectedNode, onNodeClick }: GraphCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const getRiskColor = (risk: number) => {
    if (risk >= 85) return '#C00000' // palette-red
    if (risk >= 70) return '#BD3D41' // secondary
    return '#006C95' // text3
  }

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

    // Draw edges
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

        // Draw arrow
        const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x)
        const arrowSize = 10
        ctx.fillStyle = '#999999'
        ctx.beginPath()
        ctx.moveTo(toNode.x, toNode.y)
        ctx.lineTo(toNode.x - arrowSize * Math.cos(angle - Math.PI / 6), toNode.y - arrowSize * Math.sin(angle - Math.PI / 6))
        ctx.lineTo(toNode.x - arrowSize * Math.cos(angle + Math.PI / 6), toNode.y - arrowSize * Math.sin(angle + Math.PI / 6))
        ctx.closePath()
        ctx.fill()
      }
    })

    // Draw nodes
    nodes.forEach((node) => {
      const radius = selectedNode === node.id || hoveredNode === node.id ? 35 : 28
      ctx.fillStyle = getRiskColor(node.risk)
      ctx.beginPath()
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
      ctx.fill()

      if (selectedNode === node.id) {
        ctx.strokeStyle = '#000000'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius + 5, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Draw account ID text
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 12px Poppins'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(node.id, node.x, node.y)
    })
  }, [nodes, edges, selectedNode, hoveredNode])

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    let closestNode = null
    let minDistance = Infinity

    for (const node of nodes) {
      const distance = Math.sqrt(Math.pow(x - node.x, 2) + Math.pow(y - node.y, 2))
      if (distance <= 35 && distance < minDistance) {
        minDistance = distance
        closestNode = node.id
      }
    }

    if (closestNode) {
      onNodeClick(closestNode)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    let closestNode = null
    let minDistance = Infinity

    for (const node of nodes) {
      const distance = Math.sqrt(Math.pow(x - node.x, 2) + Math.pow(y - node.y, 2))
      if (distance <= 35 && distance < minDistance) {
        minDistance = distance
        closestNode = node.id
      }
    }

    setHoveredNode(closestNode)
    canvas.style.cursor = closestNode ? 'pointer' : 'default'
  }

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={500}
      onMouseDown={handleCanvasMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredNode(null)}
      className="border border-palette-light-gray rounded-lg bg-bg-primary cursor-default w-full"
    />
  )
}
