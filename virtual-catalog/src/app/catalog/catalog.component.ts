import { Component, OnInit } from '@angular/core';
import { DataStorage } from '../Service/DataStorage';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  sub: any[];

  constructor(private _data: DataStorage) { 
    console.log(this._data.data);
  }

  ngOnInit() {
    
  }

}
