import { hierarchy } from '../classes/hierarchy';
import { product } from '../classes/product';
import { lifeCycle } from '../classes/lifeCycle';
import { ipLevel } from '../classes/ipLevel';
import { priceGroup } from '../classes/priceGroup';
import { productUse } from '../classes/productUse';
import { itemType } from '../classes/itemType';
import { itemMark } from '../classes/itemMark';
import { barcode } from '../classes/barcode';
import { company } from '../classes/company';
import { price } from '../classes/price';
import { priceAttributes } from '../classes/priceAttributes';

export class Interpreter{

    prefix: string = "a:";

    parseFamily(xml: XMLDocument) {
        var families: hierarchy[] = [];
        var xmlFamily = xml.getElementsByTagName(this.prefix + "FamilyService");
        for (var index = 0; index < xmlFamily.length; index++) {
            var newFamily = new hierarchy();
            newFamily.name = xmlFamily.item(index).getElementsByTagName(this.prefix + "family").item(0).textContent;
            newFamily.label = newFamily.name;
            newFamily.id = index;
            newFamily.parent_id = "";
            families.push(newFamily);
        }
        return families;
    }

    parseTest(xml: XMLDocument) {
        //var families: family[] = [];
        var xmlFamily = xml.getElementsByTagName("GetDataResult");
        var result = xmlFamily.item(0).textContent;

        //for (var index = 0; index < xmlFamily.length; index++) {
          //  var newFamily = new family();
            // newFamily.name = xmlFamily.item(index).getElementsByTagName(this.prefix + "family").item(0).textContent;
            // newFamily.label = newFamily.name;
            // newFamily.id = index;
            // newFamily.parent_id = "";
        //    families.push(newFamily);
        //}
        return result;
    }

    parseSubFamily(xml: XMLDocument) {
        var subFamilies: hierarchy[] = [];
        var xmlFamily = xml.getElementsByTagName(this.prefix + "SubFamilyService");
        for (var index = 0; index < xmlFamily.length; index++) {
            var newSubFamily = new hierarchy();
            newSubFamily.parent_id = xmlFamily.item(index).getElementsByTagName(this.prefix + "family").item(0).textContent;
            newSubFamily.name = xmlFamily.item(index).getElementsByTagName(this.prefix + "subFamily").item(0).textContent;
            newSubFamily.label = newSubFamily.name;
            newSubFamily.id = index;
            subFamilies.push(newSubFamily);
        }
        return subFamilies;
    }

    parseCategoria(xml: XMLDocument) {
        var categories: hierarchy[] = [];
        var xmlFamily = xml.getElementsByTagName(this.prefix + "CategoryService");
        for (var index = 0; index < xmlFamily.length; index++) {
            var newSubFamily = new hierarchy();
            newSubFamily.parent_id = xmlFamily.item(index).getElementsByTagName(this.prefix + "subFamily").item(0).textContent;
            newSubFamily.name = xmlFamily.item(index).getElementsByTagName(this.prefix + "category").item(0).textContent;
            newSubFamily.id = index;
            newSubFamily.label = newSubFamily.name;
            categories.push(newSubFamily);
        }
        return categories;
    }

    parseSubCategoria(xml: XMLDocument) {
        var categories: hierarchy[] = [];
        var xmlFamily = xml.getElementsByTagName(this.prefix + "SubCategoryService");
        for (var index = 0; index < xmlFamily.length; index++) {
            var newSubFamily = new hierarchy();
            newSubFamily.parent_id = xmlFamily.item(index).getElementsByTagName(this.prefix + "category").item(0).textContent;
            newSubFamily.name = xmlFamily.item(index).getElementsByTagName(this.prefix + "subCategory").item(0).textContent;
            newSubFamily.id = index;
            newSubFamily.label = newSubFamily.name;
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
            newProduct.family = xmlProduct.item(index).getElementsByTagName(this.prefix + "family").item(0).textContent;
            newProduct.subFamily = xmlProduct.item(index).getElementsByTagName(this.prefix + "subFamily").item(0).textContent;
            newProduct.category = xmlProduct.item(index).getElementsByTagName(this.prefix + "category").item(0).textContent;
            newProduct.subCategory = xmlProduct.item(index).getElementsByTagName(this.prefix + "subCategory").item(0).textContent;
            newProduct.description = xmlProduct.item(index).getElementsByTagName(this.prefix + "description").item(0).textContent;
            newProduct.lifeCycle = xmlProduct.item(index).getElementsByTagName(this.prefix + "lifeCycle").item(0).textContent;
            newProduct.productUse = xmlProduct.item(index).getElementsByTagName(this.prefix + "productUse").item(0).textContent;
            newProduct.itemMark = xmlProduct.item(index).getElementsByTagName(this.prefix + "itemMark").item(0).textContent;
            newProduct.itemType = xmlProduct.item(index).getElementsByTagName(this.prefix + "itemType").item(0).textContent;
            newProduct.label = newProduct.name;
            newProduct.labelCode = newProduct.productId;
            newProduct.id = index;
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
            newLifeCycle.label = newLifeCycle.name;
            newLifeCycle.labelCode = newLifeCycle.lifeCycleId;
            newLifeCycle.id = index;
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
            newMainActivity.label = newMainActivity.name;
            newMainActivity.id = index;
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
            newSpeciality.label = newSpeciality.name;
            newSpeciality.id = index;
            specialityList.push(newSpeciality);
        }
        return specialityList;
    }

    parsePriceGroup(xml: XMLDocument) {
        var priceGroupList: priceGroup[] = [];
        var xmlPriceGroup = xml.getElementsByTagName(this.prefix + "PriceGroupService");
        for (var index = 0; index < xmlPriceGroup.length; index++) {
            var newPriceGroup = new priceGroup();
            newPriceGroup.name = xmlPriceGroup.item(index).getElementsByTagName(this.prefix + "name").item(0).textContent;
            newPriceGroup.priceId = xmlPriceGroup.item(index).getElementsByTagName(this.prefix + "priceId").item(0).textContent;
            newPriceGroup.label = newPriceGroup.name;
            newPriceGroup.labelCode = newPriceGroup.priceId;
            newPriceGroup.id = index;
            priceGroupList.push(newPriceGroup);
        }
        return priceGroupList;
    }

    parseProductUse(xml: XMLDocument) {
        var productUseList: productUse[] = [];
        var xmlProductUse = xml.getElementsByTagName(this.prefix + "ProductUseService");
        for (var index = 0; index < xmlProductUse.length; index++) {
            var newProductUse = new productUse();
            newProductUse.name = xmlProductUse.item(index).getElementsByTagName(this.prefix + "name").item(0).textContent;
            newProductUse.productUseId = xmlProductUse.item(index).getElementsByTagName(this.prefix + "id").item(0).textContent;
            newProductUse.label = newProductUse.name;
            newProductUse.labelCode = newProductUse.productUseId;
            newProductUse.id = index;
            productUseList.push(newProductUse);
        }
        return productUseList;
    }

    parseItemType(xml: XMLDocument) {
        var itemTypeList: itemType[] = [];
        var xmlItemType = xml.getElementsByTagName(this.prefix + "ItemTypeService");
        for (var index = 0; index < xmlItemType.length; index++) {
            var newItemType = new itemType();
            newItemType.name = xmlItemType.item(index).getElementsByTagName(this.prefix + "name").item(0).textContent;
            newItemType.itemTypeId = xmlItemType.item(index).getElementsByTagName(this.prefix + "id").item(0).textContent;
            newItemType.label = newItemType.name;
            newItemType.id = index;
            itemTypeList.push(newItemType);
        }
        return itemTypeList;
    }

    parseItemMark(xml: XMLDocument) {
        var itemMarkList: itemMark[] = [];
        var xmlItemMark = xml.getElementsByTagName(this.prefix + "ItemMarkService");
        for (var index = 0; index < xmlItemMark.length; index++) {
            var newItemMark = new itemMark();
            newItemMark.name = xmlItemMark.item(index).getElementsByTagName(this.prefix + "name").item(0).textContent;
            newItemMark.label = newItemMark.name;
            newItemMark.id = index;
            itemMarkList.push(newItemMark);
        }
        return itemMarkList;
    }

    parseItemBarcode(xml: XMLDocument) {
        var itemBarcodeList: barcode[] = [];
        var xmlItemBarcode = xml.getElementsByTagName(this.prefix + "ItemBarcodeService");
        for (var index = 0; index < xmlItemBarcode.length; index++) {
            var newItemBarcode = new barcode();
            newItemBarcode.barcode = xmlItemBarcode.item(index).getElementsByTagName(this.prefix + "barcode").item(0).textContent;
            newItemBarcode.itemId = xmlItemBarcode.item(index).getElementsByTagName(this.prefix + "itemId").item(0).textContent;
            newItemBarcode.unit = xmlItemBarcode.item(index).getElementsByTagName(this.prefix + "unit").item(0).textContent;
            newItemBarcode.id = index;
            itemBarcodeList.push(newItemBarcode);
        }
        return itemBarcodeList;
    }

    parseCompanies(xml: XMLDocument) {
        var companyList: company[] = [];
        var xmlCompany = xml.getElementsByTagName(this.prefix + "CompanyService");
        for (var index = 0; index < xmlCompany.length; index++) {
            var newCompany = new company();
            newCompany.name = xmlCompany.item(index).getElementsByTagName(this.prefix + "name").item(0).textContent;
            newCompany.companyId = xmlCompany.item(index).getElementsByTagName(this.prefix + "companyId").item(0).textContent;
            newCompany.label = newCompany.name;
            newCompany.labelCode = newCompany.companyId;
            newCompany.id = index;
            companyList.push(newCompany);
        }
        return companyList;
    }

    parsePrices(xml: XMLDocument) {
        var pricesList: price[] = [];
        var xmlPrice = xml.getElementsByTagName(this.prefix + "PriceService");
        for (var index = 0; index < xmlPrice.length; index++) {
            var newCPrice = new price();
            let temp_priceAttribute: any;
            let temp_Attributes: any;
            let attributeList: priceAttributes[] = [];

            temp_priceAttribute = xmlPrice.item(index).getElementsByTagName(this.prefix + "attributes")[0];
            temp_Attributes = temp_priceAttribute.getElementsByTagName(this.prefix + "PriceAttribute");
            for(var idx = 0; idx < temp_Attributes.length; idx++) {
                let new_attributes: priceAttributes = new priceAttributes();

                new_attributes.barcode = temp_Attributes.item(idx).getElementsByTagName(this.prefix + "barcode").item(0).textContent;
                new_attributes.price = temp_Attributes.item(idx).getElementsByTagName(this.prefix + "price").item(0).textContent;
                new_attributes.unit = temp_Attributes.item(idx).getElementsByTagName(this.prefix + "unit").item(0).textContent;

                attributeList.push(new_attributes);
            }
            newCPrice.id = index;
            newCPrice.itemId = xmlPrice.item(index).getElementsByTagName(this.prefix + "itemId").item(0).textContent;
            
            // Si no tiene atributos se le mete un blanco
            // if(attributeList.length == 0) {
            //     let new_attributes: priceAttributes = new priceAttributes();
            //     new_attributes.barcode = '0';
            //     new_attributes.price = '-1';
            //     new_attributes.unit = '-1';

            //     attributeList.push(new_attributes);
            // }

            newCPrice.attributes = attributeList;         
            
            pricesList.push(newCPrice);
        }
        return pricesList;
    }
}