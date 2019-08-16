import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  spinnerNumber: number;

  constructor() { 
    //this.spinnerNumber = history.state.data.spinner;
    console.log(history.state.data);
  }

  ngOnInit() {
  }

}
