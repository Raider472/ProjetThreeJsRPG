import * as THREE from 'three';

export class Item {
    id;
    name;
    type;
    desc;
    price;
    costDesc;
    usedBy = [];
    maximumPerInventory;

    constructor(id) {
        if (this.constructor === Item) {
            throw new Error('Abstract class "Item" cannot be instantiated directly')
        } 
        else {
            this.fetchJson(id).then(item => {
                this.id = item[0].id;
                this.name = item[0].name;
                this.desc = item[0].desc;
                this.price = item[0].price;
                this.costDesc = item[0].costDesc;
                this.usedBy = item[0].usedBy;
                this.maximumPerInventory = item[0].maximumPerInventory;
            })
        }
    }

    static async create(id) {
        const item = new this(id);
        await item.fetchJson(id);
        return item;
    }

    async fetchJson(filterId) {
        throw new Error('This function must be implemented');
    }
}