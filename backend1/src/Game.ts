import {WebSocket} from 'ws';
import {Chess} from 'chess.js';
import {GAME_OVER,MOVE} from './message.js';

export class Game{
    public player1:WebSocket;
    public player2:WebSocket;
    public board:Chess;
    // public moves:string[];
    public StartTime:Date;
    private moveCount:number;
    constructor(player1:WebSocket,player2:WebSocket){
        this.player1=player1;
        this.player2=player2;
        this.board=new Chess();
        // this.moves=[];
        this.moveCount=0;
        this.StartTime=new Date();
        this.player1.send(JSON.stringify({
            type:'init_game',
            payload:{
                color:'white'
            }
        }));

        this.player2.send(JSON.stringify({
            type:'init_game',
            payload:{
                color:'black'
            }
        }));
    }

    public makeMove(socket:WebSocket,move:{from :string,to : string}){
        // if(this.player1===socket || this.player2===socket){
        //     this.moves.push(move);
        //     this.board=move;
        //     this.CheckWinner();
        // }
        console.log(this.moveCount)
        if(this.moveCount%2===0 && socket===this.player2){
            return;
        }

        if(this.moveCount%2===1 && socket===this.player1){
            return;
        }
        console.log("did not early return");
        try{
            
            this.board.move(move)
        }
        catch(e){
            return;
        }
        this.moveCount+=1
        if(this.board.isGameOver()){
            this.player1.send(JSON.stringify({
                type:GAME_OVER,
                payload:{
                    winner:this.board.turn()=='b'?'white':'black',
                }
            }));
        }
        if(this.moveCount % 2 === 0){
            console.log("sent1");
            this.player1.send(JSON.stringify({
                type:MOVE,
                payload:move,
            }))
        }
        else{
            console.log("sent2");
            this.player2.send(JSON.stringify({
                type:MOVE,
                payload:move,
            }))
        }
        console.log("reaches end");
       
    }
}    