import { SpriteObject } from "./SpriteObject";
import { Consumable } from "../Item/Consumable";
import { Armor } from "../Item/Armor";
import { Weapon } from "../Item/Weapon";
import { getCookie, setCookie } from "../Cookies";

export class Shop extends SpriteObject {
    content = []

    controller;
    itemsContainer

    inventory;

    constructor(items, path, horiTile, vertiTile, position, scale) {
        super(path, horiTile, vertiTile, position, scale);

        for(let i = 0; i < items.length; i++) {
            if(items[i].type === "consumables") {
                for(let j = 0; j < items[i].quantity; j++) {
                    let item = new Consumable(items[i].id);
                    this.content.push(item);
                }
            }
            else if(items[i].type === "armor") {
                for(let j = 0; j < items[i].quantity; j++) {
                    let item = new Armor(items[i].id);
                    this.content.push(item);
                }
            }
            else if(items[i].type === "weapon") {
                for(let j = 0; j < items[i].quantity; j++) {
                    let item = new Weapon(items[i].id);
                    this.content.push(item);
                }
            }
        }
        this.itemsContainer = document.getElementById('display-items');
    }

    displayItems(inventory) {
        this.newAbort()

        for(let i = 0; i < this.content.length; i++) {
            const container = document.createElement('div');
            container.innerHTML = `
                <div class="w-72 bg-white rounded-lg p-4 border-gray-200 pb-2 mb-2 text-center">
                    <h3 class="font-semibold">${this.content[i].name}</h3>
                    <p class="text-gray-500">${this.content[i].desc}</p>
                    <p class="text-gray-700 font-bold">${this.content[i].price}</p>
                    <button class="buy-item bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" value="${i}">Buy</button>
                </div>
            `;
            let button = container.querySelector(".buy-item");
            button.addEventListener('click', () => this.buyItem(button.value, inventory), { signal: this.controller.signal });

            this.itemsContainer.appendChild(container);
        }
    }

    removeDisplayedItems() {
        this.itemsContainer = document.getElementById('display-items');
        this.itemsContainer.innerHTML = '';
        this.controller.abort()
    }

    buyItem(idIndex, inventory) {
        let coins = parseInt(getCookie("coins"));

        if(coins >= this.content[idIndex].price) {

            let splicedItem = this.content.splice(idIndex, 1);
            splicedItem = splicedItem[0];
            inventory.addItem(splicedItem);

            coins -= splicedItem.price;
            setCookie("coins", coins, 1);

            this.removeDisplayedItems();
            this.displayItems(inventory);
        }
        else {
            alert("not enough coins");
        }
    }

    newAbort() {
        this.controller = new AbortController()
    }
}