function takeOff(drone) {
    return {
        delay: 1000,
        task: () => {
            drone.takeOff();
            drone.flatTrim();
        }
    }
}

function landing(drone) {
    return {
        delay: 1000,
        task: () => drone.land()
    }
}

function moveLeft(drone) {
    return {
        delay: 2000,
        task: () => {
            drone.left({steps: 5});
            drone.flatTrim();
        }
    }
}

function moveRight(drone) {
    return {
        delay: 2000,
        task: () => {
            drone.right({steps: 5});
            drone.flatTrim();
        }
    }
}

function frontFlip(drone) {
    return {
        delay: 5000,
        task: () => {
            drone.frontFlip({steps: 5});
            drone.flatTrim();
        }
    }
};

function upAndDown(drone) {
    return [
        {
            delay: 1000,
            task: () => {
                drone.takeOff();
                drone.flatTrim();
            }
        },
        {
            delay: 1000,
            task: () => drone.land()
        }
    ]
}

function leftToRight(drone) {
    return [
        {
            delay: 1000,
            task: () => {
                drone.takeOff();
                drone.flatTrim();
            }
        },
        {
            delay: 2000,
            task: () => {
                drone.left({steps: 5});
                drone.flatTrim();
            }
        },
        {
            delay: 2000,
            task: () => {
                drone.right({steps: 5});
                drone.flatTrim();
            }
        },
        {
            delay: 1000,
            task: () => drone.land()
        }
    ]
}


function getMoves (drone) {
    return [{
        meta: {},
        instructions: [takeOff(drone), moveLeft(drone), moveRight(drone), frontFlip(drone), landing(drone)]
    }];
}


module.exports = getMoves;
