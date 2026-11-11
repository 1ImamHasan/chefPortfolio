import { useEffect, useState, useRef } from 'react'

export default function CustomCursor() {
  const [enabled] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches
  })
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [visible, setVisible] = useState(false)

  const cursorRef = useRef(null)
  const trailRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const trailPos = useRef({ x: -100, y: -100 })

  useEffect(() => {
    if (!enabled) return

    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      setVisible(true)
    }

    const onMouseDown = () => setClicked(true)
    const onMouseUp = () => setClicked(false)
    const onMouseLeave = () => setVisible(false)
    const onMouseEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.documentElement.addEventListener('mouseleave', onMouseLeave)
    document.documentElement.addEventListener('mouseenter', onMouseEnter)

    // Check for hoverable elements dynamically
    const onOver = (e) => {
      const target = e.target.closest('a, button, input, textarea, select, [role="button"], [data-cursor-hover]')
      setHovered(!!target)
    }

    document.addEventListener('mouseover', onOver, { passive: true })

    // Smooth animation loop using requestAnimationFrame
    let rafId
    const loop = () => {
      // Direct position for the primary knife cursor
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      }

      // Smooth trailing interpolation for the glowing accent dot (lerp: 0.2)
      trailPos.current.x += (pos.current.x - trailPos.current.x) * 0.2
      trailPos.current.y += (pos.current.y - trailPos.current.y) * 0.2

      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0)`
      }

      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      document.documentElement.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(rafId)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Primary Chef Knife Icon */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none transition-transform duration-150 ease-out will-change-transform ${
          hovered ? 'scale-125' : clicked ? 'scale-90' : 'scale-100'
        }`}
        style={{ marginTop: '-4px', marginLeft: '-4px' }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_8px_rgba(217,119,6,0.5)] transform -rotate-45"
        >
          {/* Chef Knife Blade */}
          <path
            d="M3 3C10 3 17 6.5 20.5 13L16 15L3 5.5V3Z"
            fill="url(#goldGradient)"
            stroke="#b45309"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
          {/* Knife Handle */}
          <path
            d="M16 15L20 19C20.8 19.8 21.2 20.5 20.5 21.2C19.8 21.9 19.1 21.5 18.3 20.7L14.3 16.7L16 15Z"
            fill="#262626"
            stroke="#d97706"
            strokeWidth="0.6"
          />
          {/* Handle rivets */}
          <circle cx="17.2" cy="17.2" r="0.6" fill="#d97706" />
          <circle cx="19.2" cy="19.2" r="0.6" fill="#d97706" />

          <defs>
            <linearGradient id="goldGradient" x1="3" y1="3" x2="20.5" y2="15" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F59E0B" />
              <stop offset="0.6" stopColor="#D97706" />
              <stop offset="1" stopColor="#B45309" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Trailing Gold Pulse Dot */}
      <div
        ref={trailRef}
        className={`fixed top-0 left-0 pointer-events-none rounded-full transition-all duration-200 will-change-transform ${
          hovered
            ? 'w-7 h-7 -mt-3.5 -ml-3.5 bg-brand-gold/20 border border-brand-gold/60 backdrop-blur-[1px]'
            : 'w-2 h-2 -mt-1 -ml-1 bg-brand-gold shadow-[0_0_10px_#d97706]'
        }`}
      />
    </div>
  )
}
