export class Inventory {
    items = [];

    constructor() {

    }

    async addItem(item) {
        this.items.push(item);
    }

    async removeItem(index) {
        this.items.splice(index, 1);
    }
}