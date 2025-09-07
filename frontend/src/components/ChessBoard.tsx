import type { Square, PieceSymbol, Color } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

export const ChessBoard = ({
  board,
  socket,
}: {
  board: (
    | {
        square: Square;
        type: PieceSymbol;
        color: Color;
      }
    | null
  )[][];
  socket: WebSocket;
}) => {
  const [from, setFrom] = useState<Square | null>(null);

  return (
    <div className="text-black font-medium">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const representation =
                (String.fromCharCode(97 + j) + "" + (8 - i)) as Square;

              return (
                <div
                  key={`${i}-${j}`} 
                  onClick={() => {
                    if (!from) {
                      setFrom(representation);
                    } else {
                      socket.send(
                        JSON.stringify({
                          type: MOVE,
                          payload: {
                            move: {
                              from,
                              to: representation,
                            },
                          },
                        })
                      );
                      setFrom(null); 
                    }
                  }}
                  className="flex text-center items-center"
                >
                  <div
                    className={`w-16 h-16 flex items-center justify-center ${
                      (i + j) % 2 === 0 ? "bg-gray-400": "bg-green-500"
                    }`}
                  >
                  {square ? (
                      <img
                        className="w-8"
                        src={`${
                          square.color === "b"
                            ? square.type
                            : `${square.type.toUpperCase()} Copy`
                        }.png`}
                        alt={square.type}
                      />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
