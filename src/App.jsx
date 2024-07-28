import { useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [onXNext, setOnXBoard] = useState(true)
  const WINNING_PATTERNS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ]
  const [winmessage, setWinMessage] = useState("")
  const hasWon = (board) => {
    for (let index = 0; index < WINNING_PATTERNS.length; index++) {
      const [a, b, c] = WINNING_PATTERNS[index];
      if (board[a] && board[a] == board[b] && board[b] == board[c] && board[a] == board[c]) {
        return true
      }
    }
    return false
  }
  const onHandleBoard = (index) => {
    if (winmessage || board[index]) {
      return
    }
    const newBoard = [...board]
    newBoard[index] = onXNext == true ? "X" : "O"
    setOnXBoard(!onXNext)
    setBoard(newBoard)
    if((newBoard.filter(b=>b).length == 9)){
      setWinMessage(`Draw`)
    }
    if (hasWon(newBoard)) {
      setWinMessage(`Player ${newBoard[index]} won`)
    }
  }
  return (
    <div className='game'>
     <div> Player Turn : {onXNext == true ?"X" : "O"} </div>
     <div>  Status: {winmessage} </div>
      <div className='board'> 
        {board.map((b, index) => {
          return (
            <button onClick={() => onHandleBoard(index)} className='cell'>
              {b}
            </button>
          )
        })}
      </div>
    </div>
  );
}

export default App;
