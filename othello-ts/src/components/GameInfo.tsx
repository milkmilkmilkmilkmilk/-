import React from 'react';

interface GameInfoProps {
  currentPlayer: 'black' | 'white';
  score: { black: number; white: number };
  gameOver: boolean;
  onReset: () => void;
}

export const GameInfo: React.FC<GameInfoProps> = ({
  currentPlayer,
  score,
  gameOver,
  onReset,
}) => {
  const getWinner = () => {
    if (score.black > score.white) return '黒';
    if (score.white > score.black) return '白';
    return '引き分け';
  };

  return (
    <div className="game-info">
      <div className="score-board">
        <div className="score-item">
          <div className="stone black" />
          <span>黒: {score.black}</span>
        </div>
        <div className="score-item">
          <div className="stone white" />
          <span>白: {score.white}</span>
        </div>
      </div>
      
      <div className="current-player">
        {gameOver ? (
          <div className="game-over">
            <h3>ゲーム終了</h3>
            <p>勝者: {getWinner()}</p>
          </div>
        ) : (
          <div className="player-turn">
            <h3>現在のプレイヤー</h3>
            <div className="current-stone">
              <div className={`stone ${currentPlayer}`} />
              <span>{currentPlayer === 'black' ? '黒' : '白'}</span>
            </div>
          </div>
        )}
      </div>
      
      <button className="reset-button" onClick={onReset}>
        ゲームをリセット
      </button>
    </div>
  );
}; 