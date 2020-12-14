import { Injectable } from '@angular/core';
import { Game } from './../../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameListService {

  games: Game[] = [];
  newGame: Game; 

  constructor() { }

  createGame(difficulty: string, status: string = 'started', result?): void { 

    this.newGame = new Game({
      difficulty: difficulty,
      status: status,
      result: result
    });

    this.games.push(this.newGame);
  }

  deleteGame() {
    if(this.games.length > 0) {
      this.games = [];
    }
  }

  getGames(): Game[] {
    return this.games;
  }
}




