import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ServiceVirtualCatalogService } from '../service-virtual-catalog.service';
import { family } from '../classes/family';
import { subFamily } from '../classes/subFamily';

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

  constructor(private service: ServiceVirtualCatalogService) {
  }

  selectedFamilies(data: family[]) {
    console.log("Recibi lo siguiente:");
    console.log(data);
    this.listSubFamilyFiltered = [];
    data.forEach(element => {
      this.listSubFamily.filter((item: subFamily) => element.name == item.parent_id).forEach(item => {
        this.listSubFamilyFiltered.push(item);
      });
    });
    console.log("ListSubFamily");
    console.log(this.listSubFamilyFiltered);
  }

  selectedSubFamilies(data: subFamily[]) {
    // console.log("entre cateogira");
    // console.log(data);
    this.listCategoryFiltered = [];
    data.forEach(element => {
      this.listCategoria.filter((item: subFamily) => element.name == item.parent_id).forEach(item => {
        this.listCategoryFiltered.push(item);
        //console.log(item);
      });
    });
  }

  selectedCategories(data: subFamily[]) {
    console.log("entre cateogira");
    console.log(data);
    this.listSubCategoryFiltered = [];
    data.forEach(element => {
      this.listSubCategoria.filter((item: subFamily) => element.name == item.parent_id).forEach(item => {
        this.listSubCategoryFiltered.push(item);
      });
    });
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

  ngAfterViewInit() {

  }

}
