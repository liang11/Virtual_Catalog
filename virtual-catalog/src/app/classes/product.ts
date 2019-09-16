
export class product {
    id: number;
    productId: string;
    name: string;
    family: string;
    subFamily: string;
    category: string;
    subCategory: string;
    description: string;
    lifeCycle: string;
    productUse: string;
    itemMark: string;
    itemType: string;
    label: string;
    labelCode: string;

    getAttribute(atr: string): string {
        switch(atr) {
            case "id": { return this.id.toString(); }
            case "productId": { return this.productId; }
            case "name": { return this.name; }
            case "family": { return this.family; }
            case "subFamily": { return this.subFamily; }
            case "category": { return this.category; }
            case "subCategory": { return this.subCategory; }
            case "description": { return this.description; }
            case "lifeCycle": { return this.lifeCycle; }
            case "productUse": { return this.productUse; }
            case "itemMark": { return this.itemMark; }
            case "itemType": { return this.itemType; }
        }
    }
}