
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


function getMoves (drone) {
    return [{
        meta: {},
        instructions: upAndDown(drone)
    }];
}


module.exports = getMoves;