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
        // this.moves=[];
        this.moveCount = 0;
        this.StartTime = new Date();
        this.player1.send(JSON.stringify({
            type: 'init_game',
            payload: {
                color: 'white'
            }
        }));
        this.player2.send(JSON.stringify({
            type: 'init_game',
            payload: {
                color: 'black'
            }
        }));
    }
    makeMove(socket, move) {
        // if(this.player1===socket || this.player2===socket){
        //     this.moves.push(move);
        //     this.board=move;
        //     this.CheckWinner();
        // }
        console.log(this.moveCount);
        if (this.moveCount % 2 === 0 && socket === this.player2) {
            return;
        }
        if (this.moveCount % 2 === 1 && socket === this.player1) {
            return;
        }
        console.log("did not early return");
        try {
            this.board.move(move);
        }
        catch (e) {
            return;
        }
        this.moveCount += 1;
        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: message_js_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() == 'b' ? 'white' : 'black',
                }
            }));
        }
        if (this.moveCount % 2 === 0) {
            console.log("sent1");
            this.player1.send(JSON.stringify({
                type: message_js_1.MOVE,
                payload: move,
            }));
        }
        else {
            console.log("sent2");
            this.player2.send(JSON.stringify({
                type: message_js_1.MOVE,
                payload: move,
            }));
        }
        console.log("reaches end");
    }
}
exports.Game = Game;
