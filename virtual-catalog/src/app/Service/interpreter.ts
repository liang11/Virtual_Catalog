import { family } from '../classes/family';
import { subFamily } from '../classes/subFamily';
import { product } from '../classes/product';
import { lifeCycle } from '../classes/lifeCycle';
import { ipLevel } from '../classes/ipLevel';
import { priceGroup } from '../classes/priceGroup';

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
            newProduct.lifeCycle = xmlProduct.item(index).getElementsByTagName(this.prefix + "lifeCycle").item(0).textContent;
            newProduct.id = index;
            // newFamily.transportId = xmlTransports.item(transportIndex).getElementsByTagName(this.prefix + "specificRole").item(0).textContent;
            products.push(newProduct);
        }
        return products;
    }

    parseLifeCycle(xml: XMLDocument) {
        var lifeCycleList: lifeCycle[] = [];
        var xmlLifeCycle = xml.getElementsByTagName(this.prefix + "LifeCycleService");
        for (var index = 0; index < xmlLifeCycle.length; index++) {
            var newLifeCycle = new lifeCycle();
            newLifeCycle.lifeCycleId = xmlLifeCycle.item(index).getElementsByTagName(this.prefix + "lifeCycleId").item(0).textContent;
            newLifeCycle.name = xmlLifeCycle.item(index).getElementsByTagName(this.prefix + "name").item(0).textContent;
            newLifeCycle.id = index;
            // newFamily.transportId = xmlTransports.item(transportIndex).getElementsByTagName(this.prefix + "specificRole").item(0).textContent;
            lifeCycleList.push(newLifeCycle);
        }
        return lifeCycleList;
    }

    parseMainActivity(xml: XMLDocument) {
        var mainActivityList: ipLevel[] = [];
        var xmlMainActivity = xml.getElementsByTagName(this.prefix + "IpMainCommercialActivityService");
        for (var index = 0; index < xmlMainActivity.length; index++) {
            var newMainActivity = new ipLevel();
            newMainActivity.name = xmlMainActivity.item(index).getElementsByTagName(this.prefix + "name").item(0).textContent;
            newMainActivity.id = index;
            // newFamily.transportId = xmlTransports.item(transportIndex).getElementsByTagName(this.prefix + "specificRole").item(0).textContent;
            mainActivityList.push(newMainActivity);
        }
        return mainActivityList;
    }

    parseSpeciality(xml: XMLDocument) {
        var specialityList: ipLevel[] = [];
        var xmlSpeciality = xml.getElementsByTagName(this.prefix + "IpSpecialityService");
        for (var index = 0; index < xmlSpeciality.length; index++) {
            var newSpeciality = new ipLevel();
            newSpeciality.name = xmlSpeciality.item(index).getElementsByTagName(this.prefix + "name").item(0).textContent;
            newSpeciality.id = index;
            // newFamily.transportId = xmlTransports.item(transportIndex).getElementsByTagName(this.prefix + "specificRole").item(0).textContent;
            specialityList.push(newSpeciality);
        }
        return specialityList;
    }

    parsePriceGroup(xml: XMLDocument) {
        var priceGroupList: priceGroup[] = [];
        var xmlPriceGroup = xml.getElementsByTagName(this.prefix + "PriceGroupService");
        for (var index = 0; index < xmlPriceGroup.length; index++) {
            var newPriceGroup = new priceGroup();
            newPriceGroup.name = xmlPriceGroup.item(index).getElementsByTagName(this.prefix + "priceId").item(0).textContent;
            newPriceGroup.priceId = xmlPriceGroup.item(index).getElementsByTagName(this.prefix + "name").item(0).textContent;
            newPriceGroup.id = index;
            // newFamily.transportId = xmlTransports.item(transportIndex).getElementsByTagName(this.prefix + "specificRole").item(0).textContent;
            priceGroupList.push(newPriceGroup);
        }
        return priceGroupList;
    }
}