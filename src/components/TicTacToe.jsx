import React, { useEffect, useState } from "react";
import Stats from "./Stats";
import Board from "./Board";
import ToolBar from "./ToolBar";

const array = new Array(3).fill(0);
const combinations = [
  ...array.map((n, index) => [index * 3, index * 3 + 1, index * 3 + 2]),
  ...array.map((n, index) => [index, index + 3, index + 6]),
  ...[0, 2].map((n, index) => [n, n + 4 / (n || 1), n + 8 / (n || 1)]),
];

const getWinner = (squares) => {
  const winner = combinations.find((c) => {
    const player = squares[c[0]];
    return c.every((number) => {
      return squares[number] !== null && squares[number].id === player.id;
    });
  });

  return winner && squares[winner[0]];
};

const NO_PLAYER = null;
const PLAYER_1 = { id: 1, mark: "X", bgColor: "#dc685a" };
const PLAYER_2 = { id: 2, mark: "O", bgColor: "#ecaf4f" };

const DEFAULT_BOARD = new Array(9).fill(NO_PLAYER);
const DEFAULT_PLAYER = PLAYER_1;

const TicTacToe = (props) => {
  const [board, setBoard] = useState(DEFAULT_BOARD);
  const [nextPlayer, setNextPlayer] = useState(PLAYER_1);
  const [winner, setWinner] = useState(NO_PLAYER);
  const marksInBoard = board.filter((s) => s != NO_PLAYER).length;

  useEffect(() => {
    if (marksInBoard >= 5) {
      const theWinner = getWinner(board);

      if (theWinner) {
        setWinner(theWinner);
      }
    }
  }, [board]);

  const handleSelectPlayer = (number) => {
    const selectedPlayer = board[number - 1];

    if (selectedPlayer != NO_PLAYER || winner != NO_PLAYER) {
      return;
    }
    const modifiedBoard = [...board];
    modifiedBoard[number - 1] = nextPlayer;

    setBoard(modifiedBoard);
    setNextPlayer((prev) => (prev.id === PLAYER_1.id ? PLAYER_2 : PLAYER_1));
  };

  const handleOnReset = () => {
    setBoard(DEFAULT_BOARD);
    setWinner(NO_PLAYER);
    setNextPlayer(DEFAULT_PLAYER);
  };

  return (
    <div className="tic-tac-toe">
      <Stats
        nextPlayer={nextPlayer}
        winner={winner}
        marksInBoard={marksInBoard}
      />
      <Board board={board} onPlay={handleSelectPlayer} nextPlayer={nextPlayer} />
      <ToolBar onReset={handleOnReset} />
    </div>
  );
};

TicTacToe.propTypes = {};

export default TicTacToe;
