import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {MultiSelectModule} from 'primeng/multiselect';
import {RadioButtonModule} from 'primeng/radiobutton';
import {SpinnerModule} from 'primeng/spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FieldsetModule} from 'primeng/fieldset';
import {TooltipModule} from 'primeng/tooltip';
import {DialogModule} from 'primeng/dialog';
import { NgxBarcodeModule } from 'ngx-barcode';
import {DataViewModule} from 'primeng/dataview';
import { PaginationModule } from 'ngx-bootstrap/pagination';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FilterComponent } from './filter/filter.component';
import { DropDownMultiselectComponent } from './drop-down-multiselect/drop-down-multiselect.component';
import { ServiceVirtualCatalogService } from './service-virtual-catalog.service';
import { CatalogComponent } from './catalog/catalog.component';
import { DataStorage } from './Service/DataStorage';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    CarouselComponent,
    FilterComponent,
    DropDownMultiselectComponent,
    CatalogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    BrowserAnimationsModule,
    RadioButtonModule,
    SpinnerModule,
    FieldsetModule,
    TooltipModule,
    DialogModule,
    NgxBarcodeModule,
    DataViewModule,
    PaginationModule
  ],
  providers: [ServiceVirtualCatalogService, DataStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
