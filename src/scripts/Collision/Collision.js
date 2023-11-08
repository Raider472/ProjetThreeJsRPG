export function collision(obstacle, sprite, velocity) {
    const xColl = obstacle.right >= sprite.left + velocity.x && obstacle.left <= sprite.right + velocity.x
    const yColl = sprite.top + velocity.y >= obstacle.bottom && sprite.bottom + velocity.y <= obstacle.top
    return xColl && yColl
}

export function collisionFromLeft(obstacle, sprite, velocity) {
    const originalPositionRight = sprite.right
    const futurePosition = originalPositionRight + velocity.x
    if(futurePosition >= obstacle.left && !(futurePosition >= obstacle.right) && sprite.position.y <= obstacle.top && sprite.position.y >= obstacle.bottom) {
        return true
    }
    else {
        return false
    }
}

export function collisionFromRight(obstacle, sprite, velocity) {
    const originalPositionLeft = sprite.left
    const futurePosition = originalPositionLeft + velocity.x
    if(futurePosition <= obstacle.right && !(futurePosition <= obstacle.left) && sprite.position.y <= obstacle.top && sprite.position.y >= obstacle.bottom) {
        return true
    }
    else {
        return false
    }
}

export function collisionFrombottom(obstacle, sprite, velocity) {
    const originalPositionbottom = sprite.bottom
    const futurePosition = originalPositionbottom + velocity.y
    if(futurePosition <= obstacle.top && !(futurePosition >= obstacle.bottom) && sprite.position.x >= obstacle.left && sprite.position.x <= obstacle.right) {
        return true
    }
    else {
        return false
    }
}

export function collisionFromtop(obstacle, sprite, velocity) {
    const originalPositiontop = sprite.top
    const futurePosition = originalPositiontop + velocity.y 
    if(futurePosition >= obstacle.top && !(futurePosition <= obstacle.bottom) && sprite.position.x >= obstacle.left && sprite.position.x <= obstacle.right) {
        return true
    }
    else {
        return false
    }
}

export function collisionDetection(obstacle, sprite) {
    obstacle.forEach((obstacles) => {
		if(collision(obstacles, sprite, sprite.velocity)) {
			if(collisionFromLeft(obstacles, sprite, sprite.velocity)) {
                if(sprite.velocity.x > 0) {
                    sprite.velocity.x = 0
                }
            }
            if(collisionFromRight(obstacles, sprite, sprite.velocity)) {
                if(sprite.velocity.x < 0) {
                    sprite.velocity.x = 0
                }
            }
            if(collisionFrombottom(obstacles, sprite, sprite.velocity)) {
                if(sprite.velocity.y > 0) {
                    sprite.velocity.y = 0
                }
            }
            if(collisionFromtop(obstacles, sprite, sprite.velocity)) {
                if (sprite.velocity.y < 0) {
                    sprite.velocity.y = 0
                }
            }
		}
	})
}