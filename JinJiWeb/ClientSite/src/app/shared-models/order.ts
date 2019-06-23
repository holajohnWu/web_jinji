import { Product } from './product';

export class Order {
    id: number;
    year: number;
    month: number;
    day: number;

    constructor(date: Date = null) {
        if(!date) {
            date = new Date();
        }

        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.day = date.getDate();
    }

    products: Product[] = [];

    get totalPrice() {
        return this.products.map(p => p.price).reduce((p, r) => p + r, 0);
    }
}
