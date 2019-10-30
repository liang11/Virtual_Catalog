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
  familyList: any[] = [];
  subFamilyList: any[] = [];
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


    this.familyList = this.getFamilies(this.productFiltered);
    this.subFamilyList = this.getSubFamilies(this.productFiltered);
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
      if (!temp.some(e => e.subCategory == product.subCategory && e.subFamily == product.subFamily && e.category == product.category)) {
        temp.push({ subCategory: product.subCategory, subFamily: product.subFamily, category: product.category });
      }
    });
    return temp;
  }

  getFamilies(lista: any[]) {
    let temp: any[] = [];
    lista.forEach(product => {
      if (!temp.some(e => e == product.family)) {
        temp.push(product.family);
      }
    });
    return temp;
  }

  getSubFamilies(lista: any[]) {
    let temp: any[] = [];
    lista.forEach(product => {
      if (!temp.some(e => e.name == product.subFamily)) {
        temp.push({ name: product.subFamily, parent_id: product.family });
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
      amount = this.productFiltered.filter((item) => element.subCategory == item.subCategory && element.subFamily == item.subFamily && element.category == item.category).length;
      idx = this.productFiltered.findIndex(i => i.subCategory == element.subCategory && i.subFamily == element.subFamily && element.category == i.category) + amount;

      if (amount % this.spinner != 0) {
        for (let index = 0; index < this.spinner - (amount % this.spinner); index++) {
          this.productFiltered.splice(idx, 0, blank);
          //idx++;
        }
      }
    });
  }

  generatePdf(data: any[]) {
    var doc = new jsPDF('p', 'mm','a4',true);

    doc.setFillColor(8, 100, 139);
    doc.rect(0, 0, 210, 300, 'F');

    doc.setFontSize(25);
    doc.setTextColor(255, 255, 255);
    let title = "CATÁLOGO DE PRODUCTOS";
    let year = "2019";
    var title_lines = doc.splitTextToSize(title, 65);
    let title_y = 120;
    for (var i = 0; i < title_lines.length; i++) {
      doc.text(40, title_y, title_lines[i]);
      title_y += 12;
    }

    doc.setLineWidth(1.5);
    doc.setDrawColor(255, 255, 255);
    doc.line(110, 110, 110, 135);

    doc.setFontSize(60);
    doc.text(year, 115, 130);

    var date = new Date();
    let date_aux = "Fecha: ";
    date_aux = date_aux + date.getUTCDate();
    date_aux = date_aux + '.' + date.getUTCMonth();
    date_aux = date_aux + '.' + date.getUTCFullYear();

    let x = 15;
    let y = 40;
    let idx_x = 20;
    let idx_y = 20;
    let listFamily = this.familyList;
    let listSubFamily = this.subFamilyList;
    let catalogIndex: any[] = [];

    var img;
    var imgs;
    var family = '';

    async function loadImage(dataList) {
      doc.setFontSize(12);
      doc.text(date_aux, 85, 280);

      img = await dataURL('../../assets/imgs/mercasa_blanco.png');
      doc.addImage(img, 70, 255, 55, 20);

      doc.addPage();

      doc.setFillColor(8, 100, 139);
      doc.rect(0, 210, 210, 90, 'F');

      doc.setFontSize(80);
      doc.setTextColor(255, 255, 255);
      doc.text("Índice", 10, 250);

      for (let index = 0; index < dataList.length; index++) {
        let aux = dataList[index];

        if (aux.name != 'blank' && family != aux.family) {
          catalogIndex.push({ parent_id: '', name: aux.family, page: drawDivision(doc, aux.family) });
          family = aux.family;
          console.log(catalogIndex);
        }

        if ((index % 4 == 0) && (index < dataList.length)) {
          doc.addPage();
          console.log(index);
          // console.log(dataList[index]);

          if (!catalogIndex.some(e => e.name == dataList[index].subFamily)) {
            catalogIndex.push({ parent_id: dataList[index].family, name: dataList[index].subFamily, page: doc.internal.getCurrentPageInfo().pageNumber });
          }

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
          doc.setTextColor(255, 255, 255);

          doc.text(dataList[index].family, 190, 10, { rotationDirection: "0", angle: "-90" });

          //Set SubFamily tag
          doc.setFillColor(8, 100, 139);
          doc.rect(185, 185, 15, 115, 'F');;

          doc.text(dataList[index].subFamily, 190, 190, { rotationDirection: "0", angle: "-90" });
        }

        if (aux.name != 'blank') {
          img = await dataURL('http://186.176.206.154:8088/images/Products/' + aux.productId + '_m_.PNG');

          try {
            doc.addImage(img, 'PNG', x, y, 60, 60, undefined, 'SLOW');
          }
          catch (error) {
            //console.log(error);
            img = await dataURL('../../assets/imgs/error_img.png');
            doc.addImage(img, 'PNG', x, y, 65, 65, undefined, 'SLOW');
          }

          doc.setFontSize(10);

            doc.setFontType("bold");
            doc.setTextColor(0, 0, 0);
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
      }

      doc.setTextColor(8, 100, 139);
      doc.setFontSize(12);
      doc.setPage(2);
      console.log(listFamily);
      for (let index = 1; index <= listFamily.length; index++) {
        // doc.text(index + '  ' + listFamily[index - 1], idx_x, idx_y);
        let temp = catalogIndex.filter(i => i.name == listFamily[index - 1]).pop();
        doc.textWithLink(index + '  ' + listFamily[index - 1], idx_x, idx_y, { pageNumber: temp.page });
        idx_y += 8;
        //let subFamily = listSubFamily.filter(i => i.parent_id == listFamily[index - 1]);
        let subFamily = catalogIndex.filter(i => i.parent_id == listFamily[index - 1]);
        for (let s_family = 1; s_family <= subFamily.length; s_family++) {
          // doc.text(index + '.' + s_family + '  ' + subFamily[s_family - 1].name, idx_x, idx_y);
          let sf_temp = subFamily[s_family - 1];
          doc.textWithLink(index + '.' + s_family + '  ' + subFamily[s_family - 1].name, idx_x + 10, idx_y, { pageNumber: sf_temp.page });
          idx_y += 4;
        }
        idx_y += 4;
        if(idx_y > 200) {
          idx_x = 110;
          idx_y = 20;
        }
      }

      doc.save('a4.pdf');
      console.log(catalogIndex);
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

function drawDivision(doc, text) {
  doc.addPage();

  doc.setFillColor(8, 100, 139);
  doc.rect(0, 0, 210, 300, 'F');
  doc.setFontSize(40);
  doc.setTextColor(255, 255, 255);

  var description_lines = doc.splitTextToSize(text, 70);
  let temp_y = 150;
  for (var i = 0; i < description_lines.length; i++) {
    doc.text(65, temp_y, description_lines[i]);
    temp_y += 12;
  }

  return doc.internal.getCurrentPageInfo().pageNumber;
}

function getIndexFamily(productFiltered, atribute, searched) {
  var index;
  console.log(productFiltered);
  if (atribute == 'family') {
    index = productFiltered.findIndex(i => i.family == searched);
  } else {
    index = productFiltered.findIndex(i => i.subFamily == searched);
  }

  return index;
}
