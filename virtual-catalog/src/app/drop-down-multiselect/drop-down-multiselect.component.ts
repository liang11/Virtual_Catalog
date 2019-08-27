import { Component, OnInit, Input, EventEmitter, Output, OnChanges, ViewEncapsulation } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'drop-down-multiselect',
  templateUrl: './drop-down-multiselect.component.html',
  styleUrls: ['./drop-down-multiselect.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DropDownMultiselectComponent implements OnChanges {

  @Input() public listData: { id: number, parent_id: string, name: string }[] = [];
  @Output() public listDataOutput = new EventEmitter();

  optionList: SelectItem[] = [];

  @Input() public selectedItems: any[] = [];
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
        this.optionList.push({ label: element.name, value: element });
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
