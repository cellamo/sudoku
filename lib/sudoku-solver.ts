function isValid(board: number[][], row: number, col: number, num: number): boolean {
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) return false
      if (board[x][col] === num) return false
      if (board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] === num) return false
    }
    return true
  }
  
  function findEmptyCell(board: number[][]): [number, number] | null {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) return [row, col]
      }
    }
    return null
  }

  export function isValidMove(board: number[][], row: number, col: number, num: number): boolean {
    return isValid(board, row, col, num);
  }
  
  export function solveSudoku(board: number[][]): number[][] | null {
    const emptyCell = findEmptyCell(board)
    if (!emptyCell) return board // puzzle is solved
  
    const [row, col] = emptyCell
  
    for (let num = 1; num <= 9; num++) {
      if (isValid(board, row, col, num)) {
        board[row][col] = num
        const result = solveSudoku(board)
        if (result) return result
        board[row][col] = 0 // backtrack
      }
    }
  
    return null // no solution exists
  }
  
  export function solveCell(board: number[][], row: number, col: number): number | null {
    if (board[row][col] !== 0) return null // cell is already filled
  
    for (let num = 1; num <= 9; num++) {
      if (isValid(board, row, col, num)) {
        const tempBoard = board.map(row => [...row])
        tempBoard[row][col] = num
        if (solveSudoku(tempBoard)) return num
      }
    }
  
    return null // no valid solution for this cell
  }
  