import { Component } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent {
  private boardWorker: Worker;
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

  constructor() {
    this.boardWorker = new Worker(`../web-worker/board-refresh.worker`, { type: `module` });
    this.boardWorker.onmessage = ({ data }) => {
      this.table = data;
    };
    this.table = new Array(30);

    for (let i = 0; i < this.table.length; i++) {
      const line = new Array(45).fill(0);
      this.table[i] = line;
    }
  }

  mark(event: any) {
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
      this.boardWorker.postMessage(this.table);
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
}
