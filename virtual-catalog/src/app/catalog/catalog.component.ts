import { Component } from '@angular/core';
import { DataStorage } from '../Service/DataStorage';
import { ServiceVirtualCatalogService } from '../service-virtual-catalog.service';
import { product } from '../classes/product';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {

  data: any = {};
  product_attributes: any;
  productFiltered: any[] = [];
  listProductAttributes: any[] = [];
  display: boolean = false;
  current_product: any = new product;
  temp: any[] = [];

  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

  constructor(private service: ServiceVirtualCatalogService, public dataStorage: DataStorage) { 
    this.data = dataStorage.data;
    this.product_attributes = this.data.prices;
    console.log(this.data.prices);

    this.productFiltered = this.data.productsList;
  }

  ngOnInit() {

  }

  itemDetail(item: any) {
    this.display = !this.display;
    this.current_product = item;
    this.getItemPrice(this.current_product.productId);
    console.log(this.current_product);
  }

  getItemPrice(itemCode: string) {
    this.data.prices.forEach(element => {
      if(element.itemId == itemCode) {
        this.temp = element.attributes;
        console.log(element.itemId);
        console.log(this.temp);
      }
    });
  }

}