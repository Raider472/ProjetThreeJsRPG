let controller = new AbortController();

export function loadInventory(inventory, team) {
    let inventoryDom = document.querySelector("#menuInventory");
    document.querySelector("#inventoryButton").classList.add("hidden")
    if(inventory.items.length === 0) {
        inventoryDom.innerHTML = "empty";
    }
    else {
        for(let i = 0; i < inventory.items.length; i++) {
            let inputButton = document.createElement("button");
            inputButton.value = [i];
            inputButton.classList.add("btn-item");
            inputButton.innerHTML = inventory.items[i].name;
            inventoryDom.appendChild(inputButton);
            inputButton.addEventListener('click', () => inspectItem(inventoryDom, inventory.items[inputButton.value], inputButton.value, team, inventory), { signal: controller.signal });
        }
    }
    generateBackButton(inventoryDom)
}

function inspectItem(dom, item, index, team, inventory) {
    DeleteInventory(dom)
    let name = document.createElement("h1");
    name.innerHTML = item.name;
    let desc = document.createElement("p");
    desc.innerHTML = item.desc;
    dom.appendChild(name);
    dom.appendChild(desc);
    if(item.type != "consumable") {
        let descBuff = document.createElement("p");
        descBuff.innerHTML = item.buffDesc;
        dom.appendChild(descBuff);
        generateEquipItems(dom, team, index, inventory);
    }
    generateBackButton(dom)
}

function generateEquipItems(dom, team, indexItem, inventory) {
    for(let i = 0; i < team.length; i++) {
        let inputButton = document.createElement("button");
        inputButton.value = [i];
        inputButton.innerHTML = team[i].name;
        dom.appendChild(inputButton);
        inputButton.addEventListener('click', () => equipItem(dom, inputButton.value, team, indexItem, inventory), { signal: controller.signal });
    }
}

function equipItem(dom, indexHero, team, indexItem, inventory) {
    let splicedItem = inventory.items.splice(indexItem, 1)
    splicedItem = splicedItem[0];
    let result = isAnySlotOccupied(team[indexHero]);
    if(result.slotIsOccupied) {
        inventory.items.push(result.slot);
    }
    switch(splicedItem.slot) {
        case "head":
            team[indexHero].head = splicedItem;
            break;
        case "torso":
            team[indexHero].torso = splicedItem;
            break;
        case "legs":
            team[indexHero].legs = splicedItem;
            break;
        case "boots":
            team[indexHero].boots = splicedItem;
            break;
    }
    DeleteInventory(dom);
}

function DeleteInventory(dom) {
    controller.abort();
    dom.innerHTML = "";
    controller = new AbortController();
}

function generateBackButton(dom) {
    let inputButton = document.createElement("input");
    inputButton.value = "back";
    inputButton.type = "button"
    inputButton.classList.add("btn-back");
    dom.appendChild(inputButton);
    inputButton.addEventListener('click', 
    () => {DeleteInventory(dom);
        document.querySelector("#inventoryButton").classList.remove("hidden")},
         { signal: controller.signal });
    
}

function isAnySlotOccupied(hero) {
    let result = {slot: undefined, slotIsOccupied: false};
    if(hero.head != undefined) {
        result.slot = hero.head;
        result.slotIsOccupied = true;
        return result;
    }
    else if(hero.torso != undefined) {
        result.slot = hero.torso;
        result.slotIsOccupied = true;
        return result;
    }
    else if(hero.legs != undefined) {
        result.slot = hero.legs;
        result.slotIsOccupied = true;
        return result;
    }
    else if(hero.boots != undefined) {
        result.slot = hero.boots;
        result.slotIsOccupied = true;
        return result;
    }
    return result;
}