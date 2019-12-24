import { Component, OnInit } from '@angular/core';
import { from, of } from 'rxjs';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  directions: number[][] = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1],
  ];
  table: number[][];

  constructor() { }

  ngOnInit() {
    this.table = new Array(20);

    for (let i = 0; i < this.table.length; i++) {
      const line = new Array(30).fill(0);
      this.table[i] = line;
    }
  }

  run(event: Event) {
    for (let vi = 0; vi < this.table.length; vi++) {
      const line = this.table[vi];
      for (let hi = 0; hi < line.length; hi++) {
        const currentElement = this.table[vi][hi];
        const neighbours = this.countNeighbours(hi, vi);

        if (currentElement === 1) {
          if (neighbours < 2) {
            this.table[vi][hi] = 0;
            return;
          }

          if (neighbours > 3) {
            this.table[vi][hi] = 0;
            return;
          }
        }
        if (currentElement === 0 && neighbours === 3) {
          this.table[vi][hi] = 1;
          return;
        }
      }
    }
  }


  private countNeighbours(hi: number, vi: number) {
    let neighbours = 0;

    this.directions.forEach(d => {
      try {
        const n = this.table[d[0]][d[1]];
        if (n === 1) { neighbours++; }
      } catch (e) { }
    });
    return neighbours;
  }

}
