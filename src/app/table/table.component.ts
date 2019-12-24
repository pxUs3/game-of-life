import { Component, OnInit } from '@angular/core';

import { from } from 'rxjs';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  table: number[][];

  constructor() { }

  ngOnInit() {
    this.table = new Array(20);

    for (let i = 0; i < this.table.length; i++) {
      const line = new Array(30).fill(0);
      this.table[i] = line;
    }
  }

}
