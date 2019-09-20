
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
}