import { Component, OnInit } from '@angular/core';
import { BoardService } from './../../services/board/board.service';
import { GameListService } from './../../services/game/game-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  newBoard: any;
  currentBoard: any;
  boardDimentions = 10;
  ships: any;
  difficultySelected: string;
  counter = 0;

  constructor(private boardService: BoardService, private gameService: GameListService, private route: Router) {
    this.createNewBoard(this.boardDimentions);
    this.currentBoard = this.boardService.getBoard();
    console.log('the board', this.currentBoard);
    this.ships = this.boardService.getShips();

    let gameDifficulty = this.gameService.getGames();
    console.log('the game', gameDifficulty);
   }

  ngOnInit(): void {
    this.ships.forEach(ship => {
      this.boardService.drawRandomShips(ship, this.currentBoard);
    });

    this.difficultySelected = window.localStorage.getItem('DIFFICULTY');
  }
  
  createNewBoard(dimentions) {
    this.boardService.createBoard(dimentions);
  }

  boom(cell) {

    if(!cell.incorrect) {
      this.counter++;
    }

    if(cell.occupied === true) {
      cell.correct = true;
    } else {
      cell.incorrect = true;
    }
    
    if(this.counter === 50 && this.difficultySelected === 'hard') {
      alert('Sorry you lost');
      this.route.navigate(['/home']);
    } else if(this.counter === 100 && this.difficultySelected === 'medium') {
      alert('Sorry you lost');
      this.route.navigate(['/home']);
    }
    
  }

  ngOnDestroy()	{
    this.boardService.deleteBoard();
  }

}
