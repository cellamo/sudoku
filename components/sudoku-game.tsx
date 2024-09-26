'use client'

import { useState, useEffect } from 'react'
import SudokuGrid from '@/components/sudoku-grid'
import ControlPanel from '@/components/control-panel'
import { solveSudoku, solveCell, isValidMove, findNextMove } from '@/lib/sudoku-solver'

export default function Home() {
  const [board, setBoard] = useState<number[][]>(Array(9).fill(null).map(() => Array(9).fill(0)))
  const [starterCells, setStarterCells] = useState<boolean[][]>(Array(9).fill(null).map(() => Array(9).fill(false)))
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null)
  const [invalidCells, setInvalidCells] = useState<[number, number][]>([])
  const [animatedCell, setAnimatedCell] = useState<[number, number] | null>(null)
  const [isLocked, setIsLocked] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setInvalidCells([])
    }, 2000)

    return () => clearTimeout(timer)
  }, [invalidCells])

  const handleCellChange = (row: number, col: number, value: number) => {
    const newBoard = [...board]
    if (value === 0 || isValidMove(newBoard, row, col, value)) {
      newBoard[row][col] = value
      setBoard(newBoard)
      setInvalidCells([])
    } else {
      setInvalidCells(prev => [...prev, [row, col]])
    }
  }

  const handleCellSelect = (row: number, col: number) => {
    setSelectedCell([row, col])
  }

  const handleSolveCell = () => {
    if (selectedCell) {
      const [row, col] = selectedCell
      const solution = solveCell(board, row, col)
      if (solution !== null) {
        handleCellChange(row, col, solution)
      }
    }
  }

  const handleSolveAll = () => {
    const solution = solveSudoku([...board])
    if (solution) {
      setBoard(solution)
      setInvalidCells([])
    } else {
      console.error("Puzzle is unsolvable")
      setInvalidCells(board.flatMap((row, i) => row.map((_, j) => [i, j] as [number, number])))
    }
  }

  const handleReset = () => {
    setBoard(prevBoard => prevBoard.map((row, i) => row.map((cell, j) => isLocked && starterCells[i][j] ? cell : 0)))
    setSelectedCell(null)
    setInvalidCells([])
  }

  const handleShowNextMove = () => {
    const nextMove = findNextMove(board)
    if (nextMove) {
      const [row, col, value] = nextMove
      setAnimatedCell([row, col])
      setTimeout(() => {
        handleCellChange(row, col, value)
        setAnimatedCell(null)
      }, 1000)
    }
  }

  const handleToggleLockStarterCells = () => {
    if (isLocked) {
      // Unlock: Reset all starter cells
      setStarterCells(Array(9).fill(null).map(() => Array(9).fill(false)))
    } else {
      // Lock: Set starter cells based on current non-zero values
      setStarterCells(board.map(row => row.map(cell => cell !== 0)))
    }
    setIsLocked(!isLocked)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Sudoku Çözücü</h1>
      <div className="flex flex-col items-center gap-8">
        <SudokuGrid 
          board={board} 
          starterCells={starterCells}
          onCellChange={handleCellChange} 
          onCellSelect={handleCellSelect}
          selectedCell={selectedCell}
          invalidCells={invalidCells}
          animatedCell={animatedCell}
        />
        <ControlPanel 
          onSolveCell={handleSolveCell} 
          onSolveAll={handleSolveAll} 
          onReset={handleReset} 
          onShowNextMove={handleShowNextMove}
          onToggleLockStarterCells={handleToggleLockStarterCells}
          isCellSelected={!!selectedCell}
          isLocked={isLocked}
        />
      </div>
    </div>
  )
}
