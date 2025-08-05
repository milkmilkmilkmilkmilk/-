import React from 'react';

type CellState = 'black' | 'white' | null;

interface Position {
  row: number;
  col: number;
}

interface OthelloBoardProps {
  board: CellState[][];
  validMoves: Position[];
  onCellClick: (row: number, col: number) => void;
}

export const OthelloBoard: React.FC<OthelloBoardProps> = ({
  board,
  validMoves,
  onCellClick,
}) => {
  const isValidMove = (row: number, col: number) => {
    return validMoves.some(move => move.row === row && move.col === col);
  };

  return (
    <div className="othello-board">
      <div className="board-grid">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`board-cell ${isValidMove(rowIndex, colIndex) ? 'valid-move' : ''}`}
                onClick={() => onCellClick(rowIndex, colIndex)}
              >
                {cell && (
                  <div className={`stone ${cell}`} />
                )}
                {isValidMove(rowIndex, colIndex) && (
                  <div className="valid-move-indicator" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}; 