import React from 'react'

export interface SudokuGridProps {
  board: number[][]
  onCellChange: (row: number, col: number, value: number) => void
  onCellSelect: (row: number, col: number) => void
  selectedCell: [number, number] | null
  invalidCells: [number, number][]
}

export function SudokuGrid({ board, onCellChange, onCellSelect, selectedCell, invalidCells }: SudokuGridProps) {
  const handleInputChange = (row: number, col: number, value: string) => {
    const numValue = parseInt(value)
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 9) {
      onCellChange(row, col, numValue)
    } else if (value === '') {
      onCellChange(row, col, 0)
    }
  }

  return (
    <div className="grid grid-cols-9 gap-1 bg-gray-200 p-2 rounded-lg">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`${
              (Math.floor(rowIndex / 3) + Math.floor(colIndex / 3)) % 2 === 0
                ? 'bg-white'
                : 'bg-gray-100'
            } ${
              colIndex % 3 === 2 && colIndex !== 8 ? 'border-r-2 border-gray-400' : ''
            } ${
              rowIndex % 3 === 2 && rowIndex !== 8 ? 'border-b-2 border-gray-400' : ''
            } ${selectedCell && selectedCell[0] === rowIndex && selectedCell[1] === colIndex ? 'bg-blue-100' : 'bg-white'}
            ${invalidCells.some(([r, c]) => r === rowIndex && c === colIndex) ? 'animate-shake bg-red-100' : ''}
            ${(rowIndex + 1) % 3 === 0 && rowIndex !== 8 ? 'border-b-2 border-b-gray-500' : ''}
            ${(colIndex + 1) % 3 === 0 && colIndex !== 8 ? 'border-r-2 border-r-gray-500' : ''}
          `}
          >
            <input
              type="text"
              inputMode="numeric"
              pattern="[1-9]"
              maxLength={1}
              value={cell || ''}
              onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
              onClick={() => onCellSelect(rowIndex, colIndex)}
              className="w-8 h-8 text-center border focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        ))
      )}
    </div>
  )
}

export default SudokuGrid
