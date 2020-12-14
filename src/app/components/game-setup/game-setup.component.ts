import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { GameListService } from './../../services/game/game-list.service';

@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.scss']
})
export class GameSetupComponent implements OnInit {

  gameSetupForm: FormGroup; 
  difficultySelected = 'easy';

  constructor(private gameService: GameListService, private fb: FormBuilder, private route: Router) { }

  ngOnInit(): void {
    this.gameSetupForm = this.fb.group({
      difficultyOption: ['easy', Validators.required]
    });

  }

  submitForm() {
    console.log(this.gameSetupForm.getRawValue());
    let difficultyData = this.gameSetupForm.getRawValue().difficultyOption;
    window.localStorage.setItem('DIFFICULTY', difficultyData);
    this.createNewGame(difficultyData);
    this.route.navigate(['/gameBoard']);
  }

  createNewGame(difficulty) {
    this.gameService.createGame(difficulty);
    let theGameData = this.gameService.getGames();
  }

  ngOnDestroy()	{
    this.gameService.deleteGame();
  }

}

