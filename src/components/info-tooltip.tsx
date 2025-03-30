import { useState } from 'preact/hooks'
import { JSX } from 'preact'

interface InfoTooltipProps {
  children: JSX.Element | JSX.Element[]
  width?: number
}

export function InfoTooltip({ children, width = 260 }: InfoTooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <span className="info-tooltip" style={{ display: 'inline-block', float: 'right' }}>
      <div className="info-tooltip-container">
        <div
          className="stat-info-icon"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={() => setShowTooltip(!showTooltip)}
        >
          ⓘ
          {showTooltip && (
            <div className="info-tooltip-content" style={{ top: '0', right: '100%', width: `${width}px` }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </span>
  )
}
