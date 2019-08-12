import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


@Component({
  selector: 'drop-down-multiselect',
  templateUrl: './drop-down-multiselect.component.html',
  styleUrls: ['./drop-down-multiselect.component.css']
})
export class DropDownMultiselectComponent implements OnChanges {

  @Input() public listData: { id: number, parent_id: string, name: string }[] = [];
  @Output() public listDataOutput = new EventEmitter();

  optionList: SelectItem[] = [];

  selectedItems: { id: number, parent_id: string, name: string }[] = [];
  dropdownSettings = {};

  constructor() {
  }

  onItemSelect() {
    let tempList: any[] = [];
    this.selectedItems.forEach(element => {
      tempList.push(this.listData.filter((data) => data.id == element.id).pop());
    });
    console.log("Envie los seleccionados:");
    console.log(this.selectedItems);
    this.listDataOutput.emit(this.selectedItems);
  }

  ngOnChanges(changes): void {
    if (changes.listData) {
      let temp: any[] = [];
      console.log("OnChange");
      this.optionList = [];
      //this.selectedItems = [];
      this.listData.forEach(element => {
        this.optionList.push({ label: element.name, value: element });
      });
      this.selectedItems.forEach(element => {
        temp.concat(this.listData.filter((data) => data.name == element.parent_id));
      })
      //this.selectedItems = temp;
      console.log(temp);
      console.log("Selecteditems!!!!!!!!!!!!!!!!!11");
      console.log(this.selectedItems);
    }
  }
}
