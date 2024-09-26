import React from 'react'
import { Button } from './ui/button'

interface ControlPanelProps {
  onSolveCell: () => void
  onSolveAll: () => void
  onReset: () => void
  onShowNextMove: () => void
  onToggleLockStarterCells: () => void
  isCellSelected: boolean
  isLocked: boolean
}

export function ControlPanel({ 
  onSolveCell, 
  onSolveAll, 
  onReset, 
  onShowNextMove, 
  onToggleLockStarterCells, 
  isCellSelected, 
  isLocked 
}: ControlPanelProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <Button onClick={onSolveCell} disabled={!isCellSelected}>Seçili Kareyi Çöz</Button>
      <Button onClick={onSolveAll}>Tümünü Çöz</Button>
      <Button onClick={onShowNextMove}>Sonraki Hamleyi Göster</Button>
      <Button onClick={onReset} variant="outline">Sıfırla</Button>
      <Button onClick={onToggleLockStarterCells} variant="secondary">
        {isLocked ? 'Başlangıç Hücrelerini Aç' : 'Başlangıç Hücrelerini Kilitle'}
      </Button>
    </div>
  )
}

export default ControlPanel
