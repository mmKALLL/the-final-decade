import { useState } from 'preact/hooks'
import { JSX } from 'preact'

interface InfoTooltipProps {
  children: JSX.Element | JSX.Element[]
  position?: 'top' | 'right' | 'bottom' | 'left'
  width?: number
}

export function InfoTooltip({ children, position = 'right', width = 260 }: InfoTooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  const getPositionStyle = () => {
    switch (position) {
      case 'top':
        return { bottom: '100%', right: 0 }
      case 'left':
        return { top: '0', right: '100%' }
      case 'bottom':
        return { top: '100%', right: 0 }
      case 'right':
      default:
        return { top: '0', left: '100%' }
    }
  }

  return (
    <div className="info-tooltip-container">
      <div
        className="stat-info-icon"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
      >
        ⓘ
        {showTooltip && (
          <div className="stat-tooltip" style={{ ...getPositionStyle(), width: `${width}px` }}>
            {children}
          </div>
        )}
      </div>
    </div>
  )
}
