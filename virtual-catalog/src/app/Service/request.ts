
export class request {
  getFamilies() {
    return '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">' +
      '<s:Body>' +
      '  <getFamilies xmlns="http://tempuri.org/" />' +
      '</s:Body>' +
      '</s:Envelope>';
  }

  getSubFamilies() {
    return '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">' +
      '<s:Body>' +
      '<getSubFamilies xmlns="http://tempuri.org/" />' +
      '</s:Body>' +
      '</s:Envelope>';
  }

  getCategories() {
    return '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">' +
      '<s:Body> ' +
      '<getCategories xmlns="http://tempuri.org/" />' +
      '</s:Body>' +
      '</s:Envelope>';
  }

  getSubCategories() {
    return '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">' +
      '<s:Body>' +
      '<getSubCategories xmlns="http://tempuri.org/" />' +
      '</s:Body>' +
      '</s:Envelope>';
  }

  getProducts() {
    return '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">' +
      '<s:Body>' +
      '<getProducts xmlns="http://tempuri.org/" />' +
      '</s:Body>' +
      '</s:Envelope>';
  }

  getLifeCycle() {
    return '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"> ' +
      '<s:Body>' +
      '<getLifeCycle xmlns="http://tempuri.org/" />' +
      '</s:Body>' +
      '</s:Envelope>';
  }

  getMainActivity() {
    return '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">' +
      '<s:Body>' +
      '<getMainCommercialActivity xmlns="http://tempuri.org/" />' +
      '</s:Body>' +
      '</s:Envelope>';
  }

  getSpeciality() {
    return '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">' +
      '<s:Body>' +
      '<getSpeciality xmlns="http://tempuri.org/" />' +
      '</s:Body>' +
      '</s:Envelope>';
  }

  getPriceGroup() {
    return '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">' +
      '<s:Body>' +
      '<getPriceGroup xmlns="http://tempuri.org/" />' +
      '</s:Body>' +
      '</s:Envelope>';
  }

  getProductUse() {
    return '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">' +
      '<s:Body>' +
      '<getProductUse xmlns="http://tempuri.org/" />' +
      '</s:Body>' +
      '</s:Envelope>';
  }

  getItemType() {
    return '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">' +
      '<s:Body>' +
      '<getItemType xmlns="http://tempuri.org/" />' +
      '</s:Body>' +
      '</s:Envelope>';
  }

  getItemMark() {
    return '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">' +
      '<s:Body>' +
      '<getItemMark xmlns="http://tempuri.org/" />' +
      '</s:Body>' +
      '</s:Envelope>';
  }

  getItemBarcode() {
    return '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">' +
      '<s:Body>' +
      '<getItemBarcode xmlns="http://tempuri.org/" />' +
      '</s:Body>' +
      '</s:Envelope>';
  }

  getCompanies() {
    return '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">' +
      '<s:Body>' +
      '<getCompanies xmlns="http://tempuri.org/" />' +
      '</s:Body>' +
      '</s:Envelope>';
  }

  getCompan1ies() {
    return '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">' +
      '<s:Body>' +
      '<getCompanies xmlns="http://tempuri.org/">' +
      '</getCompanies>' +
      '</s:Body>' +
      '</s:Envelope>';
  }

  // Request al web service para traer los precios, unidad y código de barra respectivo.
  // @param items -- lista de los códigos de los productos a traerse.
  // @param priceList -- el tipo de cliente para traer los precios respectivos. 
  getPrices(items: string[], priceList: string) {
    var requestPrefix = 'item'
    return '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">' +
      '<s:Body>' +
      '<getPrices xmlns="http://tempuri.org/">' +
      '<itemCodes xmlns:' + requestPrefix + '="http://schemas.microsoft.com/2003/10/Serialization/Arrays" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">' +
      this.getItemsList(items, requestPrefix + ":string") +
      '</itemCodes>' +
      '<priceList>' + priceList + '</priceList>' +
      '</getPrices>' +
      '</s:Body>' +
      '</s:Envelope>';
  }

  // Preparo el header con toso los productos que deseao obtener.
  // @param items -- lista de los códigos de los productos a obtener.
  // @param prefix -- prefijo para escribir en la en la consulta.
  // returns -- string estructurado para completar la consulta al web service.
  getItemsList(items: String[], prefix) {
    var request = '';
    items.forEach(element => {
      request = request + '<' + prefix + '>' + element + '</' + prefix + '>';
    });
    return request;
  }

  getTest(aux: string) {
    return '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">' +
      '<s:Body>' +
      '<GetData xmlns="http://tempuri.org/">' +
      '<value>' + aux + '</value>' +
      '</GetData>' +
      '</s:Body>' +
      '</s:Envelope>';
  }
}

