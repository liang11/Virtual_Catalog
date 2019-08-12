import { Injectable } from '@angular/core';
import { request } from './Service/request';
import { Interpreter } from './Service/interpreter';

@Injectable({
    providedIn: 'root'
})
export class ServiceVirtualCatalogService {

    serviceLink = "http://localhost:53519/Service1.svc";

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
}

