import { family } from '../classes/family';
import { subFamily } from '../classes/subFamily';

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
}