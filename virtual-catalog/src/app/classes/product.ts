
export class product {
    id: number;
    productId: string;
    name: string;
    barcode: string;
    family: string;
    subFamily: string;
    category: string;
    subCategory: string;
    description: string;
    lifeCycle: string;

    getAttribute(atr: string): string {
        switch(atr) {
            case "id": { return this.id.toString(); }
            case "productId": { return this.productId; }
            case "name": { return this.name; }
            case "barcode": { return this.barcode; }
            case "family": { return this.family; }
            case "subFamily": { return this.subFamily; }
            case "category": { return this.category; }
            case "subCategory": { return this.subCategory; }
            case "description": { return this.description; }
            case "lifeCycle": { return this.lifeCycle; }
        }
    }
}