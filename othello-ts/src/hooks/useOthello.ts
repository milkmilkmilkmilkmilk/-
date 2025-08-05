import { useState, useCallback } from 'react';

type CellState = 'black' | 'white' | null;
type Player = 'black' | 'white';

interface Position {
  row: number;
  col: number;
}

export const useOthello = () => {
  const [board, setBoard] = useState<CellState[][]>(() => {
    const initialBoard: CellState[][] = Array(8).fill(null).map(() => Array(8).fill(null));
    // 初期配置
    if (initialBoard[3] && initialBoard[4]) {
      initialBoard[3][3] = 'white';
      initialBoard[3][4] = 'black';
      initialBoard[4][3] = 'black';
      initialBoard[4][4] = 'white';
    }
    return initialBoard;
  });

  const [currentPlayer, setCurrentPlayer] = useState<Player>('black');
  const [gameOver, setGameOver] = useState(false);

  // 特定の方向に石を置けるかチェック
  const checkDirection = useCallback((row: number, col: number, dr: number, dc: number, player: Player): boolean => {
    const opponent = player === 'black' ? 'white' : 'black';
    let r = row + dr;
    let c = col + dc;
    let hasOpponent = false;
    
    // 隣接するマスが相手の石かチェック
    if (r < 0 || r >= 8 || c < 0 || c >= 8 || !board[r] || board[r][c] !== opponent) {
      return false;
    }
    
    hasOpponent = true;
    r += dr;
    c += dc;
    
    // その方向に自分の石があるかチェック
    while (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r] && board[r][c] !== null) {
      if (board[r][c] === null) return false;
      if (board[r][c] === player) return hasOpponent;
      r += dr;
      c += dc;
    }
    
    return false;
  }, [board]);

  // 石を置けるかチェック
  const canPlaceStone = useCallback((row: number, col: number, player: Player): boolean => {
    if (!board[row] || board[row][col] !== null) return false;
    
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];
    
    return directions.some(([dr, dc]) => {
      return checkDirection(row, col, dr, dc, player);
    });
  }, [board, checkDirection]);

  // 有効な手を取得
  const getValidMoves = useCallback((player: Player): Position[] => {
    const validMoves: Position[] = [];
    
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (board[row] && board[row][col] === null && canPlaceStone(row, col, player)) {
          validMoves.push({ row, col });
        }
      }
    }
    
    return validMoves;
  }, [board, canPlaceStone]);

  // 石を置く
  const placeStone = useCallback((row: number, col: number) => {
    if (gameOver || !board[row] || board[row][col] !== null || !canPlaceStone(row, col, currentPlayer)) {
      return false;
    }

    const newBoard = board.map(row => [...row]);
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];

    // 石を置く
    if (newBoard[row]) {
      newBoard[row][col] = currentPlayer;
    }

    // 各方向の石をひっくり返す
    directions.forEach(([dr, dc]) => {
      if (checkDirection(row, col, dr, dc, currentPlayer)) {
        let r = row + dr;
        let c = col + dc;
        const opponent = currentPlayer === 'black' ? 'white' : 'black';
        
        while (r >= 0 && r < 8 && c >= 0 && c < 8 && newBoard[r] && newBoard[r][c] === opponent) {
          newBoard[r][c] = currentPlayer;
          r += dr;
          c += dc;
        }
      }
    });

    setBoard(newBoard);
    
    // 次のプレイヤーに交代
    const nextPlayer = currentPlayer === 'black' ? 'white' : 'black';
    setCurrentPlayer(nextPlayer);
    
    // 次のプレイヤーが置ける場所があるかチェック
    const nextValidMoves = getValidMoves(nextPlayer);
    if (nextValidMoves.length === 0) {
      // パスが必要
      const currentValidMoves = getValidMoves(currentPlayer);
      if (currentValidMoves.length === 0) {
        // ゲーム終了
        setGameOver(true);
      }
    }
    
    return true;
  }, [board, currentPlayer, gameOver, canPlaceStone, checkDirection, getValidMoves]);

  // ゲームをリセット
  const resetGame = useCallback(() => {
    const initialBoard: CellState[][] = Array(8).fill(null).map(() => Array(8).fill(null));
    if (initialBoard[3] && initialBoard[4]) {
      initialBoard[3][3] = 'white';
      initialBoard[3][4] = 'black';
      initialBoard[4][3] = 'black';
      initialBoard[4][4] = 'white';
    }
    
    setBoard(initialBoard);
    setCurrentPlayer('black');
    setGameOver(false);
  }, []);

  // スコアを計算
  const getScore = useCallback(() => {
    let blackCount = 0;
    let whiteCount = 0;
    
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (board[row] && board[row][col] === 'black') blackCount++;
        else if (board[row] && board[row][col] === 'white') whiteCount++;
      }
    }
    
    return { black: blackCount, white: whiteCount };
  }, [board]);

  // 有効な手を取得
  const validMoves = getValidMoves(currentPlayer);

  return {
    board,
    currentPlayer,
    gameOver,
    validMoves,
    placeStone,
    resetGame,
    getScore,
  };
}; 