"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const message_js_1 = require("./message.js");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.moveCount = 0;
        this.StartTime = new Date();
        this.player1.send(JSON.stringify({
            type: "init_game",
            payload: { color: "white" },
        }));
        this.player2.send(JSON.stringify({
            type: "init_game",
            payload: { color: "black" },
        }));
    }
    makeMove(socket, move) {
        // enforce turn rules
        if (this.moveCount % 2 === 0 && socket === this.player2)
            return;
        if (this.moveCount % 2 === 1 && socket === this.player1)
            return;
        try {
            this.board.move(move);
        }
        catch (e) {
            console.log("Invalid move:", move, e);
            return;
        }
        this.moveCount++;
        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: message_js_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "b" ? "white" : "black",
                },
            }));
            this.player2.send(JSON.stringify({
                type: message_js_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "b" ? "white" : "black",
                },
            }));
        }
        else {
            // broadcast the move
            this.player1.send(JSON.stringify({
                type: message_js_1.MOVE,
                payload: { move },
            }));
            this.player2.send(JSON.stringify({
                type: message_js_1.MOVE,
                payload: { move },
            }));
        }
    }
}
exports.Game = Game;
