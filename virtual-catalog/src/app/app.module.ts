import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {MultiSelectModule} from 'primeng/multiselect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FilterComponent } from './filter/filter.component';
import { DropDownMultiselectComponent } from './drop-down-multiselect/drop-down-multiselect.component';
import { ServiceVirtualCatalogService } from './service-virtual-catalog.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    CarouselComponent,
    FilterComponent,
    DropDownMultiselectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgMultiSelectDropDownModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    BrowserAnimationsModule
  ],
  providers: [ServiceVirtualCatalogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
