import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ServiceVirtualCatalogService } from '../service-virtual-catalog.service';
import { family } from '../classes/family';
import { subFamily } from '../classes/subFamily';
import { DataStorage } from '../Service/DataStorage';
import { product } from '../classes/product';
import { lifeCycle } from '../classes/lifeCycle';
import { ipLevel } from '../classes/ipLevel';
import { priceGroup } from '../classes/priceGroup';

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

  listSubFamilyFiltered: any[] = [];
  listCategoryFiltered: any[] = [];
  listSubCategoryFiltered: any[] = [];
  listProductFiltered: any[] = [];
  listIndividualProducts: any[] = [];

  listFamilySelected: any[] = [];
  listSubFamilySelected: any[] = [];
  listCategorySelected: any[] = [];
  listSubCategorySelected: any[] = [];
  listProductsSelected: any[] = [];
  listMainActivitySelected: any[] = [];
  listSpecialitySelected: any[] = [];
  listLifeCycleSelected: any[] = [];
  listIndvProdSelected: any[] = [];

  historicoVenta: string = "No";
  selectedValuePrice: string = "No";
  selectedValueDescripcion: string = "No";
  selectedValuePromocion: string = "No";
  selectedValuePriceList: string = "Other";
  selectedValueSize: string = "S";
  property: string = ""
  spinner: number = 4;

  constructor(private service: ServiceVirtualCatalogService, private _data: DataStorage) { }

  selectedFamilies(data: family[]) {
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
    this.filterIndividualProducts();
  }

  selectedProducts(data: any[]) {
    this.listIndvProdSelected = data;
  }

  selectedLifeCycle(data: any[]) {
    this.listLifeCycleSelected = data;
  }

  selectedMainActivity(data: any[]) {
    this.listMainActivitySelected = data;
  }

  selectedSpeciality(data: any[]) {
    this.listSpecialitySelected = data;
  }

  filterProducts() {
    let temp = [];
    this.listProductFiltered = [];
    let lowerLevel = this.getLowerLevel();
    temp = this.getList(lowerLevel);

    temp.forEach(element => {
      this.listProducts.filter((item) => item.getAttribute(lowerLevel) == element.name).forEach(product => {
        if (!this.listProductFiltered.some(e => e.productId == product.productId)) {
          this.listProductFiltered.push(product);
        }
      });
    });

    this.listIndvProdSelected.forEach(element => {
      if(!this.listProductFiltered.some(e => element.productId == e.productId)) {
        this.listProductFiltered.push(element);
      }
    });
  }

  filterIndividualProducts() {
    let temp = [];
    let aux = [];
    this.listIndividualProducts = [];
    let lowerLevel = this.getLowerLevel();
    temp = this.getList(lowerLevel);

    if (temp.length > 0) {
      this.listProducts.forEach(element => {
        if(!temp.some(e => e.name == element.getAttribute(lowerLevel))) {
          if(!this.listIndividualProducts.some(item => item.productId == element.productId)) {
            this.listIndividualProducts.push(element);
          }
        }
      });

      this.listIndvProdSelected.forEach(element => {
        if(!temp.some(e => e.name == element.getAttribute(lowerLevel))) {
          aux.push(element);
        }
      });

      this.listIndvProdSelected = aux;
      console.log(this.listIndvProdSelected);
    } else {
      this.listIndividualProducts = this.filterRepeat(this.listProducts);
    }

  }

  ngOnInit() {
    this.service.getProduct().then((products: product[]) => {
      this.listProducts = products;
      this.listIndividualProducts = this.filterRepeat(this.listProducts);
      console.log(products);
    })
    this.service.getFamily().then((families: family[]) => {
      //console.log(families);
      this.listFamily = families;
    })
    this.service.getSubFamily().then((subFamilies: subFamily[]) => {
      //console.log(subFamilies);
      this.listSubFamily = subFamilies;
    })
    this.service.getCategoria().then((categorias: subFamily[]) => {
      //console.log(categorias);
      this.listCategoria = categorias;
    })
    this.service.getSubCategoria().then((subCategorias: subFamily[]) => {
      //console.log(subCategorias);
      this.listSubCategoria = subCategorias;
    })
    this.service.getLifeCycle().then((lifeCycles: lifeCycle[]) => {
      //console.log(lifeCycles);
      this.listLifeCycle = lifeCycles;
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
    })
  }

  generateCatalog() {
    this.filterProducts();
    console.log("genere");
    // console.log("Generando Catálogo...");
    // console.log("Familias");
    // console.log(this.listFamilySelected);
    // console.log("SubFamilias");
    // console.log(this.listSubFamilySelected);
    // console.log("Categorías");
    // console.log(this.listCategorySelected);
    // console.log("SubCategorías");
    // console.log(this.listSubCategorySelected);
    // console.log("Producto Nuevo");
    // console.log(this.historicoVenta);
    // console.log("Items por página");
    // console.log(this.spinner);
    // console.log(this.property);
    // console.log(this.listProductsSelected);

    this._data.data = {
      familyList: this.listFamilySelected,
      subFamilyList: this.listSubFamilySelected,
      categoryList: this.listCategorySelected,
      subCategoryList: this.listSubCategorySelected,
      productsList: this.listProductFiltered,
      lifeCycle: this.listLifeCycleSelected,
      mainActivity: this.listMainActivitySelected,
      speciality: this.listSpecialitySelected,
      historicoVenta: this.historicoVenta,
      spinner: this.spinner,
      products: this.listProductsSelected,
      allProducts: this.listProducts
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

}
