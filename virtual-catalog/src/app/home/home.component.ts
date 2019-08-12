import { Component, OnInit } from '@angular/core';
import { ServiceVirtualCatalogService } from '../service-virtual-catalog.service';
import { family } from '../classes/family';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
