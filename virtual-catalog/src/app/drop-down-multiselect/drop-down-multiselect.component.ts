import { Component, Input, EventEmitter, Output, OnChanges, ViewEncapsulation } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'drop-down-multiselect',
  templateUrl: './drop-down-multiselect.component.html',
  styleUrls: ['./drop-down-multiselect.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DropDownMultiselectComponent implements OnChanges {

  @Input() public listData: any[];//{ id: number, parent_id: string, name: string }[] = [];
  @Input() public selectedItems: any[] = [];
  @Input() public disable: boolean = false;
  @Output() public listDataOutput = new EventEmitter();

  optionList: SelectItem[] = [];

  dropdownSettings = {};

  constructor() {
  }

  onItemSelect() {
    let tempList: any[] = [];
    this.selectedItems.forEach(element => {
      tempList.push(this.listData.filter((data) => data.id == element.id).pop());
    });
    // console.log("Envie los seleccionados:");
    // console.log(this.selectedItems);
    this.listDataOutput.emit(tempList);
  }

  ngOnChanges(changes): void {
    if (changes.listData) {
      //console.log("OnChange");
      this.optionList = [];
      this.listData.forEach(element => {
        this.optionList.push({ label: element.label, value: element });
        this.optionList.sort(function (a, b) {
          if (a.label > b.label) {
            return 1;
          }
          if (a.label < b.label) {
            return -1;
          }
          return 0;
        });
      });
    }
  }

}
