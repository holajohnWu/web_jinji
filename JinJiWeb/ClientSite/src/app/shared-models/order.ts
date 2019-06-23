import { Product } from './product';

export class Order {
    id: number;
    year: number;
    month: number;
    day: number;

    products: Product[] = [];
}
