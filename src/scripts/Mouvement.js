export const keys = {
	a: {
		pressed: false
	},
	d: {
		pressed: false
	},
	w: {
		pressed: false
	},
	s: {
		pressed: false
	}
}

export function PlayerMovementControlsDown(keys) {
	window.addEventListener("keydown", (event)=>{
		switch(event.code) {
			case "KeyA":
				keys.a.pressed = true
				break;
			case "KeyD":
				keys.d.pressed = true
				break;
			case "KeyW":
				keys.w.pressed = true
				break;
			case "KeyS":
				keys.s.pressed = true
				break;
		}
	})
}

export function PlayerMovementControlsUp(keys, animationInProgress) {

}