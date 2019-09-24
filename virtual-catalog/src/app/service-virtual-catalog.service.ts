import { Injectable } from '@angular/core';
import { request } from './Service/request';
import { Interpreter } from './Service/interpreter';

@Injectable({
    providedIn: 'root'
})
export class ServiceVirtualCatalogService {

    serviceLink = "http://john-wick:8091/Service1.svc";

    request: request = new request();

    constructor() { }

    public getFamily() {
        return new Promise((resolve, reject) => {
            var xmlRequest = this.request.getFamilies();
            var xhr = new XMLHttpRequest();
            //xhr.withCredentials = true;
            xhr.open("POST", this.serviceLink, true);
            xhr.setRequestHeader("Content-Type", "text/xml");
            xhr.setRequestHeader("SOAPAction", "http://tempuri.org/IService1/getFamilies");
            xhr.send(xmlRequest);
            xhr.onreadystatechange = function (aEvt) {
                var interpreter: Interpreter;
                interpreter = new Interpreter();
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(interpreter.parseFamily(xhr.responseXML));
                    }
                }
            };
            xhr.onerror = function (aEvt) {
                alert("Error al invocar el servicio del IIS.");
            }
        })
    }

    public getSubFamily() {
        return new Promise((resolve, reject) => {
            var xmlRequest = this.request.getSubFamilies();
            var xhr = new XMLHttpRequest();
            //xhr.withCredentials = true;
            xhr.open("POST", this.serviceLink, true);
            xhr.setRequestHeader("Content-Type", "text/xml");
            xhr.setRequestHeader("SOAPAction", "http://tempuri.org/IService1/getSubFamilies");
            xhr.send(xmlRequest);
            xhr.onreadystatechange = function (aEvt) {
                var interpreter: Interpreter;
                interpreter = new Interpreter();
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(interpreter.parseSubFamily(xhr.responseXML));
                    }
                }
            };
            xhr.onerror = function (aEvt) {
                alert("Error al invocar el servicio del IIS.");
            }
        })
    }

    public getCategoria() {
        return new Promise((resolve, reject) => {
            var xmlRequest = this.request.getCategories();
            var xhr = new XMLHttpRequest();
            //xhr.withCredentials = true;
            xhr.open("POST", this.serviceLink, true);
            xhr.setRequestHeader("Content-Type", "text/xml");
            xhr.setRequestHeader("SOAPAction", "http://tempuri.org/IService1/getCategories");
            xhr.send(xmlRequest);
            xhr.onreadystatechange = function (aEvt) {
                var interpreter: Interpreter;
                interpreter = new Interpreter();
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(interpreter.parseCategoria(xhr.responseXML));
                    }
                }
            };
            xhr.onerror = function (aEvt) {
                alert("Error al invocar el servicio del IIS.");
            }
        })
    }

    public getSubCategoria() {
        return new Promise((resolve, reject) => {
            var xmlRequest = this.request.getSubCategories();
            var xhr = new XMLHttpRequest();
            //xhr.withCredentials = true;
            xhr.open("POST", this.serviceLink, true);
            xhr.setRequestHeader("Content-Type", "text/xml");
            xhr.setRequestHeader("SOAPAction", "http://tempuri.org/IService1/getSubCategories");
            xhr.send(xmlRequest);
            xhr.onreadystatechange = function (aEvt) {
                var interpreter: Interpreter;
                interpreter = new Interpreter();
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(interpreter.parseSubCategoria(xhr.responseXML));
                    }
                }
            };
            xhr.onerror = function (aEvt) {
                alert("Error al invocar el servicio del IIS.");
            }
        })
    }

    public getProduct() {
        return new Promise((resolve, reject) => {
            var xmlRequest = this.request.getProducts();
            var xhr = new XMLHttpRequest();
            //xhr.withCredentials = true;
            xhr.open("POST", this.serviceLink, true);
            xhr.setRequestHeader("Content-Type", "text/xml");
            xhr.setRequestHeader("SOAPAction", "http://tempuri.org/IService1/getProducts");
            xhr.send(xmlRequest);
            xhr.onreadystatechange = function (aEvt) {
                var interpreter: Interpreter;
                interpreter = new Interpreter();
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(interpreter.parseProducts(xhr.responseXML));
                    }
                }
            };
            xhr.onerror = function (aEvt) {
                alert("Error al invocar el servicio del IIS.");
            }
        })
    }

    public getLifeCycle() {
        return new Promise((resolve, reject) => {
            var xmlRequest = this.request.getLifeCycle();
            var xhr = new XMLHttpRequest();
            //xhr.withCredentials = true;
            xhr.open("POST", this.serviceLink, true);
            xhr.setRequestHeader("Content-Type", "text/xml");
            xhr.setRequestHeader("SOAPAction", "http://tempuri.org/IService1/getLifeCycle");
            xhr.send(xmlRequest);
            xhr.onreadystatechange = function (aEvt) {
                var interpreter: Interpreter;
                interpreter = new Interpreter();
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(interpreter.parseLifeCycle(xhr.responseXML));
                    }
                }
            };
            xhr.onerror = function (aEvt) {
                alert("Error al invocar el servicio del IIS.");
            }
        })
    }

    public getMainActivity() {
        return new Promise((resolve, reject) => {
            var xmlRequest = this.request.getMainActivity();
            var xhr = new XMLHttpRequest();
            //xhr.withCredentials = true;
            xhr.open("POST", this.serviceLink, true);
            xhr.setRequestHeader("Content-Type", "text/xml");
            xhr.setRequestHeader("SOAPAction", "http://tempuri.org/IService1/getMainCommercialActivity");
            xhr.send(xmlRequest);
            xhr.onreadystatechange = function (aEvt) {
                var interpreter: Interpreter;
                interpreter = new Interpreter();
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(interpreter.parseMainActivity(xhr.responseXML));
                    }
                }
            };
            xhr.onerror = function (aEvt) {
                alert("Error al invocar el servicio del IIS.");
            }
        })
    }

    public getSpeciality() {
        return new Promise((resolve, reject) => {
            var xmlRequest = this.request.getSpeciality();
            var xhr = new XMLHttpRequest();
            //xhr.withCredentials = true;
            xhr.open("POST", this.serviceLink, true);
            xhr.setRequestHeader("Content-Type", "text/xml");
            xhr.setRequestHeader("SOAPAction", "http://tempuri.org/IService1/getSpeciality");
            xhr.send(xmlRequest);
            xhr.onreadystatechange = function (aEvt) {
                var interpreter: Interpreter;
                interpreter = new Interpreter();
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(interpreter.parseSpeciality(xhr.responseXML));
                    }
                }
            };
            xhr.onerror = function (aEvt) {
                alert("Error al invocar el servicio del IIS.");
            }
        })
    }

    public getPriceGroup() {
        return new Promise((resolve, reject) => {
            var xmlRequest = this.request.getPriceGroup();
            var xhr = new XMLHttpRequest();
            //xhr.withCredentials = true;
            xhr.open("POST", this.serviceLink, true);
            xhr.setRequestHeader("Content-Type", "text/xml");
            xhr.setRequestHeader("SOAPAction", "http://tempuri.org/IService1/getPriceGroup");
            xhr.send(xmlRequest);
            xhr.onreadystatechange = function (aEvt) {
                var interpreter: Interpreter;
                interpreter = new Interpreter();
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(interpreter.parsePriceGroup(xhr.responseXML));
                    }
                }
            };
            xhr.onerror = function (aEvt) {
                alert("Error al invocar el servicio del IIS.");
            }
        })
    }

    public getProductUse() {
        return new Promise((resolve, reject) => {
            var xmlRequest = this.request.getProductUse();
            var xhr = new XMLHttpRequest();
            //xhr.withCredentials = true;
            xhr.open("POST", this.serviceLink, true);
            xhr.setRequestHeader("Content-Type", "text/xml");
            xhr.setRequestHeader("SOAPAction", "http://tempuri.org/IService1/getProductUse");
            xhr.send(xmlRequest);
            xhr.onreadystatechange = function (aEvt) {
                var interpreter: Interpreter;
                interpreter = new Interpreter();
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(interpreter.parseProductUse(xhr.responseXML));
                    }
                }
            };
            xhr.onerror = function (aEvt) {
                alert("Error al invocar el servicio del IIS.");
            }
        })
    }

    public getItemType() {
        return new Promise((resolve, reject) => {
            var xmlRequest = this.request.getItemType();
            var xhr = new XMLHttpRequest();
            //xhr.withCredentials = true;
            xhr.open("POST", this.serviceLink, true);
            xhr.setRequestHeader("Content-Type", "text/xml");
            xhr.setRequestHeader("SOAPAction", "http://tempuri.org/IService1/getItemType");
            xhr.send(xmlRequest);
            xhr.onreadystatechange = function (aEvt) {
                var interpreter: Interpreter;
                interpreter = new Interpreter();
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(interpreter.parseItemType(xhr.responseXML));
                    }
                }
            };
            xhr.onerror = function (aEvt) {
                alert("Error al invocar el servicio del IIS.");
            }
        })
    }

    public getItemMark() {
        return new Promise((resolve, reject) => {
            var xmlRequest = this.request.getItemMark();
            var xhr = new XMLHttpRequest();
            //xhr.withCredentials = true;
            xhr.open("POST", this.serviceLink, true);
            xhr.setRequestHeader("Content-Type", "text/xml");
            xhr.setRequestHeader("SOAPAction", "http://tempuri.org/IService1/getItemMark");
            xhr.send(xmlRequest);
            xhr.onreadystatechange = function (aEvt) {
                var interpreter: Interpreter;
                interpreter = new Interpreter();
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(interpreter.parseItemMark(xhr.responseXML));
                    }
                }
            };
            xhr.onerror = function (aEvt) {
                alert("Error al invocar el servicio del IIS.");
            }
        })
    }

    public getItemBarcode() {
        return new Promise((resolve, reject) => {
            var xmlRequest = this.request.getItemBarcode();
            var xhr = new XMLHttpRequest();
            //xhr.withCredentials = true;
            xhr.open("POST", this.serviceLink, true);
            xhr.setRequestHeader("Content-Type", "text/xml");
            xhr.setRequestHeader("SOAPAction", "http://tempuri.org/IService1/getItemBarcode");
            xhr.send(xmlRequest);
            xhr.onreadystatechange = function (aEvt) {
                var interpreter: Interpreter;
                interpreter = new Interpreter();
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(interpreter.parseItemBarcode(xhr.responseXML));
                    }
                }
            };
            xhr.onerror = function (aEvt) {
                alert("Error al invocar el servicio del IIS.");
            }
        })
    }

    public getCompanies() {
        return new Promise((resolve, reject) => {
            var xmlRequest = this.request.getCompanies();
            var xhr = new XMLHttpRequest();
            //xhr.withCredentials = true;
            xhr.open("POST", this.serviceLink, true);
            xhr.setRequestHeader("Content-Type", "text/xml");
            xhr.setRequestHeader("SOAPAction", "http://tempuri.org/IService1/getCompanies");
            xhr.send(xmlRequest);
            xhr.onreadystatechange = function (aEvt) {
                var interpreter: Interpreter;
                interpreter = new Interpreter();
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(interpreter.parseCompanies(xhr.responseXML));
                    }
                }
            };
            xhr.onerror = function (aEvt) {
                alert("Error al invocar el servicio del IIS.");
            }
        })
    }

    public getPrices(items: string[], priceList: string) {
        return new Promise((resolve, reject) => {
            var xmlRequest = this.request.getPrices(items, priceList);
            var xhr = new XMLHttpRequest();
            //xhr.withCredentials = true;
            xhr.open("POST", this.serviceLink, true);
            xhr.setRequestHeader("Content-Type", "text/xml");
            xhr.setRequestHeader("SOAPAction", "http://tempuri.org/IService1/getPrices");
            xhr.send(xmlRequest);
            xhr.onreadystatechange = function (aEvt) {
                var interpreter: Interpreter;
                interpreter = new Interpreter();
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(interpreter.parsePrices(xhr.responseXML));
                    }
                }
            };
            xhr.onerror = function (aEvt) {
                alert("Error al invocar el servicio del IIS.");
            }
        })
    }

}

