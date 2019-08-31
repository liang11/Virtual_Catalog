import { Injectable } from '@angular/core';

@Injectable()
export class DataStorage {
    public data: any = {};

    public constructor() { }

    // public getLowerLevel() {
    //     if(this.data.subCategoryList.length > 0) {return "subCategory"};
    //     if(this.data.categoryList.length > 0) {return "category"};
    //     if(this.data.subFamilyList.length > 0) {return "subFamily"};
    //     if(this.data.familyList.length > 0) {return "family"};
    // }

    // public getList(list: string) {
    //     switch(list) {
    //         case "family": { return this.data.familyList; } 
    //         case "subFamily": { return this.data.subFamilyList; } 
    //         case "category": { return this.data.categoryList; } 
    //         case "subCategory": { return this.data.subCategoryList; } 
    //     }
    // }
}