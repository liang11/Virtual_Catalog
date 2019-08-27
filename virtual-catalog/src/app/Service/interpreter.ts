import { family } from '../classes/family';
import { subFamily } from '../classes/subFamily';
import { product } from '../classes/product';

export class Interpreter{

    prefix: string = "a:";

    parseFamily(xml: XMLDocument) {
        var families: family[] = [];
        var xmlFamily = xml.getElementsByTagName(this.prefix + "FamilyService");
        for (var index = 0; index < xmlFamily.length; index++) {
            var newFamily = new family();
            newFamily.name = xmlFamily.item(index).getElementsByTagName(this.prefix + "family").item(0).textContent;
            newFamily.id = index;
            newFamily.parent_id = "";
            // newFamily.transportId = xmlTransports.item(transportIndex).getElementsByTagName(this.prefix + "specificRole").item(0).textContent;
            families.push(newFamily);
        }
        return families;
    }

    parseSubFamily(xml: XMLDocument) {
        var subFamilies: subFamily[] = [];
        var xmlFamily = xml.getElementsByTagName(this.prefix + "SubFamilyService");
        for (var index = 0; index < xmlFamily.length; index++) {
            var newSubFamily = new subFamily();
            newSubFamily.parent_id = xmlFamily.item(index).getElementsByTagName(this.prefix + "family").item(0).textContent;
            newSubFamily.name = xmlFamily.item(index).getElementsByTagName(this.prefix + "subFamily").item(0).textContent;
            newSubFamily.id = index;
            // newFamily.transportId = xmlTransports.item(transportIndex).getElementsByTagName(this.prefix + "specificRole").item(0).textContent;
            subFamilies.push(newSubFamily);
        }
        return subFamilies;
    }

    parseCategoria(xml: XMLDocument) {
        var categories: subFamily[] = [];
        var xmlFamily = xml.getElementsByTagName(this.prefix + "CategoryService");
        for (var index = 0; index < xmlFamily.length; index++) {
            var newSubFamily = new subFamily();
            newSubFamily.parent_id = xmlFamily.item(index).getElementsByTagName(this.prefix + "subFamily").item(0).textContent;
            newSubFamily.name = xmlFamily.item(index).getElementsByTagName(this.prefix + "category").item(0).textContent;
            newSubFamily.id = index;
            // newFamily.transportId = xmlTransports.item(transportIndex).getElementsByTagName(this.prefix + "specificRole").item(0).textContent;
            categories.push(newSubFamily);
        }
        return categories;
    }

    parseSubCategoria(xml: XMLDocument) {
        var categories: subFamily[] = [];
        var xmlFamily = xml.getElementsByTagName(this.prefix + "SubCategoryService");
        for (var index = 0; index < xmlFamily.length; index++) {
            var newSubFamily = new subFamily();
            newSubFamily.parent_id = xmlFamily.item(index).getElementsByTagName(this.prefix + "category").item(0).textContent;
            newSubFamily.name = xmlFamily.item(index).getElementsByTagName(this.prefix + "subCategory").item(0).textContent;
            newSubFamily.id = index;
            // newFamily.transportId = xmlTransports.item(transportIndex).getElementsByTagName(this.prefix + "specificRole").item(0).textContent;
            categories.push(newSubFamily);
        }
        return categories;
    }

    parseProducts(xml: XMLDocument) {
        var products: product[] = [];
        var xmlProduct = xml.getElementsByTagName(this.prefix + "ProductService");
        for (var index = 0; index < xmlProduct.length; index++) {
            var newProduct = new product();
            newProduct.name = xmlProduct.item(index).getElementsByTagName(this.prefix + "name").item(0).textContent;
            newProduct.productId = xmlProduct.item(index).getElementsByTagName(this.prefix + "id").item(0).textContent;
            newProduct.barcode = xmlProduct.item(index).getElementsByTagName(this.prefix + "barcode").item(0).textContent;
            newProduct.family = xmlProduct.item(index).getElementsByTagName(this.prefix + "family").item(0).textContent;
            newProduct.subFamily = xmlProduct.item(index).getElementsByTagName(this.prefix + "subFamily").item(0).textContent;
            newProduct.category = xmlProduct.item(index).getElementsByTagName(this.prefix + "category").item(0).textContent;
            newProduct.subCategory = xmlProduct.item(index).getElementsByTagName(this.prefix + "subCategory").item(0).textContent;
            newProduct.description = xmlProduct.item(index).getElementsByTagName(this.prefix + "description").item(0).textContent;
            newProduct.id = index;
            // newFamily.transportId = xmlTransports.item(transportIndex).getElementsByTagName(this.prefix + "specificRole").item(0).textContent;
            products.push(newProduct);
        }
        return products;
    }
}