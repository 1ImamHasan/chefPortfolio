import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    // Hide on mobile
    if (window.matchMedia('(hover: none)').matches) return

    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }
    }

    const growCursor = () => cursorRef.current?.classList.add('scale-150')
    const shrinkCursor = () => cursorRef.current?.classList.remove('scale-150')

    window.addEventListener('mousemove', moveCursor)
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', growCursor)
      el.addEventListener('mouseleave', shrinkCursor)
    })

    // Hide default cursor
    document.body.style.cursor = 'none'

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.body.style.cursor = 'auto'
    }
  }, [])

  return (
    <>
      {/* Knife icon cursor */}
      <div
        ref={cursorRef}
        className="fixed z-[999] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-200"
        style={{ left: '-100px', top: '-100px' }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="rotate-45">
          <path d="M6 2L18 14H14L6 22V2Z" fill="#d97706" stroke="#d97706" strokeWidth="1" strokeLinejoin="round"/>
          <rect x="14" y="13" width="6" height="3" rx="1" fill="#9ca3af" transform="rotate(45 14 13)"/>
        </svg>
      </div>
      {/* Dot follower */}
      <div
        ref={dotRef}
        className="fixed z-[998] pointer-events-none w-1.5 h-1.5 bg-brand-gold rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
        style={{ left: '-100px', top: '-100px' }}
      ></div>
    </>
  )
}
