export enum ConsumableType {
    食材 = 0,
    耗材,
    每日支出
}

export class Consumable {
    id: number;
    type = ConsumableType.食材;
    year: number;
    month: number;
    day: number;
    name: string;
    description: string;
    cost: number;
    date: string;

    constructor(date: Date) {
        this.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
}
