'use client'

import { useEffect, useState, type RefObject } from 'react'

export interface CanvasDimensions {
  width: number
  height: number
  scaleX: number
  scaleY: number
}

export function useResponsiveCanvas(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  designWidth = 800,
  designHeight = 500,
): CanvasDimensions {
  const [dimensions, setDimensions] = useState<CanvasDimensions>({
    width: designWidth,
    height: designHeight,
    scaleX: 1,
    scaleY: 1,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const updateSize = () => {
      const parent = canvas.parentElement
      if (!parent) return

      const width = Math.max(parent.clientWidth, 280)
      const height = Math.round(width * (designHeight / designWidth))
      const dpr = window.devicePixelRatio || 1

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      const ctx = canvas.getContext('2d')
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      setDimensions({
        width,
        height,
        scaleX: width / designWidth,
        scaleY: height / designHeight,
      })
    }

    updateSize()

    const observer = new ResizeObserver(updateSize)
    const parent = canvas.parentElement
    if (parent) observer.observe(parent)

    return () => observer.disconnect()
  }, [canvasRef, designWidth, designHeight])

  return dimensions
}

export function scaleCoord(value: number, scale: number) {
  return value * scale
}

export function getCanvasPointer(
  event: React.MouseEvent<HTMLCanvasElement>,
  canvas: HTMLCanvasElement,
) {
  const rect = canvas.getBoundingClientRect()
  const scaleX = canvas.width / rect.width
  const scaleY = canvas.height / rect.height

  return {
    x: (event.clientX - rect.left) * (scaleX / (window.devicePixelRatio || 1)),
    y: (event.clientY - rect.top) * (scaleY / (window.devicePixelRatio || 1)),
  }
}
