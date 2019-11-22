import { Component, OnInit } from '@angular/core';
import { ServiceVirtualCatalogService } from '../service-virtual-catalog.service';
import { hierarchy } from '../classes/hierarchy';
import { DataStorage } from '../Service/DataStorage';
import { product } from '../classes/product';
import { lifeCycle } from '../classes/lifeCycle';
import { ipLevel } from '../classes/ipLevel';
import { priceGroup } from '../classes/priceGroup';
import { productUse } from '../classes/productUse';
import { itemType } from '../classes/itemType';
import { itemMark } from '../classes/itemMark';
import { company } from '../classes/company';
import { price } from '../classes/price';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  listaAllProducts: any[] = [];         // Todos los productos.
  listFamily: any[] = [];               // Todas las familias.
  listSubFamily: any[] = [];            // Todas las subFamlias.
  listCategoria: any[] = [];            // Todas las categorias.
  listSubCategoria: any[] = [];         // Todas las subCategorias.
  listMainActivity: any[] = [];         // Todos los mainActivity(IP).
  listSpeciality: any[] = [];           // Todas las especialidades(IP).
  listLifeCycle: any[] = [];            // Todos los lifeCycle.
  listPriceGroup: any[] = [];           // Todos las listas de precios.
  listProductUse: any[] = [];           // Todos los usos de productos.
  listImgSize: any[] = [];              // Todos los tamaños de las imágenes.
  listItemType: any[] = [];             // Todos los tipos de artículos.
  listItemMark: any[] = [];             // Todas las marcas de artículos.
  listCompanies: any[] = [];            // Todas las compañías.

  listProductAttributes: any[] = [];    // Lista de productos con su respectiva lista de atributos(unidad, precio, cod.barra). 

  listSubFamilyFiltered: any[] = [];    // Lista de subFamilias dependiendo de las familias seleccionadas.
  listCategoryFiltered: any[] = [];     // Lista de categorias dependiendo de las subFamilias seleccionadas.
  listSubCategoryFiltered: any[] = [];  // Lista de subCategorias dependiendo de las categorias seleccionadas.
  listIndvProductsFiltered: any[] = []; // Lista de productos que calzan con los filtros.

  listFamilySelected: any[] = [];       // Lista de familias seleccionadas.
  listSubFamilySelected: any[] = [];    // Lista de subFamilias seleccionadas.
  listCategorySelected: any[] = [];     // Lista de categorias seleccionadas.
  listSubCategorySelected: any[] = [];  // Lista de subCategorias seleccionadas.
  listMainActivitySelected: any[] = []; // Lista de mainActivity seleccionadas.
  listSpecialitySelected: any[] = [];   // Lista de speciality seleccionadas.
  listLifeCycleSelected: any[] = [];    // Lista de lifeCycle seleccionadas.
  listIndvProdSelected: any[] = [];     // Lista de prodIndividuales seleccionadas.
  listImgSelected: any[] = [];          // Lista de tamaño de imgágen seleccionada.
  listItemTypeSelected: any[] = [];     // Lista de tipo de item seleccionado.
  listProdUseSelected: any[] = [];      // Lista de uso de producto selecionnado.
  listMarkSelected: any[] = [];         // Lista de marcas seleccionadas.
  listPriceSelected: any[] = [];        // Lista de grupo de precio seleccionado.
  companySelected: any = [];            // Lista de compañia seleccionada.

  rb_historicoVenta: string = "No";     // Radiobutton seleccionado para histórico de ventas(Si, No, Todos).
  rd_showPrice: string = "No";          // Radiobutton seleccionado para mostrar precios(Si, No).
  rd_showDescription: string = "No";    // Radiobutton seleccionado para mostrar descripción(Si, No). 
  rd_showPromotions: string = "No";     // Radiobutton seleccionado para mostrar promociones(Si, No).
  rd_priceList: string = "Other";       // Radiobutton selecionnado para escoger lista de precios(Cliente, Dirección, Otro).                  

  spinner: number = 4;                  // Cantidad de itemsxpágina.
  txt_client = '';                      // Código del cliente para habilitar IP.
  txt_historic = '';                    // Código del cliente para habilitar histórico.
  bool_client: boolean = true;          // Habilitar/Deshabilitar selecciones sobre IP.
  bool_historic: boolean = true;        // Habilitar/Deshabilitar selecciones sobre histórico.
  filtersToApply: any[] = [];           // Lista temporal que contiene los filtros a aplicar sobre los productos.

  // Flags para saber cuando ya terminaron los web services y ya se cargaron en la aplicación.
  prodTypeStatus: boolean = false;
  prodMarkStatus: boolean = false;
  prodUseStatus: boolean = false;
  prodLifeCycleStatus: boolean = false;
  prodFamilyStatus: boolean = false;
  prodSubFamilyStatus: boolean = false;
  prodCategoryStatus: boolean = false;
  prodSubCategoryStatus: boolean = false;
  prodSubSubCategoryStatus: boolean = false;
  prodPriceListStatus: boolean = false;
  indvProductStatus: boolean = false;

  @BlockUI() blockUI: NgBlockUI;

  constructor(private service: ServiceVirtualCatalogService, private _data: DataStorage,
    public router: Router, private messageService: MessageService) { }

  // Pop-up warning cuando se intenta generar un catálogo sin haber escogido mínimo una familia para mostrar.
  showWarn() {
    this.messageService.add({
      severity: 'warn', summary: 'Atención!',
      detail: 'Seleccione como mínimo una familia de productos.'
    });
  }

  // Función que bloque la pantalla cuando se está generando el catálogo.
  // @param message -- mensaje a desplegar mientras la pantalla esta bloqueada
  toggleBlocking(message?: string) {
    this.blockUI.start(message);
  }

  // Función cuando se selecciona una familia, se actualizan en cascada la jerarquía
  // dependiendo de la selección.
  // @param data -- Lista de familias seleccionadas que vienen desde el componente 'drop-down-multiselect'
  selectedFamilies(data: hierarchy[]) {
    console.log("Selected families", data);

    this.listFamilySelected = data;
    this.listSubFamilyFiltered = [];
    let temp: any[] = [];

    this.listFamilySelected.forEach(element => {
      this.listSubFamily.filter((item: hierarchy) => item.parent_id == element.name).forEach(item => {
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

  // Función cuando se selecciona una subFamilia, se actualizan en cascada la jerarquía
  // dependiendo de la selección.
  // @param data -- Lista de subFamilias seleccionadas que vienen desde el componente 'drop-down-multiselect'
  selectedSubFamilies(data: hierarchy[]) {
    console.log("Selected subFamilies", data);

    this.listSubFamilySelected = data;
    this.listCategoryFiltered = [];
    let temp: any[] = [];

    this.listSubFamilySelected.forEach(element => {
      this.listCategoria.filter((item: hierarchy) => item.parent_id == element.name).forEach(item => {
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

  // Función cuando se selecciona una categoria, se actualizan en cascada la jerarquía
  // dependiendo de la selección.
  // @param data -- Lista de cateogorias seleccionadas que vienen desde el componente 'drop-down-multiselect'
  selectedCategories(data: hierarchy[]) {
    console.log("Selected categories", data);

    this.listCategorySelected = data;
    this.listSubCategoryFiltered = [];
    let temp: any[] = [];

    data.forEach(element => {
      this.listSubCategoria.filter((item: hierarchy) => item.parent_id == element.name).forEach(item => {
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

  // Función cuando se selecciona una subCategoria, al ser el íltimo nivel de la jerarquía 
  // entonces procede filtrar los productos individuales. 
  // @param data -- Lista de subCategorias seleccionadas que vienen desde el componente 'drop-down-multiselect'
  selectedSubCategories(data: hierarchy[]) {
    console.log("Selected subCategories", data);
    this.listSubCategorySelected = data;

    this.filterProducts();
  }

  // Actualiza la lista de productos seleccionados.
  // @param data -- Lista de productos seleccionadas que vienen desde el componente 'drop-down-multiselect'
  selectedProducts(data: any[]) {
    console.log("Selected products", data);
    this.listIndvProdSelected = data;
  }

  // Actualiza la lista de compañia seleccionada.
  // @param data -- Lista de compañias seleccionadas que vienen desde el componente 'drop-down-multiselect'
  selectedCompany(data: any[]) {
    console.log("Selected Company", data);
    this.companySelected = data;
  }

  // Actualiza la lista de ciclo de vida seleccionada y los productos que cumplan con esa selección.
  // @param data -- Lista de lifeCycle seleccionadas que vienen desde el componente 'drop-down-multiselect'
  selectedLifeCycle(data: any[]) {
    console.log("Seleccted lifeCycle", data);
    this.listLifeCycleSelected = data;

    this.filterProducts();
  }

  // Actualiza la lista de principal actividad comercial seleccionada.
  // @param data -- Lista de mainActivity seleccionadas que vienen desde el componente 'drop-down-multiselect'
  selectedMainActivity(data: any[]) {
    console.log("Selected mainActivity", data);
    this.listMainActivitySelected = data;
  }

  // Actualiza la lista de especialidad seleccionada.
  // @param data -- Lista de speciality seleccionadas que vienen desde el componente 'drop-down-multiselect'
  selectedSpeciality(data: any[]) {
    //console.log("Selected speciality", data);
    this.listSpecialitySelected = data;
  }

  // Actualiza la lista de tamaño de imagen seleccionada.
  // @param data -- Lista de imgSize seleccionada que vienen desde el componente 'drop-down-multiselect'
  selectedImgSize(data: any[]) {
    console.log("Selected imgSize", data);
    this.listImgSelected = data;
  }

  // Actualiza la lista de tipo de item seleccionada y los productos que cumplan con esa selección.
  // @param data -- Lista de itemType seleccionadas que vienen desde el componente 'drop-down-multiselect'
  selectedItemType(data: any[]) {
    console.log("Selected itemType", data);
    this.listItemTypeSelected = data;

    this.filterProducts();
  }

  // Actualiza la lista de uso del producto seleccionada y los productos que cumplan con esa selección.
  // @param data -- Lista de productUse seleccionadas que vienen desde el componente 'drop-down-multiselect'
  selectedUseProduct(data: any[]) {
    console.log("Selected product use", data);
    this.listProdUseSelected = data;

    this.filterProducts();
  }

  // Actualiza la lista de marcas seleccionada y los productos que cumplan con esa selección.
  // @param data -- Lista de itemMark seleccionadas que vienen desde el componente 'drop-down-multiselect'
  selectedMark(data: any[]) {
    console.log("Selected marks", data);
    this.listMarkSelected = data;

    this.filterProducts();
  }

  // Actualiza la lista de precios seleccionada.
  // @param data -- Lista de priceList seleccionadas que vienen desde el componente 'drop-down-multiselect'
  selectedPrice(data: any[]) {
    console.log("Selected priceList", data);
    this.listPriceSelected = data;
  }

  // Filtra la lista de productos con todos los criterios escogidos.
  filterProducts() {
    let universe = this.listaAllProducts;
    let listProductFiltered = [];

    // Revisa si hay seleccionado algo en itemType, y lo filtra.
    if (this.listItemTypeSelected.length > 0) {
      let aux: any = [];
      this.listItemTypeSelected.forEach(element => {
        aux = aux.concat(universe.filter((e) => e.itemType == element.name));
      });
      universe = aux;
    }

    // Revisa si hay seleccionado algo en productUse, y lo filtra.
    if (this.listProdUseSelected.length > 0) {
      let aux: any = [];
      this.listProdUseSelected.forEach(element => {
        aux = aux.concat(universe.filter((e) => e.productUse == element.productUseId));
      });
      universe = aux;
    }

    // Revisa si hay seleccionado algo en itemMark, y lo filtra.
    if (this.listMarkSelected.length > 0) {
      let aux: any = [];
      this.listMarkSelected.forEach(element => {
        aux = aux.concat(universe.filter((e) => e.itemMark == element.name));
      });
      universe = aux;
    }

    // Revisa si hay seleccionado algo en lifeCycle, y lo filtra.
    if (this.listLifeCycleSelected.length > 0) {
      let aux: any = [];
      this.listLifeCycleSelected.forEach(element => {
        aux = aux.concat(universe.filter((e) => e.lifeCycle == element.lifeCycleId));
      });
      universe = aux;
    }

    // Genera una lista de todos los filtros a nivel de jerarquías y luego los aplica
    // sobre la lista de todos los productos.
    this.filtersToApply = this.listFamilySelected.slice(0);
    this.updateFilters(this.listSubFamilySelected);
    this.updateFilters(this.listCategorySelected);
    this.updateFilters(this.listSubCategorySelected);

    this.filtersToApply.forEach(element => {
      universe.filter((item) => item.getAttribute(this.getHierarchy(element.name)) == element.name).forEach(product => {
        if (!listProductFiltered.some(e => e.productId == product.productId)) {
          listProductFiltered.push(product);
        }
      });
    });

    this.listIndvProductsFiltered = listProductFiltered;
    this.listIndvProdSelected = this.listIndvProductsFiltered;
  }

  // Revisa si el código del cliente existe.
  checkClient() {
    // Llamada al web service para verificar código de cliente y habilitar los campos respectivos.
    console.log(this.txt_client);
    console.log(this.txt_historic);

    this.bool_client = false;
    this.bool_historic = false;
  }

  // Revisa si la entrada de texto para el código del cliente esta vacía, para habilitar y desabilitar 
  // ciertos componentes respectivos.
  checkEmpty() {
    if (!(this.txt_client.length > 0)) {
      // this.bool_client = false;
      // this.bool_historic = false;
    }
  }

  // Revisa si la variable ya existe dentro del Application.sessionStorage.
  // @param variable -- key value para revisar si exsite en sessionStorage
  // return -- boolean dependiendo si existe o no.
  checkSessionExistance(variable: String) {
    for (let index = 0; index < sessionStorage.length; index++) {
      let key = sessionStorage.key(index);
      if (key == variable) {
        return false;
      }
    }
    return true;
  }

  // Hace las llamadas a todoso los web-services y carga los datos.
  ngOnInit() {
    this.service.test('alo').then((aux: string) => {
      console.log(aux);
    })
    if (true) {//(this.checkSessionExistance('indvProduct')) {
      console.log('if');
      this.service.getProduct().then((products: product[]) => {
        this.listaAllProducts = products;
        sessionStorage.setItem('indvProduct', JSON.stringify(this.listaAllProducts));
        console.log(products);
        this.indvProductStatus = true;
      })
    } else {
      console.log('else');
      this.listaAllProducts = JSON.parse(sessionStorage.getItem('indvProduct'));
      console.log(this.listaAllProducts);
      this.indvProductStatus = true;
    }

    if (true) {//(this.checkSessionExistance('family')) {
      this.service.getFamily().then((families: hierarchy[]) => {
        this.listFamily = families;
        sessionStorage.setItem('family', JSON.stringify(this.listFamily));
        this.prodFamilyStatus = true;
      })
    } else {
      this.listFamily = JSON.parse(sessionStorage.getItem('family'));
      this.prodFamilyStatus = true;
    }

    if (true) {//(this.checkSessionExistance('subFamily')) {
      this.service.getSubFamily().then((subFamilies: hierarchy[]) => {
        this.listSubFamily = subFamilies;
        sessionStorage.setItem('subFamily', JSON.stringify(this.listSubFamily));
        this.prodSubFamilyStatus = true;
      })
    } else {
      this.listSubFamily = JSON.parse(sessionStorage.getItem('subFamily'));
      this.prodSubFamilyStatus = true;
    }

    if (true) {//(this.checkSessionExistance('category')) {
      this.service.getCategoria().then((categorias: hierarchy[]) => {
        this.listCategoria = categorias;
        sessionStorage.setItem('category', JSON.stringify(this.listCategoria));
        this.prodCategoryStatus = true;
      })
    } else {
      this.listCategoria = JSON.parse(sessionStorage.getItem('category'));
      this.prodCategoryStatus = true;
    }

    if (true) {//(this.checkSessionExistance('subCategory')) {
      this.service.getSubCategoria().then((subCategorias: hierarchy[]) => {
        this.listSubCategoria = subCategorias;
        sessionStorage.setItem('subCategory', JSON.stringify(this.listSubCategoria));
        this.prodSubCategoryStatus = true;
      })
    } else {
      this.listSubCategoria = JSON.parse(sessionStorage.getItem('subCategory'));
      this.prodSubCategoryStatus = true;
    }

    if (true) {//(this.checkSessionExistance('lifeCycle')) {
      this.service.getLifeCycle().then((lifeCycles: lifeCycle[]) => {
        this.listLifeCycle = lifeCycles;
        sessionStorage.setItem('lifeCycle', JSON.stringify(this.listLifeCycle));
        this.prodLifeCycleStatus = true;
      })
    } else {
      this.listLifeCycle = JSON.parse(sessionStorage.getItem('lifeCycle'));
      this.prodLifeCycleStatus = true;
    }

    if (true) {//(this.checkSessionExistance('priceGroup')) {
      this.service.getPriceGroup().then((priceGroup: priceGroup[]) => {
        this.listPriceGroup = priceGroup;
        sessionStorage.setItem('priceGroup', JSON.stringify(this.listPriceGroup));
        this.prodPriceListStatus = true;
      })
    } else {
      this.listPriceGroup = JSON.parse(sessionStorage.getItem('priceGroup'));
      this.prodPriceListStatus = true;
    }

    if (true) {//(this.checkSessionExistance('productUse')) {
      this.service.getProductUse().then((_productUse: productUse[]) => {
        this.listProductUse = _productUse;
        sessionStorage.setItem('productUse', JSON.stringify(this.listProductUse));
        this.prodUseStatus = true;
      })
    } else {
      this.listProductUse = JSON.parse(sessionStorage.getItem('productUse'));
      this.prodUseStatus = true;
    }

    if (true) {//(this.checkSessionExistance('itemType')) {
      this.service.getItemType().then((_itemType: itemType[]) => {
        this.listItemType = _itemType;
        sessionStorage.setItem('itemType', JSON.stringify(this.listItemType));
        this.prodTypeStatus = true;
      })
    } else {
      this.listItemType = JSON.parse(sessionStorage.getItem('itemType'));
      this.prodTypeStatus = true;
    }

    if (true) {//(this.checkSessionExistance('itemMark')) {
      this.service.getItemMark().then((_itemMark: itemMark[]) => {
        this.listItemMark = _itemMark;
        sessionStorage.setItem('itemMark', JSON.stringify(this.listItemMark));
        this.prodMarkStatus = true;
      })
    } else {
      this.listItemMark = JSON.parse(sessionStorage.getItem('itemMark'));
      this.prodMarkStatus = true;
    }

    this.service.getMainActivity().then((mainActivity: ipLevel[]) => {
      //console.log(lifeCycles);
      this.listMainActivity = mainActivity;
    })
    this.service.getSpeciality().then((speciality: ipLevel[]) => {
      //console.log(speciality);
      this.listSpeciality = speciality;
    })

    this.service.getCompanies().then((_companies: company[]) => {
      //console.log(lifeCycles);
      this.listCompanies = _companies;
    })

    this.listImgSize = [{ labelCode: 'S', label: 'Small', id: '_s_' }, { labelCode: 'M', label: 'Medium', id: '_m_' }, { labelCode: 'L', label: 'Large', id: '_l_' }, { labelCode: 'XL', label: 'Extra Large', id: '' }];
  }

  // Genera el catálogo con la lista de productos ya filtrados.
  generateCatalog() {
    // Validación si se seleccionó como mínimo una familia de productos para mostrar.
    if (this.listFamilySelected.length <= 0) {
      this.showWarn();
    } else {
      // Bloquea la pantalla hasta que se genere el catálogo.
      this.toggleBlocking("Generando Catálogo...");

      let price_selected: any;
      let imgSize_selected: any;

      // Reviso por valores vacíos y se les asigna como default los siguientes valores.
      if (this.listPriceSelected.length == 0) {
        price_selected = 'AD';
      } else {
        price_selected = this.listPriceSelected.pop().priceId;
      }

      if (this.listImgSelected.length == 0) {
        imgSize_selected = '_l_';
      } else {
        imgSize_selected = this.listImgSelected.pop().id;
      }

      // Llamada al web-service de conseguir los precios y códigos de barras de los productos filtrados.
      this.service.getPrices(this.getProductsCodes(), price_selected).then((_prices: price[]) => {
        this.listProductAttributes = _prices;
        let mixed = [];

        // Para productos que tienen más de una unidad del producto, se ordena de menor a mayor.
        this.listProductAttributes.forEach(element => {
          element.attributes.sort(function (a, b) {
            console.log(element.itemId);
            if (Number(a.price) > Number(b.price)) {
              console.log(a.price + '>' + b.price);
              return 1;
            };
            if (Number(a.price) < Number(b.price)) {
              console.log(a.price + '<' + b.price);
              return -1;
            };
            return 0;
          });
        });

        console.log(this.listProductAttributes);

        // Combino(relaciono) la lista de productos con sus respectivos atributos. 
        this.listProductAttributes.forEach((itm, i) => {
          if (itm.attributes.length > 0) {
            mixed.push(Object.assign({}, itm, this.listIndvProdSelected[i]));
          }
        });

        console.log(mixed);

        // Save state of the filters-page.
        // Esto para cuando se regrese la página quede la configuración pasada del catálogo.
        sessionStorage.setItem('itemTypeSelected', JSON.stringify(this.listItemTypeSelected));
        sessionStorage.setItem('productUseSelected', JSON.stringify(this.listProdUseSelected));
        sessionStorage.setItem('itemMarkSelected', JSON.stringify(this.listMarkSelected));
        sessionStorage.setItem('lifeCycleSelected', JSON.stringify(this.listLifeCycleSelected));
        sessionStorage.setItem('familyListSelected', JSON.stringify(this.listFamilySelected));
        sessionStorage.setItem('subFamilyListSelected', JSON.stringify(this.listSubFamilySelected));
        sessionStorage.setItem('categoryListSelected', JSON.stringify(this.listCategorySelected));
        sessionStorage.setItem('subCategoryListSelected', JSON.stringify(this.listSubCategorySelected));
        sessionStorage.setItem('indvProductSelected', JSON.stringify(this.listIndvProdSelected));
        sessionStorage.setItem('valuePriceSelected', JSON.stringify(this.rd_showPrice));
        sessionStorage.setItem('valuePriceListSelected', JSON.stringify(this.listPriceSelected));
        sessionStorage.setItem('spinner', JSON.stringify(this.spinner));
        sessionStorage.setItem('imgSizeSelected', JSON.stringify(this.listImgSelected));

        // Implementación temporal para la persistencia de los datos.
        this._data.data = {
          familyList: this.listFamilySelected,
          subFamilyList: this.listSubFamilySelected,
          categoryList: this.listCategorySelected,
          subCategoryList: this.listSubCategorySelected,
          productsList: mixed,//Este es el que hacce display.
          lifeCycle: this.listLifeCycleSelected,
          mainActivity: this.listMainActivitySelected,
          speciality: this.listSpecialitySelected,
          rb_historicoVenta: this.rb_historicoVenta,
          spinner: this.spinner, //*
          allProducts: this.listaAllProducts,
          productImgSize: imgSize_selected,//*
          prices: this.listProductAttributes,
          showPrices: this.rd_showPrice
        }

        // Desbloqueo la pantalla y navego a la pantalla del catálogo.
        this.blockUI.stop();
        this.router.navigate(['/catalog']);
      });
    }
  }

  // Genera una lista de strings con los códigos de los productos.
  // returns -- string[] con todos los códgos de los productos.
  getProductsCodes() {
    let productCodes: string[] = [];
    this.listIndvProdSelected.forEach(element => {
      productCodes.push(element.productId);
    });
    return productCodes;
  }

  // Filtra que no se esté filtrando por la misma familia 2 veces, 
  // ie. si ya esta la subFamilia de 'Alcoholicas' para filtrar, entonces no agregar que filtre por 'Bebidas'. 
  // @param filter -- hierarchy[] lista de filtros de la jerarquía (family, subFamily, etc).
  updateFilters(filter: any[]) {
    filter.forEach(element => {
      let position = this.filtersToApply.findIndex(i => i.name == element.parent_id);
      if (position != -1) {
        this.filtersToApply.splice(position, 1, element);
      } else {
        this.filtersToApply.push(element);
      }
    });
  }

  // Get the level of hierarchy that belongs the entry.
  // ie. input: Alcoholicas - return: subFamily; 
  // ie. input: Bebidas - return: family.
  // @param name -- recibe un nombre de la jerarquía.
  // returns -- string del nivel de la jerarquía en la pertence 'name'.
  getHierarchy(name: string) {
    if (this.listFamily.some((e => e.name == name))) {
      return "family";
    }
    if (this.listSubFamily.some((e => e.name == name))) {
      return "subFamily";
    }
    if (this.listCategoria.some((e => e.name == name))) {
      return "category";
    }
    if (this.listSubCategoria.some((e => e.name == name))) {
      return "subCategory";
    }
  }

}