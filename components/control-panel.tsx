import React from 'react'
import { Button } from './ui/button'

interface ControlPanelProps {
  onSolveCell: () => void
  onSolveAll: () => void
  onReset: () => void
  isCellSelected: boolean
}

export function ControlPanel({ onSolveCell, onSolveAll, onReset, isCellSelected }: ControlPanelProps) {
  return (
    <div className="flex gap-4">
      <Button onClick={onSolveCell} disabled={!isCellSelected}>Bir Kareyi Çöz</Button>
      <Button onClick={onSolveAll}>Tümünü Çöz</Button>
      <Button onClick={onReset} variant="outline">Sıfırla</Button>
    </div>
  )
}

export default ControlPanel
