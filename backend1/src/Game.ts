import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { GAME_OVER, MOVE } from "./message.js";

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  public board: Chess;
  public StartTime: Date;
  private moveCount: number;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.moveCount = 0;
    this.StartTime = new Date();

    this.player1.send(
      JSON.stringify({
        type: "init_game",
        payload: { color: "white" },
      })
    );

    this.player2.send(
      JSON.stringify({
        type: "init_game",
        payload: { color: "black" },
      })
    );
  }

  public makeMove(socket: WebSocket, move: { from: string; to: string }) {

    if (this.moveCount % 2 === 0 && socket === this.player2) return;
    if (this.moveCount % 2 === 1 && socket === this.player1) return;

    try {
      this.board.move(move);
    } catch (e) {
      console.log("Invalid move:", move, e);
      return;
    }

    this.moveCount++;

    if (this.board.isGameOver()) {
      this.player1.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() === "b" ? "white" : "black",
          },
        })
      );
      this.player2.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() === "b" ? "white" : "black",
          },
        })
      );
    } else {
     
      this.player1.send(
        JSON.stringify({
          type: MOVE,
          payload: { move },
        })
      );
      this.player2.send(
        JSON.stringify({
          type: MOVE,
          payload: { move },
        })
      );
    }
  }
}
