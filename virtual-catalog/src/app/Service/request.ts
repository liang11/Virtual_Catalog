
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
}