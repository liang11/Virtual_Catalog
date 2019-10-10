import { Component } from '@angular/core';
import { DataStorage } from '../Service/DataStorage';
import { ServiceVirtualCatalogService } from '../service-virtual-catalog.service';
import { product } from '../classes/product';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { firstBy } from "thenby";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {

  data: any = {};
  subCategoryList: any[];
  x: string;
  len = 40;
  cantRow = 1;
  background = '#ffffff00';
  product_attributes: any;
  productFiltered: any[] = [];
  listProductAttributes: any[] = [];
  display: boolean = false;
  current_product: any = new product;
  temp: any[] = [];

  contentArray = new Array(90).fill('');
  returnedArray: string[];

  images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

  constructor(private service: ServiceVirtualCatalogService, public dataStorage: DataStorage) {
    this.data = dataStorage.data;
    this.product_attributes = this.data.prices;
    console.log(this.data.prices);

    this.productFiltered = this.data.productsList;
    this.productFiltered = this.productFiltered.sort(
      firstBy(s => s.family)
        .thenBy(s => s.subFamily)
        .thenBy(s => s.category)
        .thenBy(s => s.subCategory)
    );

    this.subCategoryList = this.getSubCategory(this.productFiltered);
    console.log(this.subCategoryList);

    this.fillBlanks(this.subCategoryList);
  }

  ngOnInit() {

  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.contentArray.slice(startItem, endItem);
  }

  itemDetail(item: any) {
    this.display = !this.display;
    this.current_product = item;
    this.getItemPrice(this.current_product.productId);
    console.log(this.current_product);
  }

  getItemPrice(itemCode: string) {
    this.data.prices.forEach(element => {
      if (element.itemId == itemCode) {
        this.temp = element.attributes;
        console.log(element.itemId);
        console.log(this.temp);
      }
    });
  }

  getBarcode(itemCode: string) {
    let ret: any;
    this.data.prices.forEach(element => {
      if (element.itemId == itemCode) {
        let att = element.attributes;
        if (att) {
          console.log("-------------------------------------");
          console.log(att);
          console.log(att[0].barcode);
          this.x = att[0].barcode;
          console.log(this.x);
        }
      }
    });
  }

  pagination(event: any) {
    this.cantRow = this.cantRow + 1;
    console.log(event.first);
    console.log(this.productFiltered[event.first]);
  }

  getSubCategory(lista: any[]) {
    let temp: any[] = [];
    lista.forEach(product => {
      if (!temp.some(e => e == product.subCategory)) {
        temp.push(product.subCategory);
      }
    });
    return temp;
  }

  fillBlanks(lista: any[]) {
    let amount = 0;
    let idx = 0;
    let blank = new product();
    blank.name = "blank";

    lista.forEach(element => {
      amount = this.productFiltered.filter((item) => element == item.subCategory).length;
      idx = this.productFiltered.findIndex(i => i.subCategory == element) + amount;

      if (amount % 4 != 0) {
        for (let index = 0; index < 4 - (amount % 4); index++) {
          this.productFiltered.splice(idx, 0, blank);
          idx++;
        }
      }
    });
  }

}



function compareProducts(a: product, b: product) {
  if (a.family > b.family && a.subFamily > b.subFamily && a.category > b.category && a.subFamily > b.subFamily) {
    return 1;
  }
  if (a.family < b.family && a.subFamily < b.subFamily && a.category < b.category && a.subFamily < b.subFamily) {
    return -1;
  }
  return 0;
}
