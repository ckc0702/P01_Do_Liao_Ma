import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit{
  squares!: string[];
  xIsNext!: boolean;
  winner!: any;

  constructor() {
    
  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame(){
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  get player(){
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(pos: number){
    if (!this.squares[pos]){
      this.squares.splice(pos, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }
    this.winner = this.determineWinner;
  }

  get determineWinner(){
    // Tic tac toe winning pattern
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for(let i = 0; i < lines.length; i++){
      const [a,b,c] = lines[i]; // initialize as winning row
      // If combination same pattern (X or O) then win
      if(this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] == this.squares[c]) 
      {
        return this.squares[a];
      }
    }
    return null;
  }

}
