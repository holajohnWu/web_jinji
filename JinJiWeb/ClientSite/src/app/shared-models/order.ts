import { OrderDetail } from './order-detail';

export class Order {
    id: number;
    year: number;
    month: number;
    day: number;
    sum: number = 0;

    constructor(date: Date = null) {
        if(!date) {
            date = new Date();
        }

        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.day = date.getDate();
    }

    orderDetails: OrderDetail[] = [];

    get totalPrice() {
        return this.orderDetails.map(p => p.price).reduce((p, r) => p + r, 0);
    }
}
