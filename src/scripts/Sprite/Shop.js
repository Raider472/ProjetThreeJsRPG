import { SpriteObject } from "./SpriteObject";
import { Consumable } from "../Item/Consumable";
import { Armor } from "../Item/Armor";
import { Weapon } from "../Item/Weapon";
import { getCookie, setCookie } from "../Cookies";

export class Shop extends SpriteObject {
    content = []

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
        this.displayItems()
        console.log(this.content);
    }

    displayItems() {
        const itemsContainer = document.getElementById('display-items');
        itemsContainer.innerHTML = ''; // Clear existing items

        for(let i = 0; i < this.content.length; i++) {
                const itemHTML = `
                    <div class="w-72 bg-white rounded-lg p-4 border-gray-200 pb-2 mb-2 text-center">
                        <h3 class="font-semibold">${this.content[i].name}</h3>
                        <p class="text-gray-500">${this.content[i].desc}</p>
                        <p class="text-gray-700 font-bold">${this.content[i].price}</p>
                        <button class="buy-item bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" data-item-id="${this.content[i].id}">Buy</button>
                    </div>
                `;
                itemsContainer.innerHTML += itemHTML;
        }
    }

    buyItem(inventory, coins) {
        coins = getCookie(coins);

        for(let i = 0; i < this.items.length; i++) {
            let itemCost = parseInt(this.items[i].price);
            if (coins >= itemCost) {
                let costValue = coins -= itemCost;
                inventory.addItem(this.items[i]);   
                setCookie(coins, costValue, 1);
            } else if (coins < itemCost) {
                console.warn("TU ES PAUVRE MEC");
            }
        }
    } 
}