import { useOthello } from './hooks/useOthello';
import { OthelloBoard } from './components/OthelloBoard';
import { GameInfo } from './components/GameInfo';
import './App.css';

function App() {
  const {
    board,
    currentPlayer,
    gameOver,
    validMoves,
    placeStone,
    resetGame,
    getScore,
  } = useOthello();

  const handleCellClick = (row: number, col: number) => {
    placeStone(row, col);
  };

  return (
    <div className="app">
      <div className="othello-game">
        <h1>オセロゲーム</h1>
        <div className="game-container">
          <OthelloBoard
            board={board}
            validMoves={validMoves}
            onCellClick={handleCellClick}
          />
          <GameInfo
            currentPlayer={currentPlayer}
            score={getScore()}
            gameOver={gameOver}
            onReset={resetGame}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
