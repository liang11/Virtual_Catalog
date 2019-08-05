import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'drop-down-multiselect',
  templateUrl: './drop-down-multiselect.component.html',
  styleUrls: ['./drop-down-multiselect.component.css']
})
export class DropDownMultiselectComponent implements OnInit {

  constructor() { }

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Alimentos' },
      { item_id: 2, item_text: 'Bebidas' },
      { item_id: 3, item_text: 'Cuidado Personal' },
      { item_id: 4, item_text: 'Cuidado del Hogar' }
      //{ item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 1, item_text: 'Alimentos' },
      { item_id: 2, item_text: 'Bebidas' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
