import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  private directions: number[][] = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1]
  ];
  table: number[][];
  jobId: any;

  constructor() { }

  ngOnInit() {
    this.table = new Array(20);

    for (let i = 0; i < this.table.length; i++) {
      const line = new Array(30).fill(0);
      this.table[i] = line;
    }
  }

  mark(event: any) {
    console.log(event.buttons);
    if (event.buttons) {
      const indexes = event.target.id.split(':');
      this.table[indexes[0]][indexes[1]] = 1;
    }
  }

  run(event: Event) {
    if (this.jobId) {
      clearInterval(this.jobId);
    }
    this.jobId = setInterval(() => {
      this.recalculateBoard();
    }, 100);
  }

  stop() {
    clearInterval(this.jobId);
  }

  reset() {
    this.table.forEach(line => {
      line.fill(0);
    });
  }

  private recalculateBoard() {
    for (let vi = 0; vi < this.table.length; vi++) {
      const line = this.table[vi];
      for (let hi = 0; hi < line.length; hi++) {
        const currentElement = this.table[vi][hi];
        const neighbours = this.countNeighbours(hi, vi);
        if (currentElement === 1) {
          if (neighbours < 2) {
            this.table[vi][hi] = 0;
          }
          if (neighbours > 3) {
            this.table[vi][hi] = 0;
          }
        }
        if (currentElement === 0 && neighbours === 3) {
          this.table[vi][hi] = 1;
        }
      }
    }
  }

  private countNeighbours(hi: number, vi: number) {
    let neighbours = 0;

    this.directions.forEach(d => {
      try {
        const directedHI = hi + d[0];
        const directedVI = vi + d[1];
        const n = this.table[directedVI][directedHI];
        if (n === 1) {
          neighbours++;
        }
      } catch (e) { }
    });
    return neighbours;
  }
}
