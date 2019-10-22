import { Component } from '@angular/core';
import { DataStorage } from '../Service/DataStorage';
import { ServiceVirtualCatalogService } from '../service-virtual-catalog.service';
import { product } from '../classes/product';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { firstBy } from "thenby";
import jsPDF from 'jspdf';
declare var JsBarcode: any;
// declare var $: any;

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {

  data: any = {};
  subCategoryList: any[];
  treePosition: string = "";
  x: string;
  len = 40;
  cantRow = 1;
  spinner: number = 0;
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
    this.spinner = dataStorage.data.spinner;
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

    let item = this.productFiltered[0];
    this.treePosition = item.family + "/" + item.subFamily + "/" + item.category + "/" + item.subCategory;
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
    let product = this.productFiltered[event.first];
    this.treePosition = product.family + "/" + product.subFamily + "/" + product.category + "/" + product.subCategory;
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

      if (amount % this.spinner != 0) {
        for (let index = 0; index < this.spinner - (amount % this.spinner); index++) {
          this.productFiltered.splice(idx, 0, blank);
          idx++;
        }
      }
    });
  }

  generatePdf(data: any[]) {
    var doc = new jsPDF();

    doc.setFillColor(8, 100, 139);
    doc.rect(0, 0, 210, 300, 'F');

    doc.setFontSize(25);
    doc.setTextColor(255,255,255);
    let title = "CATÁLOGO DE PRODUCTOS";
    let year = "2019";
    var title_lines = doc.splitTextToSize(title, 65);
    let title_y = 120;
    for (var i = 0; i < title_lines.length; i++) {
      doc.text(35, title_y, title_lines[i]);
      title_y += 12;
    }

    doc.setLineWidth(1.5);
    doc.setDrawColor(255,255,255);
    doc.line(105, 110, 105, 135);

    doc.addPage();

    let x = 15;
    let y = 40;
    var img;
    var imgs;
    async function loadImage(dataList) {
      // Set Fonts
      doc.setFontType("bold");
      doc.setTextColor(0, 0, 0);

      //SubCategory Title
      doc.setFontSize(25);
      doc.text(data[0].subCategory, 20, 20);

      //Set Family tag
      doc.setFontSize(20);
      doc.setFillColor(8, 100, 139);
      doc.rect(185, 0, 15, 85, 'F');

      doc.text(data[0].family, 190, 10, { rotationDirection: "0", angle: "-90" });

      //Set SubFamily tag
      doc.setFillColor(8, 100, 139);
      doc.rect(185, 185, 15, 115, 'F');

      doc.text(data[0].subFamily, 190, 190, { rotationDirection: "0", angle: "-90" });

      for (let index = 1; index <= dataList.length; index++) {
        let aux = dataList[index - 1];
        if (aux.name != 'blank') {
          img = await dataURL('http://186.176.206.154:8088/images/Products/' + aux.productId + '_l_.PNG');

          try {
            doc.addImage(img, 'PNG', x, y, 65, 65);
            doc.setFontSize(10);

            doc.setFontType("bold");
            doc.text(aux.productId, x + 10, y + 75);

            doc.setFontType("normal");
            var description_lines = doc.splitTextToSize(aux.name, 65);
            let temp_y = y;
            for (var i = 0; i < description_lines.length; i++) {
              doc.text(x + 10, temp_y + 80, description_lines[i]);
              temp_y += 5;
            }

            imgs = textToBase64Barcode(aux.attributes[0].barcode);
            doc.addImage(imgs, 'PNG', x + 10, temp_y + 80, 50, 25);

            if (x == 100) {
              x = 15;
              y += 120;
            }
            else {
              x += 85;
            }
          }
          catch (error) {
            //console.log(error);
          }
        }

        if ((index % 4 == 0) && (index < dataList.length)) {
          doc.addPage();
          console.log(index);
          console.log(dataList[index]);

          x = 15;
          y = 40;

          // Set Fonts
          doc.setFontType("bold");
          doc.setTextColor(0, 0, 0);

          //SubCategory Title
          doc.setFontSize(30);
          doc.text(dataList[index].subCategory, 20, 20);

          //Set Family tag
          doc.setFontSize(20);
          doc.setFillColor(8, 100, 139);
          doc.rect(185, 0, 15, 85, 'F');

          doc.text(dataList[index].family, 190, 10, { rotationDirection: "0", angle: "-90" });

          //Set SubFamily tag
          doc.setFillColor(8, 100, 139);
          doc.rect(185, 185, 15, 115, 'F');

          doc.text(dataList[index].subFamily, 190, 190, { rotationDirection: "0", angle: "-90" });
        }
      }

      doc.save('a4.pdf');
    }

    loadImage(data);
  }

}

function dataURL(url) {
  let promise = new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        //console.log("fucion primero");
        //console.log(reader.result);
        resolve(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  });
  return promise;
}

function textToBase64Barcode(text) {
  var canvas = document.createElement("canvas");
  JsBarcode(canvas, text, { width: 2, fontSize: 25 });
  return canvas.toDataURL("image/png");
}

