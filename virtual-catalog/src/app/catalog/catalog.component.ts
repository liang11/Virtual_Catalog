import { Component } from '@angular/core';
import { DataStorage } from '../Service/DataStorage';
import { ServiceVirtualCatalogService } from '../service-virtual-catalog.service';
import { barcode } from '../classes/barcode';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {

  data: any = {};
  productFiltered: any[] = [];

  constructor(private service: ServiceVirtualCatalogService, public dataStorage: DataStorage) { 
    this.data = dataStorage.data;
    console.log(this.data.productImgSize);

    this.productFiltered = this.data.productsList;

    // let lowerLevel = dataStorage.getLowerLevel();
    // let temp = dataStorage.getList(lowerLevel);

    // temp.forEach(element => {
    //   this.data.allProducts.filter((item) => item.getAttribute(lowerLevel) == element.name).forEach(product => {
    //     if(!this.productFiltered.some(e => e.productId == product.productId)) {
    //       this.productFiltered.push(product); 
    //     }
    //   });      
    // });
    
  }

  ngOnInit() {
    this.service.getItemBarcode().then((itemBarcode: barcode[]) => {
      console.log(itemBarcode);
      //this.listFamily = families;
    })
  }
}