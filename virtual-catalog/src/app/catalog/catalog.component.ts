import { Component } from '@angular/core';
import { DataStorage } from '../Service/DataStorage';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {

  data: any = [];
  productFiltered: any = [];

  constructor(public dataStorage: DataStorage) { 
    this.data = dataStorage.data;
    console.log(this.data);

    this.data.familyList.forEach(element => {
      this.data.allProducts.filter((item) => element.name == item.family).forEach(product => {
        this.productFiltered.push(product);
      });
    });

    console.log(this.productFiltered);
  }

}
