import React, { useState } from 'react';
import './App.css';
import Board from './Components/Board';

function Game() {
    const [historyState, changeHistory] = useState({
        history: [ { squares: Array(9).fill(null) } ],
        stepNumber: 0,
        xIsNext: true
    });

    const handleClick = (i) => {
        const history = historyState.history.slice(0, historyState.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = historyState.xIsNext ? "X" : "O";
        changeHistory({ history: history.concat([
            {
              squares,
            }
          ]), stepNumber: history.length, xIsNext: !historyState.xIsNext });
    };
    const jumpTo = (step) => {
        changeHistory({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    };
    const moves = historyState.history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });
    const current = historyState.history[historyState.stepNumber];
    debugger

    const winner = calculateWinner(current);
    let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + (historyState.xIsNext ? "X" : "O");
        }
    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={i => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

// ========================================

export default Game;

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
