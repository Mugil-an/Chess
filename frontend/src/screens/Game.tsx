import { useEffect, useState } from "react";
import { ChessBoard } from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";
import { Button } from "../components/button";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [start,setStart] = useState(false);
  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);

      switch (message.type) {
        case INIT_GAME: {
          const newGame = new Chess();
          setChess(newGame);
          setBoard(newGame.board());
          setStart(true)
          console.log("Game initialized");
          break;
        }

        case MOVE: {
          const move = message.payload.move;
          chess.move(move);
          console.log(chess.history());
          setBoard(chess.board());
          break;
        }

        case GAME_OVER: {
          alert("Game Over");
          break;
        }
      }
    };
  }, [socket, chess]);

  if (!socket) return <div>Connecting...</div>;

  return (
    <div className="flex justify-center">
      <div className="pt-8 max-w-screen-lg">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <ChessBoard
              board={board}
              socket={socket}
      
            />
          </div>
          <div className="bg-slate-900 flex justify-center items-start">
            {!start ? (
              <Button
                onClick={() =>
                  socket.send(JSON.stringify({ type: INIT_GAME }))
                }
              >
                Play
              </Button>
            ) : <div className="w-full display-block text-center">
                  <p className="text-white font-medium">{chess.history()+ " " }</p>
              </div>}
          </div>
        </div>
      </div>
    </div>
  );
};
