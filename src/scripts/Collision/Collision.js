import { camera } from "../EnvironmentSceneManager";

export function collision(obstacle, sprite, velocity) {
    const xColl = obstacle.right >= sprite.left + velocity.x && obstacle.left <= sprite.right + velocity.x;
    const yColl = sprite.top + velocity.y >= obstacle.bottom && sprite.bottom + velocity.y <= obstacle.top;
    return xColl && yColl;
}

export function collisionFromLeft(obstacle, sprite, velocity) {
    const originalPositionRight = sprite.right;
    const futurePosition = originalPositionRight + velocity.x;
    if(futurePosition >= obstacle.left && !(futurePosition >= obstacle.right) && sprite.position.y <= obstacle.top && sprite.position.y >= obstacle.bottom) {
        return true;
    }
    else {
        return false;
    }
}

export function collisionFromRight(obstacle, sprite, velocity) {
    const originalPositionLeft = sprite.left;
    const futurePosition = originalPositionLeft + velocity.x;
    if(futurePosition <= obstacle.right && !(futurePosition <= obstacle.left) && sprite.position.y <= obstacle.top && sprite.position.y >= obstacle.bottom) {
        return true;
    }
    else {
        return false;
    }
}

export function collisionFrombottom(obstacle, sprite, velocity) {
    const originalPositionbottom = sprite.bottom;
    const futurePosition = originalPositionbottom + velocity.y;
    if(futurePosition <= obstacle.top && !(futurePosition >= obstacle.bottom) && sprite.position.x >= obstacle.left && sprite.position.x <= obstacle.right) {
        return true;
    }
    else {
        return false;
    }
}

export function collisionFromtop(obstacle, sprite, velocity) {
    const originalPositiontop = sprite.top;
    const futurePosition = originalPositiontop + velocity.y;
    if(futurePosition >= obstacle.top && !(futurePosition <= obstacle.bottom) && sprite.position.x >= obstacle.left && sprite.position.x <= obstacle.right) {
        return true;
    }
    else {
        return false;
    }
}

export function collisionDetection(obstacle, sprite) {
    obstacle.forEach((obstacles) => {
		if(collision(obstacles, sprite, sprite.velocity)) {
			if(collisionFromLeft(obstacles, sprite, sprite.velocity)) {
                if(sprite.velocity.x > 0) {
                    sprite.velocity.x = 0
                    camera.position.x = sprite.position.x
                    
                }
            }
            if(collisionFromRight(obstacles, sprite, sprite.velocity)) {
                if(sprite.velocity.x < 0) {
                    sprite.velocity.x = 0
                    camera.position.x = sprite.position.x

                }
            }
            if(collisionFrombottom(obstacles, sprite, sprite.velocity)) {
                if(sprite.velocity.y > 0) {
                    sprite.velocity.y = 0
                    camera.position.y = sprite.position.y
                    
                }
            }
            if(collisionFromtop(obstacles, sprite, sprite.velocity)) {
                if (sprite.velocity.y < 0) {
                    sprite.velocity.y = 0
                    camera.position.y = sprite.position.y
        
                }
            }
		}
	})
}

export function collisionMonsters(monsters, sprite) {
    let result = { collision: false, monster: null};

    monsters.some((monster) => {
        if (collision(monster, sprite, sprite.velocity)) {
            result.collision = true;
            result.monster = monster;
            return true;
        }
        return false;
    });

    return result;
}

export function collisionChest(chests, sprite) {
    let result = { collision: false, chest: null};

    chests.some((chest) => {
        if (collision(chest, sprite, sprite.velocity) && !chest.open) {
            result.collision = true;
            result.chest = chest;
            return true;
        }
        return false;
    })

    return result;
}

export function collisionFinalDoor(doors, sprite) {
    let result = { collision: false, door: null};

    doors.some((door) => {
        if (collision(door, sprite, sprite.velocity)) {
            result.collision = true;
            result.door = door;
            return true;
        }
        return false;
    })

    return result;
}

export function collisionShop(shop, sprite) {

    if(shop === undefined) {
        return false;
    }

    if(isBetweenShop(shop, sprite) && isInRangeShop(shop, sprite)) {
        return true;
    }

    return false;
}

function isBetweenShop(shop, sprite) {
    let posX = sprite.position.x;
    let shopLeft = shop.left;
    let shopRight = shop.right;
    
    if(posX >= shopLeft && posX <= shopRight) {
        return true;
    }

    return false;
}

function isInRangeShop(shop, sprite) {
    let posY = sprite.position.y;
    let shopTop = shop.top;
    let shopBottom = shop.bottom;
    let result = (shopTop - shopBottom) / 2;
    result -= shopBottom
    result *= -1 

    if(posY <= shopBottom && posY >= result) {
        return true;
    }

    return false;
}