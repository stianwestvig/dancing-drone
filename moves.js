function takeOff(drone) {
    return {
        delay: 1000,
        task: () => {
            drone.takeOff();
            drone.flatTrim();
        }
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
        delay: 2000,
        task: () => {
            drone.forward({steps: 15});
            drone.flatTrim();
        }
    }
};

function backward(drone) {
    return {
        delay: 2000,
        task: () => {
            drone.backward({steps: 15});
            drone.flatTrim();
        }
    }
};

function up(drone) {
    return {
        delay: 2000,
        task: () => {
            drone.up({speed: 50, steps: 20});
            drone.flatTrim();
        }
    }
};

function down(drone) {
    return {
        delay: 2000,
        task: () => {
            drone.down({speed: 50, steps: 20});
            drone.flatTrim();
        }
    }
};


function getMoves (drone) {
    return [
        {
            meta: { name: 'swagger'},
            instructions: [
                moveLeft(drone),
                moveRight(drone),
                moveLeft(drone),
                moveRight(drone),
                spin(drone)
            ]
        },
        {
            meta: { name: 'flip'},
            instructions: [
                moveLeft(drone),
                moveRight(drone),
                frontFlip(drone),
                spin(drone)
            ]
        },
        {
            meta: { name: 'rap'},
            instructions: [
                moveLeft(drone),
                moveRight(drone),
                moveLeft(drone),
                moveRight(drone),
                up(drone),
                down(drone),
                forward(drone),
                backward(drone),
                spin(drone)
            ]
        }
    ];
}


module.exports = getMoves;
