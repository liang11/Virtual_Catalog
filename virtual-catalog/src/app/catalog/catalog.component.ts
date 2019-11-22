import { Component } from '@angular/core';
import { DataStorage } from '../Service/DataStorage';
import { ServiceVirtualCatalogService } from '../service-virtual-catalog.service';
import { product } from '../classes/product';
import { firstBy } from "thenby";
import jsPDF from 'jspdf';
declare var JsBarcode: any;

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {

  data: any = {};                       // Contains all the necessary data tha comes from 'Filter' component to show the catalog.  
  downloadStatus = false;               // Boolean to display the progress when generating a catalog.
  subCategoryList: any[];               // List of the subCategoryList.
  familyList: any[] = [];               // List of all families of the products as string.            
  treePosition: string = "";            // String to show the hierarchy of the product.
  spinner: number = 0;                  // Cantidad de itemsxpágina.
  background = '#ffffff00';             // Fondo transparente para mostrar las img de los productos.
  productFiltered: any[] = [];          // Prouctos filtrados para mostrar. 
  display: boolean = false;             // Show/hide the pop-up with details of the product.
  current_product: any = new product;   // Product to show details.
  current_attributes: any[] = [];       // Atributos sobre el current product(Unidad, precio, cod.barras).
  showPrices: '';                       // Booleano si mostrar precios o no.
  downloadPercentage = 0;               // Variable que lleva el porcentaje de descarga de los productos.
  genBtnStatus = false;                 // Boolean para desabilitar el botón de generar catálogo.

  constructor(private service: ServiceVirtualCatalogService, public dataStorage: DataStorage) {
    console.log(JSON.parse(sessionStorage.getItem('familyList')));
    console.log(JSON.parse(sessionStorage.getItem('spinner')));

    this.data = dataStorage.data;
    this.spinner = this.data.spinner;
    this.showPrices = dataStorage.data.showPrices;

    // Ordenar los productos por jerarquía.
    this.productFiltered = this.data.productsList;
    this.productFiltered = this.productFiltered.sort(
      firstBy(s => s.family)
        .thenBy(s => s.subFamily)
        .thenBy(s => s.category)
        .thenBy(s => s.subCategory)
    );

    // Genero una lista con los strings de las famiias de los productos.
    this.familyList = this.getFamilies(this.productFiltered);

    // Genero una lista con el nivel más bajo para clasificar los productos.
    this.subCategoryList = this.getSubCategory(this.productFiltered);
    console.log(this.subCategoryList);

    // Relleno la lista de productos con blancos para que los productos por página calcen,
    // sin mezclar dos familias diferentes en la misma página.
    this.fillBlanks(this.subCategoryList);

    // Genero el primer encabezado para la 1ra página.
    let item = this.productFiltered[0];
    this.treePosition = item.family + "/" + item.subFamily + "/" + item.category + "/" + item.subCategory;
  }

  // Cuando hago click a "Ver Detalles" de un producto, cargo sus datos en las variables.
  // @param item -- recibe el evento 'onClick' desde el html y carga el producto que se selecciono.
  itemDetail(item: any) {
    this.display = !this.display;
    this.current_product = item;
    this.getItemPrice(this.current_product.productId);
    console.log(this.current_product);
  }

  // Obtengo los datos del producto selecto.
  // @param itemCode -- recive el código del producto al que se le desea sacar el precio.
  getItemPrice(itemCode: string) {
    this.data.prices.forEach(element => {
      if (element.itemId == itemCode) {
        this.current_attributes = element.attributes;
        console.log(element.itemId);
        console.log(this.current_attributes);
      }
    });
  }

  // Cuando paso de página, refresco el árbol de jerarquía que se muestra en la parte superior.
  // @param event -- capturo el evento y obtengo la información actual del componente de paginación.
  pagination(event: any) {
    let product = this.productFiltered[event.first];
    this.treePosition = product.family + "/" + product.subFamily + "/" + product.category + "/" + product.subCategory;
    console.log(event.first);
    console.log(this.productFiltered[event.first]);
  }

  // Genero una lista con los criterios que deseo filtrar por página.
  // @param lista -- lista de productos a la cual quiero sacarle las subFamilias.
  // returns -- lista de características para filtrar los productos que se van a mostrar en la misma página.
  getSubCategory(lista: any[]) {
    let temp: any[] = [];
    lista.forEach(product => {
      if (!temp.some(e => e.subCategory == product.subCategory && e.subFamily == product.subFamily && e.category == product.category)) {
        temp.push({ subCategory: product.subCategory, subFamily: product.subFamily, category: product.category });
      }
    });
    return temp;
  }

  // Obtengo una lista de strings de las familias que existen dentro de los productos filtrados.
  // @param lista -- lista de productos a la cual deseo obtener todas las familias presentes.
  // returns -- string[] con las familias presentes de 'lista'.
  getFamilies(lista: any[]) {
    let temp: any[] = [];
    lista.forEach(product => {
      if (!temp.some(e => e == product.family)) {
        temp.push(product.family);
      }
    });
    return temp;
  }

  // Se rellena la lista de productos con 'blancos' necesarios para que el componente de paginación no mezcle 
  // productos de diferentes categorías en la misma página.
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
        }
      }
    });
  }

  // Función de generar el pdf.
  // @param data -- lista de productos proveniente del html.
  generatePdf(data: any[]) {
    this.downloadStatus = true;
    this.downloadPercentage = 0;
    this.genBtnStatus = true;
    
    // Genero la variable del pdf.
    var doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
      compress: true 
    });

    // Dibujo un rectangulo que agarre toda la página.
    doc.setFillColor(8, 100, 139);
    doc.rect(0, 0, 210, 300, 'F');

    // Cada vez que desseo cambiar de style tengo que definirlo.
    doc.setFontSize(25);
    doc.setTextColor(255, 255, 255);

    // Portada del catálogo.
    let title = "CATÁLOGO DE PRODUCTOS";

    // El siguiente pedazo de código es por si el string es muy largo, entonces hace el cambio de línea.
    var title_lines = doc.splitTextToSize(title, 65);
    let title_y = 120;
    for (var i = 0; i < title_lines.length; i++) {
      doc.text(40, title_y, title_lines[i]);
      title_y += 12;
    }

    doc.setLineWidth(1.5);
    doc.setDrawColor(255, 255, 255);
    doc.line(110, 110, 110, 135);

    var date = new Date();
    let date_aux = "Fecha: ";
    date_aux = date_aux + date.getUTCDate();
    date_aux = date_aux + '.' + date.getUTCMonth();
    date_aux = date_aux + '.' + date.getUTCFullYear();

    let year = "" + date.getUTCFullYear();
    doc.setFontSize(60);
    doc.text(year, 115, 130);

    // Inicializo las posiciones para dibujar los productos.
    let x = 15;
    let y = 40;
    let idx_x = 20; // Pos_x para escribir el índice.
    let idx_y = 20; // Pos_y para escribir el índice.
    let listFamily = this.familyList;
    var img = null;
    var imgs;
    var family = '';

    // Lista que va llevando el registro de en que pag. se encuentran
    // los productos de cierta subCategoria para poder generar el índice.
    let catalogIndex: any[] = []; 

    // Funcion empezar a dibujar los productos.
    // @param dataList -- lista de productos para agregar en el pdf.
    var loadImage = async (dataList) => {
      doc.setFontSize(12);
      doc.text(date_aux, 85, 280);

      img = await dataURL('./assets/imgs/mercasa_blanco.png');
      doc.addImage(img, 70, 255, 55, 20);

      doc.addPage();

      doc.setFillColor(8, 100, 139);
      doc.rect(0, 210, 210, 90, 'F');

      doc.setFontSize(80);
      doc.setTextColor(255, 255, 255);
      doc.text("Índice", 10, 250);

      // Empiezo a dibujar los productos por página.
      for (let index = 0; index < dataList.length; index++) {
        let aux = dataList[index];

        // Calculo el porcentaje que lleva dibujado del catálogo.
        let loadPercentage = Math.round(((index+1) * 100) / dataList.length);
        console.log("Porcentage", loadPercentage);
        this.downloadPercentage = loadPercentage;
        
        // Dibujo un encabezado que separe las familias de los productos.
        if (aux.name != 'blank' && family != aux.family) {
          catalogIndex.push({ parent_id: '', name: aux.family, page: drawDivision(doc, aux.family) });
          family = aux.family;
          console.log(catalogIndex);
        }

        // Si ya dibuje 4 productos, agrego una página nueva y reinicio 
        if ((index % 4 == 0) && (index < dataList.length)) {
          doc.addPage();
          console.log(index);

          // Guardo la subfamilia para luego escribirlo en el índice.
          if (!catalogIndex.some(e => e.name == dataList[index].subFamily)) {
            catalogIndex.push({ parent_id: dataList[index].family, name: dataList[index].subFamily, page: doc.internal.getCurrentPageInfo().pageNumber });
          }

          // Reinicio las posiciones.
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

        // Si el producto no es un blanco que utilizamos para que los productos de diferentes
        // categorias no se translaparan, dibujo.
        if (aux.name != 'blank') {
          img = await dataURL('http://172.30.1.83:8021/images/' + aux.productId + '_l_.PNG');

          // Si la imagen no existe, se dibuja una default.
          try {
            doc.addImage(img, 'PNG', x, y, 60, 60, undefined, 'SLOW');
          }
          catch (error) {
            //console.log(error);
            img = await dataURL('./assets/imgs/error_img.png');
            doc.addImage(img, 'PNG', x, y, 65, 65, undefined, 'SLOW');
          }

          doc.setFontSize(10);

          doc.setFontType("bold");
          doc.setTextColor(0, 0, 0);
          doc.text(aux.productId, x + 10, y + 75);

          // Escribo el nombre del producto.
          doc.setFontType("normal");
          var description_lines = doc.splitTextToSize(aux.name, 65);
          let temp_y = y;
          for (var i = 0; i < description_lines.length; i++) {
            doc.text(x + 10, temp_y + 80, description_lines[i]);
            temp_y += 5;
          }

          // Pongo la img del producto.
          imgs = textToBase64Barcode(aux.attributes[0].barcode);
          doc.addImage(imgs, 'PNG', x + 10, temp_y + 80, 50, 25);

          // Son dos productos por fila, si ya llegue a la posicion, me muevo para dibujar los otros 2. (4xpag)
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

      // Me paro en la pág.2 para escribir el índice.
      doc.setPage(2);
      
      for (let index = 1; index <= listFamily.length; index++) {
        let temp = catalogIndex.filter(i => i.name == listFamily[index - 1]).pop();
        doc.textWithLink(index + '  ' + listFamily[index - 1], idx_x, idx_y, { pageNumber: temp.page });
        idx_y += 8;
        let subFamily = catalogIndex.filter(i => i.parent_id == listFamily[index - 1]);
        for (let s_family = 1; s_family <= subFamily.length; s_family++) {
          let sf_temp = subFamily[s_family - 1];
          doc.textWithLink(index + '.' + s_family + '  ' + subFamily[s_family - 1].name, idx_x + 10, idx_y, { pageNumber: sf_temp.page });
          idx_y += 4;
        }
        idx_y += 4;
        if (idx_y > 200) {
          idx_x = 110;
          idx_y = 20;
        }
      }

      doc.save('CatálogoDeProductos.pdf');
      this.genBtnStatus = false;
      console.log(catalogIndex);
    }

    // Llamo a la función de dibujar el catálogo.
    loadImage(data);
  }
}

// Función para pasar las imágenes de .PNG a base64, ya que eso es lo que acepta el addImage().
// @param url -- url de la imágen para transformar a base64.
// returns -- promesa de la imágen transformada.
function dataURL(url) {
  let promise = new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
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

// Fución para dibujar el código de barras.
// @param text -- string del código de barra para hacerlo una imágen.
// returns -- img en base64.
function textToBase64Barcode(text) {
  var canvas = document.createElement("canvas");
  JsBarcode(canvas, text, { width: 2, fontSize: 25 });
  return canvas.toDataURL("image/png");
}

// Función para dibujar la página de división de las familias.
// @param doc -- la variable del documento del pdf al que se esta esccribiendo.
// @param text -- nombre de la familia que se va a escribir en la división.
// returns -- string de la página en la que se escribió la división.
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