import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ServiceVirtualCatalogService } from '../service-virtual-catalog.service';
import { family } from '../classes/family';
import { subFamily } from '../classes/subFamily';
import { DataStorage } from '../Service/DataStorage';
import { product } from '../classes/product';
import { lifeCycle } from '../classes/lifeCycle';
import { ipLevel } from '../classes/ipLevel';
import { priceGroup } from '../classes/priceGroup';
import { productUse } from '../classes/productUse';
import { itemType } from '../classes/itemType';
import { itemMark } from '../classes/itemMark';
import { company } from '../classes/company';
import { price } from '../classes/price';
import { Router } from '@angular/router';
import { priceAttributes } from '../classes/priceAttributes';
import jsPDF from 'jspdf';
import { MessageService } from 'primeng/api';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, AfterViewInit {

  listProducts: any[] = [];
  listFamily: any[] = [];
  listSubFamily: any[] = [];
  listCategoria: any[] = [];
  listSubCategoria: any[] = [];
  listMainActivity: any[] = [];
  listSpeciality: any[] = [];
  listLifeCycle: any[] = [];
  listPriceGroup: any[] = [];
  listProductUse: any[] = [];
  listProductSize: any[] = [];
  listImgSize: any[] = [];
  listItemType: any[] = [];
  listItemMark: any[] = [];
  listCompanies: any[] = [];
  listProductAttributes: any[] = [];

  listSubFamilyFiltered: any[] = [];
  listCategoryFiltered: any[] = [];
  listSubCategoryFiltered: any[] = [];
  listProductFiltered: any[] = [];
  listIndividualProducts: any[] = [];

  listFamilySelected: any[] = [];
  listSubFamilySelected: any[] = [];
  listCategorySelected: any[] = [];
  listSubCategorySelected: any[] = [];
  listMainActivitySelected: any[] = [];
  listSpecialitySelected: any[] = [];
  listLifeCycleSelected: any[] = [];
  listIndvProdSelected: any[] = [];
  listImgSelected: any[] = [];
  listItemTypeSelected: any[] = [];
  listProdUseSelected: any[] = [];
  listMarkSelected: any[] = [];
  listPriceSelected: any[] = [];
  companySelected: any = null;

  historicoVenta: string = "No";
  selectedValuePrice: string = "No";
  selectedValueDescripcion: string = "No";
  selectedValuePromocion: string = "No";
  selectedValuePriceList: string = "Other";
  property: string = ""
  spinner: number = 4;
  text = '';
  boolClient: boolean = true;
  filtersToApply: any[] = [];
  prodTypeStatus: boolean = false;
  prodMarkStatus: boolean = false;
  prodUseStatus: boolean = false;
  prodLifeCycleStatus: boolean = false;
  prodFamilyStatus: boolean = false;
  prodSubFamilyStatus: boolean = false;
  prodCategoryStatus: boolean = false;
  prodSubCategoryStatus: boolean = false;
  prodSubSubCategoryStatus: boolean = false;
  prodPriceListStatus: boolean = false;
  indvProductStatus: boolean = false;

  @BlockUI() blockUI: NgBlockUI;

  constructor(private service: ServiceVirtualCatalogService, private _data: DataStorage, public router: Router, private messageService: MessageService) { }

  showWarn() {
    this.messageService.add({ severity: 'warn', summary: 'Atención!', detail: 'Seleccione como mínimo una familia de productos.' });
  }

  toggleBlocking(message?: string) {
    this.blockUI.start(message);
  }

  selectedFamilies(data: family[]) {
    console.log(this.text);
    this.listFamilySelected = data;
    this.listSubFamilyFiltered = [];
    let temp: any[] = [];
    this.listFamilySelected.forEach(element => {
      this.listSubFamily.filter((item: subFamily) => element.name == item.parent_id).forEach(item => {
        if (!this.listSubFamilyFiltered.some(e => e.name == item.name)) {
          this.listSubFamilyFiltered.push(item);
        }
      });
      this.listSubFamilySelected.filter((data) => data.parent_id == element.name).forEach(item => {
        temp.push(item);
      });
    });
    this.selectedSubFamilies(temp);
  }

  selectedSubFamilies(data: subFamily[]) {
    this.listSubFamilySelected = data;
    this.listCategoryFiltered = [];
    let temp: any[] = [];
    this.listSubFamilySelected.forEach(element => {
      this.listCategoria.filter((item: subFamily) => element.name == item.parent_id).forEach((item, index) => {
        if (!this.listCategoryFiltered.some(e => e.name == item.name)) {
          this.listCategoryFiltered.push(item);
        }
      });
      this.listCategorySelected.filter((data) => data.parent_id == element.name).forEach(item => {
        temp.push(item);
      });
    });

    this.selectedCategories(temp);
  }

  selectedCategories(data: subFamily[]) {
    this.listCategorySelected = data;
    this.listSubCategoryFiltered = [];
    let temp: any[] = [];
    data.forEach(element => {
      this.listSubCategoria.filter((item: subFamily) => element.name == item.parent_id).forEach(item => {
        if (!this.listSubCategoryFiltered.some(e => e.name == item.name)) {
          this.listSubCategoryFiltered.push(item);
        }
      });
      this.listSubCategorySelected.filter((data) => data.parent_id == element.name).forEach(item => {
        temp.push(item);
      });
    });
    this.selectedSubCategories(temp);
  }

  selectedSubCategories(data: subFamily[]) {
    this.listSubCategorySelected = data;
    this.filterProducts();
  }

  selectedProducts(data: any[]) {
    this.listIndvProdSelected = data;
  }

  selectedCompany(data: any[]) {
    this.companySelected = data;
    //console.log(this.companySelected);
  }

  selectedLifeCycle(data: any[]) {
    this.listLifeCycleSelected = data;
    this.filterProducts();
  }

  selectedMainActivity(data: any[]) {
    this.listMainActivitySelected = data;
  }

  selectedSpeciality(data: any[]) {
    this.listSpecialitySelected = data;
  }

  selectedImgSize(data: any[]) {
    this.listImgSelected = data;
  }

  selectedItemType(data: any[]) {
    this.listItemTypeSelected = data;
    this.filterProducts();
  }

  selectedUseProduct(data: any[]) {
    this.listProdUseSelected = data;
    this.filterProducts();
  }

  selectedMark(data: any[]) {
    this.listMarkSelected = data;
    this.filterProducts();
  }

  selectedPrice(data: any[]) {
    this.listPriceSelected = data;
    console.log(this.listPriceSelected);
  }

  filterProducts() {
    let universe = this.listProducts;
    let temp = [];
    let aux: any = [];
    this.listProductFiltered = [];
    let lowerLevel = this.getLowerLevel();
    temp = this.getList(lowerLevel);

    if (this.listItemTypeSelected.length > 0) {
      this.listItemTypeSelected.forEach(element => {
        aux = aux.concat(universe.filter((e) => e.itemType == element.name));
      });
      universe = aux;
      aux = [];
    }

    if (this.listProdUseSelected.length > 0) {
      this.listProdUseSelected.forEach(element => {
        aux = aux.concat(universe.filter((e) => e.productUse == element.productUseId));
      });
      universe = aux;
      aux = [];
    }

    if (this.listMarkSelected.length > 0) {
      this.listMarkSelected.forEach(element => {
        aux = aux.concat(universe.filter((e) => e.itemMark == element.name));
      });
      universe = aux;
      aux = [];
    }

    if (this.listLifeCycleSelected.length > 0) {
      this.listLifeCycleSelected.forEach(element => {
        aux = aux.concat(universe.filter((e) => e.lifeCycle == element.lifeCycleId));
      });
      universe = aux;
      aux = [];
    }

    this.filtersToApply = this.listFamilySelected.slice(0);
    this.updateFilters(this.listSubFamilySelected);
    this.updateFilters(this.listCategorySelected);
    this.updateFilters(this.listSubCategorySelected);

    this.filtersToApply.forEach(element => {
      universe.filter((item) => item.getAttribute(this.getHierarchy(element.name)) == element.name).forEach(product => {
        if (!this.listProductFiltered.some(e => e.productId == product.productId)) {
          this.listProductFiltered.push(product);
        }
      });
    }); this.listIndividualProducts = this.listProductFiltered;

    // temp.forEach(element => {
    //   universe.filter((item) => item.getAttribute(lowerLevel) == element.name).forEach(product => {
    //     if (!this.listProductFiltered.some(e => e.productId == product.productId)) {
    //       this.listProductFiltered.push(product);
    //     }
    //   });
    // }); this.listIndividualProducts = this.listProductFiltered;

    this.listIndvProdSelected = this.listIndividualProducts;

    // this.listIndvProdSelected.forEach(element => {
    //   if (!this.listProductFiltered.some(e => element.productId == e.productId)) {
    //     this.listProductFiltered.push(element);
    //   }
    // });
  }

  filterIndividualProducts() {
    let temp = [];
    let aux = [];
    this.listIndividualProducts = [];
    let lowerLevel = this.getLowerLevel();
    temp = this.getList(lowerLevel);

    if (temp.length > 0) {
      this.listProducts.forEach(element => {
        if (temp.some(e => e.name == element.getAttribute(lowerLevel))) {
          if (!this.listIndividualProducts.some(item => item.productId == element.productId)) {
            this.listIndividualProducts.push(element);
          }
        }
      });

      this.listIndvProdSelected.forEach(element => {
        if (!temp.some(e => e.name == element.getAttribute(lowerLevel))) {
          aux.push(element);
        }
      });

      this.listIndvProdSelected = aux;
    } else {
      this.listIndividualProducts = this.filterRepeat(this.listProducts);
    }
  }

  checkClient() {
    this.boolClient = false;
    console.log(this.text);
  }

  checkEmpty() {
    if (!(this.text.length > 0)) {
      this.boolClient = true;
    }
  }

  ngOnInit() {
    this.service.test('alo').then((aux: string) => {
      console.log(aux);
    })
    this.service.getProduct().then((products: product[]) => {
      this.listProducts = products;
      // this.listIndividualProducts = this.filterRepeat(this.listProducts);
      console.log(products);
      this.indvProductStatus = true;
    })
    this.service.getFamily().then((families: family[]) => {
      //console.log(families);
      this.listFamily = families;
      this.prodFamilyStatus = true;
    })
    this.service.getSubFamily().then((subFamilies: subFamily[]) => {
      //console.log(subFamilies);
      this.listSubFamily = subFamilies;
      this.prodSubFamilyStatus = true;
    })
    this.service.getCategoria().then((categorias: subFamily[]) => {
      //console.log(categorias);
      this.listCategoria = categorias;
      this.prodCategoryStatus = true;
    })
    this.service.getSubCategoria().then((subCategorias: subFamily[]) => {
      //console.log(subCategorias);
      this.listSubCategoria = subCategorias;
      this.prodSubCategoryStatus = true;
    })
    this.service.getLifeCycle().then((lifeCycles: lifeCycle[]) => {
      //console.log(lifeCycles);
      this.listLifeCycle = lifeCycles;
      this.prodLifeCycleStatus = true;
    })
    this.service.getMainActivity().then((mainActivity: ipLevel[]) => {
      //console.log(lifeCycles);
      this.listMainActivity = mainActivity;
    })
    this.service.getSpeciality().then((speciality: ipLevel[]) => {
      //console.log(lifeCycles);
      this.listSpeciality = speciality;
    })
    this.service.getPriceGroup().then((priceGroup: priceGroup[]) => {
      //console.log(lifeCycles);
      this.listPriceGroup = priceGroup;
      this.prodPriceListStatus = true;
    })
    this.service.getProductUse().then((_productUse: productUse[]) => {
      //console.log(lifeCycles);
      this.listProductUse = _productUse;
      this.prodUseStatus = true;
    })
    this.service.getItemType().then((_itemType: itemType[]) => {
      //console.log(lifeCycles);
      this.listItemType = _itemType;
      this.prodTypeStatus = true;
    })
    this.service.getItemMark().then((_itemMark: itemMark[]) => {
      //console.log(lifeCycles);
      this.listItemMark = _itemMark;
      this.prodMarkStatus = true;
    })
    this.service.getCompanies().then((_companies: company[]) => {
      //console.log(lifeCycles);
      this.listCompanies = _companies;
    })

    this.listImgSize = [{ labelCode: 'S', label: 'Small', id: '_s_' }, { labelCode: 'M', label: 'Medium', id: '_m_' }, { labelCode: 'L', label: 'Large', id: '_l_' }, { labelCode: 'XL', label: 'Extra Large', id: '' }];
  }

  generateCatalog() {
    //this.filterProducts();
    if (this.listFamilySelected.length <= 0) {
      this.showWarn();
    } else {
      this.toggleBlocking("Generando Catálogo...");
      console.log("genere");
      let price_selected: any;
      let imgSize_selected: any;
      if (this.listPriceSelected.length == 0) {
        price_selected = 'AD';
      } else {
        price_selected = this.listPriceSelected.pop().priceId;
      }

      if (this.listImgSelected.length == 0) {
        imgSize_selected = '_l_';
      } else {
        imgSize_selected = this.listImgSelected.pop().id;
      }

      this.service.getPrices(this.getProductsCodes(), price_selected).then((_prices: price[]) => {
        //this.service.getPrices(this.getProductsCodes(), 'AA').then((_prices: price[]) => {
        this.listProductAttributes = _prices;

        this.listProductAttributes.forEach(element => {
          element.attributes.sort(function (a, b) {
            console.log(element.itemId);
            if (Number(a.price) > Number(b.price)) {
              console.log(a.price + '>' + b.price);
              return 1;
            };
            if (Number(a.price) < Number(b.price)) {
              console.log(a.price + '<' + b.price);
              return -1;
            };
            return 0;
          });
        });

        console.log(this.listProductAttributes);

        let mixed = [];

        this.listProductAttributes.forEach((itm, i) => {
          if (itm.attributes.length > 0) {
            mixed.push(Object.assign({}, itm, this.listIndvProdSelected[i]));
          }

        });

        // console.log(mergeById(this.listIndvProdSelected, this.listProductAttributes));
        console.log(mixed);

        this._data.data = {
          familyList: this.listFamilySelected,
          subFamilyList: this.listSubFamilySelected,
          categoryList: this.listCategorySelected,
          subCategoryList: this.listSubCategorySelected,
          productsList: mixed,//this.listIndvProdSelected, //Este es el que hacce display.
          lifeCycle: this.listLifeCycleSelected,
          mainActivity: this.listMainActivitySelected,
          speciality: this.listSpecialitySelected,
          historicoVenta: this.historicoVenta,
          spinner: this.spinner,
          allProducts: this.listProducts,
          productImgSize: imgSize_selected,
          prices: this.listProductAttributes,
          showPrices: this.selectedValuePrice
        }

        var doc = new jsPDF();

        // Set Fonts
        doc.setFontType("bold");
        doc.setTextColor(0, 0, 0);

        //SubCategory Title
        doc.setFontSize(30);
        doc.text("SubCategory", 20, 20);

        //Set Family tag
        doc.setFontSize(20);
        doc.setFillColor(8, 100, 139);
        doc.rect(185, 0, 15, 85, 'F');

        doc.text("Familia", 190, 10, { rotationDirection: "0", angle: "-90" });

        //Set SubFamily tag
        doc.setFillColor(8, 100, 139);
        doc.rect(185, 185, 15, 115, 'F');

        doc.text("SubFamilia", 190, 190, { rotationDirection: "0", angle: "-90" });


        let x = 20;
        let y = 40;
        var img;
        async function loadImage() {
          for (let index = 0; index < 4; index++) {
            let aux = mixed[index];
            img = await toDataURL('http://186.176.206.154:8088/images/Products/' + aux.productId + '_l_.PNG');
            console.log("si espere");
            //console.log(img);
            doc.addImage(img, 'PNG', x, y, 65, 65);
            if (x == 100) {
              x = 20;
              y += 130;
            }
            else {
              x += 80;
            }

          }

          doc.save('a4.pdf');
        }

        //loadImage();

        console.log("ya salve");
        //doc.save('a4.pdf');
        this.blockUI.stop();
        this.router.navigate(['/catalog']);

      });
    }
  }

  ngAfterViewInit() {

  }

  getLowerLevel() {
    if (this.listSubCategorySelected.length > 0) { return "subCategory" };
    if (this.listCategorySelected.length > 0) { return "category" };
    if (this.listSubFamilySelected.length > 0) { return "subFamily" };
    if (this.listFamilySelected.length > 0) { return "family" };
  }

  getList(list: string) {
    switch (list) {
      case "family": { return this.listFamilySelected; }
      case "subFamily": { return this.listSubFamilySelected; }
      case "category": { return this.listCategorySelected; }
      case "subCategory": { return this.listSubCategorySelected; }
      default: { return [] };
    }
  }

  filterRepeat(lista: any[]) {
    let temp: any[] = [];
    lista.forEach(product => {
      if (!temp.some(e => e.productId == product.productId)) {
        temp.push(product);
      }
    });
    return temp;
  }

  getProductsCodes() {
    let productCodes: string[] = [];
    console.log(this.listIndvProdSelected);
    this.listIndvProdSelected.forEach(element => {
      productCodes.push(element.productId);
    });
    return productCodes;
  }

  updateFilters(filter: any[]) {
    filter.forEach(element => {
      let position = this.filtersToApply.findIndex(i => i.name == element.parent_id);
      if (position != -1) {
        this.filtersToApply.splice(position, 1, element);
      } else {
        this.filtersToApply.push(element);
      }
    });
  }

  getHierarchy(name: string) {
    if (this.listFamily.some((e => e.name == name))) {
      return "family";
    }
    if (this.listSubFamily.some((e => e.name == name))) {
      return "subFamily";
    }
    if (this.listCategoria.some((e => e.name == name))) {
      return "category";
    }
    if (this.listSubCategoria.some((e => e.name == name))) {
      return "subCategory";
    }
  }

}

function toDataURL(url) {
  let promise = new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        console.log("fucion primero");
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