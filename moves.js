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
        delay: 1000,
        task: () => {
            drone.left({steps: 5});
            drone.flatTrim();
        }
    }
}

function moveRight(drone) {
    return {
        delay: 1000,
        task: () => {
            drone.right({steps: 5});
            drone.flatTrim();
        }
    }
}

function frontFlip(drone) {
    return {
        delay: 1000,
        task: () => {
            drone.frontFlip({steps: 5});
            drone.flatTrim();
        }
    }
};

function spin(drone) {
    return {
        delay: 1000,
        task: () => {
            drone.clockwise({speed: 200, steps: 100});
            drone.flatTrim();
        }
    }
};

function forward(drone) {
    return {
        delay: 1000,
        task: () => {
            drone.forward({steps: 5});
            drone.flatTrim();
        }
    }
};

function backward(drone) {
    return {
        delay: 1000,
        task: () => {
            drone.backward({steps: 5});
            drone.flatTrim();
        }
    }
};

function up(drone) {
    return {
        delay: 1000,
        task: () => {
            drone.up({speed: 200, steps: 100});
            drone.flatTrim();
        }
    }
};

function down(drone) {
    return {
        delay: 1000,
        task: () => {
            drone.down({speed: 200, steps: 100});
            drone.flatTrim();
        }
    }
};


function getMoves (drone) {
    return [
        {
            meta: { name: 'swagger'},
            instructions: [
                takeOff(drone),
                moveLeft(drone),
                moveRight(drone),
                moveLeft(drone),
                moveRight(drone),
                spin(drone),
                landing(drone)]
        },
        {
            meta: { name: 'flip'},
            instructions: [
                takeOff(drone),
                moveLeft(drone),
                moveRight(drone),
                frontFlip(drone),
                landing(drone)
            ]
        },
        {
            meta: { name: 'rap'},
            instructions: [
                takeOff(drone),
                moveLeft(drone),
                moveRight(drone),
                moveLeft(drone),
                moveRight(drone),
                up(drone),
                down(drone),
                up(drone),
                down(drone),
                up(drone),
                down(drone),
                spin(drone),
                landing(drone)]
        }
    ];
}


module.exports = getMoves;