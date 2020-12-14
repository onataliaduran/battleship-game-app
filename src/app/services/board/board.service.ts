import { Injectable } from '@angular/core';
import { Cells } from 'src/app/models/cells';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  board: Object[] = [];
  width = 10;

  shipArray = [
    {
      name: 'submarine',
      directions: [
        [0],
        [0]
      ]
    },
    {
      name: 'submarine',
      directions: [
        [0],
        [0]
      ]
    },
    {
      name: 'submarine',
      directions: [
        [0],
        [0]
      ]
    },
    {
      name: 'submarine',
      directions: [
        [0],
        [0]
      ]
    },
    {
      name: 'destroyer',
      directions: [
        [0, 1],
        [0, this.width]
      ]
    },
    {
      name: 'destroyer',
      directions: [
        [0, 1],
        [0, this.width]
      ]
    },
    {
      name: 'destroyer',
      directions: [
        [0, 1],
        [0, this.width]
      ]
    },
    {
      name: 'cruiser',
      directions: [
        [0, 1, 2],
        [0, this.width, this.width*2]
      ]
    },
    {
      name: 'cruiser',
      directions: [
        [0, 1, 2],
        [0, this.width, this.width*2]
      ]
    },
    {
      name: 'battleship',
      directions: [
        [0, 1, 2, 3],
        [0, this.width, this.width*2, this.width*3]
      ]
    }
  ]

  constructor() { }

  createBoard(dimention: number) {
    let dimentions = dimention * dimention;
    for(let index = 0; index < dimentions; index++) {
      let cell = new Cells({
        occupied: false,
        incorrect: false,
        correct: false,
      });
      this.board.push(cell);
    }
  } 

  deleteBoard() {
    if(this.board.length > 0) {
      this.board = [];
    }
  }

  getBoard() {
    return this.board;
  }

  getShips() {
    return this.shipArray;
  }

  drawRandomShips(ship, cellsArray) {
    let direction: number;
    let randomDirection = Math.floor(Math.random() * ship.directions.length);
    let current = ship.directions[randomDirection];

    if (randomDirection === 0) direction = 1;
    if (randomDirection === 1) direction = 10;
    
    let randomStart = Math.abs(Math.floor(Math.random() * cellsArray.length - (ship.directions[0].length * direction)));
    const isTaken = current.some(index => cellsArray[randomStart + index].occupied === true);
    const isAtRightEdge = current.some(index => (randomStart + index) % this.width === this.width - 1); 
    const isAtLeftEdge = current.some(index => (randomStart + index) % this.width === 0);

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge) {
      current.forEach(e => {
        cellsArray[randomStart + e].occupied = true;
        cellsArray[randomStart + e].name = ship.name;
      });
    } else {
      this.drawRandomShips(ship, cellsArray);
    } 

  }


}

