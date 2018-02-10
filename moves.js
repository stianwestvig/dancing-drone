function takeOff(drone) {
    return {
        delay: 1000,
        task: () => {
            drone.takeOff();
            drone.flatTrim();
        }
    }
}

function moveLeft(drone, bpm = 1000) {
  const steps = bpm / 100;
  console.log('LEFT steps', steps);
    return {
        delay: bpm,
        task: () => {
            drone.left({steps: steps, speed: 80 });
            drone.flatTrim();
        }
    }
}

function moveRight(drone,  bpm = 1000) {
  const steps = bpm / 100;
  console.log('RIGHT speed: steps', steps);
    return {
        delay: 0,
        task: () => {
            drone.right({steps: steps, speed: 80 });
            drone.flatTrim();
        }
    }
}

function frontFlip(drone) {
    return {
        delay: 1000,
        task: () => {
            drone.frontFlip({steps: 5});// XXX:
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

function forward(drone, bpm) {
    return {
        delay: bpm,
        task: () => {
            drone.forward({steps: 5});
            drone.flatTrim();
        }
    }
};

function backward(drone, bpm) {
    return {
        delay: bpm,
        task: () => {
            drone.backward({steps: 5});
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

function nod(drone, bpm = 129, reverse = false) {
    return {
        delay: 300,
        task: () => {
          if (reverse) {
            drone.backward({steps: 5, speed: 100 });
            drone.flatTrim();
          } else {
            drone.forward({steps: 5, speed: 100 });
            drone.flatTrim();
          }
        }
    }
}


function getBeatsPerMilliseconds(bpm) {
    return (bpm / 1000) / 60;
}


function getRelativeDelay(delay, bpm) {
    return ((delay * 1000) * 60) / bpm;
}


function getRelativePercentage(precentage, bpm) {
    return precentage;
}


function getMoves (drone, bpm) {
    return [
      {
          meta: { name: 'flat-eric'},
          instructions:[
              nod(drone, bpm),
              nod(drone, bpm, true),
              nod(drone, bpm),
              nod(drone, bpm, true),
              nod(drone, bpm),
              nod(drone, bpm, true),
              nod(drone, bpm),
              nod(drone, bpm, true),
              nod(drone, bpm),
          ]
      },
        {
            meta: { name: 'swagger'},
            instructions:[
                moveRight(drone, bpm),
                moveLeft(drone, bpm),
                moveRight(drone, bpm),

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
