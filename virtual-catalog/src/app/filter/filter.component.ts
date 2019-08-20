import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ServiceVirtualCatalogService } from '../service-virtual-catalog.service';
import { family } from '../classes/family';
import { subFamily } from '../classes/subFamily';
import { DataStorage } from '../Service/DataStorage';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, AfterViewInit {

  listFamily: any[] = [];
  listSubFamily: any[] = [];
  listCategoria: any[] = [];
  listSubCategoria: any[] = [];
  listSubFamilyFiltered: any[] = [];
  listCategoryFiltered: any[] = [];
  listSubCategoryFiltered: any[] = [];

  listFamilySelected: any[] = [];
  listSubFamilySelected: any[] = [];
  listCategorySelected: any[] = [];
  listSubCategorySelected: any[] = [];

  selectedValue: string = "No";
  property: string = ""
  spinner: number = 4;

  constructor(private service: ServiceVirtualCatalogService, private _data: DataStorage) {
  }

  selectedFamilies(data: family[]) {
    //console.log("Recibi lo siguiente:");;
    this.listFamilySelected = data;
    this.listSubFamilyFiltered = [];
    let temp: any[] = [];
    //console.log(this.listFamilySelected);
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
    //console.log("selectedSubFamilies");
    this.listSubFamilySelected = data;
    this.listCategoryFiltered = [];
    let temp: any[] = [];
    //console.log(this.listSubFamilySelected);
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
    //console.log("selectedCategories");
    this.listCategorySelected = data;
    this.listSubCategoryFiltered = [];
    let temp: any[] = [];
    //console.log(this.listCategorySelected);
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
    // console.log("entre a carga subcategorias");
    // console.log(data);
    this.listSubCategorySelected = data;
  }

  ngOnInit() {
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
  }

  generateCatalog() {
    console.log("Generando Catálogo...");
    console.log("Familias");
    console.log(this.listFamilySelected);
    console.log("SubFamilias");
    console.log(this.listSubFamilySelected);
    console.log("Categorías");
    console.log(this.listCategorySelected);
    console.log("SubCategorías");
    console.log(this.listSubCategorySelected);
    console.log("Producto Nuevo");
    console.log(this.selectedValue);
    console.log("Items por página");
    console.log(this.spinner);
    console.log(this.property);

    this._data.data = {
      familyList: this.listFamilySelected,
      subFamilyList: this.listSubFamilySelected,
      categoryList: this.listCategorySelected,
      subCategoryList: this.listSubCategorySelected,
      selectedValue: this.selectedValue,
      spinner: this.spinner
    }
  }

  ngAfterViewInit() {

  }

}
