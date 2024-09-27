import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

//export default App;
//import React, { useState } from 'react';

function App() {
  return (
      <div className="game">
          <div className="game-board">
              <Board />
          </div>
      </div>
  );
}

const rowStyle = {
    display: 'flex',
};

const squareStyle = {
    width: '60px',
    height: '60px',
    backgroundColor: '#ddd',
    margin: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
    color: 'black', // Change to black for better visibility
};

const boardStyle = {
    backgroundColor: '#eee',
    width: '208px',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    border: '3px #eee solid',
};

const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
};

const instructionsStyle = {
    marginTop: '5px',
    marginBottom: '5px',
    fontWeight: 'bold',
    fontSize: '16px',
};

const buttonStyle = {
    marginTop: '15px',
    marginBottom: '16px',
    width: '80px',
    height: '40px',
    backgroundColor: '#8acaca',
    color: 'white',
    fontSize: '16px',
};

function Square({ value, onClick }) {
    return (
        <div className="square" style={squareStyle} onClick={onClick}>
            {value}
        </div>
    );
}

function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const winner = calculateWinner(squares);

    const handleClick = (index) => {
        if (squares[index] || winner) return; // Prevent overriding moves or playing after win

        const newSquares = squares.slice();
        newSquares[index] = xIsNext ? 'X' : 'O';
        setSquares(newSquares);
        setXIsNext(!xIsNext);
    };

    const resetGame = () => {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
    };

    const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

    return (
        <div style={containerStyle} className="gameBoard">
            <div id="statusArea" className="status" style={instructionsStyle}>{status}</div>
            <button style={buttonStyle} onClick={resetGame}>Reset</button>
            <div style={boardStyle}>
                {[0, 1, 2].map((row) => (
                    <div className="board-row" style={rowStyle} key={row}>
                        {[0, 1, 2].map((col) => (
                            <Square
                                key={col}
                                value={squares[row * 3 + col]}
                                onClick={() => handleClick(row * 3 + col)}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}



export default App;

