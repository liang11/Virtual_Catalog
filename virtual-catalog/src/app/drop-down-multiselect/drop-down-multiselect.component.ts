import { Component, Input, EventEmitter, Output, OnChanges, ViewEncapsulation } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'drop-down-multiselect',
  templateUrl: './drop-down-multiselect.component.html',
  styleUrls: ['./drop-down-multiselect.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DropDownMultiselectComponent implements OnChanges {

  @Input() public listData: any[];                      // Lista de datos de entrada desde el componente 'Filter'.
  @Input() public selectedItems: any[] = [];            // Lista de los productos seleccionados.
  @Input() public disable: boolean = false;             // Booleano de desabilitar/habilitar el componente.
  @Input() public uniqueSelection: number = null;       // Permitir seleción única o no.
  @Output() public listDataOutput = new EventEmitter(); // Evento para pasar el output al componente de 'Filter'.

  optionList: SelectItem[] = [];                        // Lista que contiene los datos que va a mostrar el dropdown.

  dropdownSettings = {};

  constructor() { }

  // Evento de cuando se selecciona una opción del dropdown.
  // returns -- llamada al evento de emit() que manda la lista de seleccionados.
  onItemSelect() {
    let tempList: any[] = [];
    this.selectedItems.forEach(element => {
      tempList.push(this.listData.filter((data) => data.id == element.id).pop());
    });
    console.log("Seleccionaron lo siguiente:", tempList);
    this.listDataOutput.emit(tempList);
  }

  // Evento para escuchar cuando el input 'listData' cambia, para actualizar el valor.
  // @param changes -- any[] lista de listaData que proviene desde el componente 'filter' cuando ya cargo los datos
  ngOnChanges(changes): void {
    if (changes.listData) {
      this.optionList = [];
      this.listData.forEach(element => {
        // Asigna el valor y la etiqueta que va a mostrar el dropwdown.
        this.optionList.push({ label: element.label, value: element });
        // Ordeno alfabeticamente.
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
