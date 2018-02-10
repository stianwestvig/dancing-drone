function takeOff(drone, quarter) {
    return {
        delay: quarter * 4,
        task: () => {
            drone.takeOff();
            drone.flatTrim();
        }
    }
}

function moveLeft(drone, quarter) {
    return {
        delay: quarter,
        task: () => {
            drone.left({steps: quarter / 93, speed: 80 });
            drone.flatTrim();
        }
    }
}

function moveRight(drone, quarter) {
    return {
        delay: quarter,
        task: () => {
            drone.right({steps: quarter / 93, speed: 80 });
            drone.flatTrim();
        }
    }
}

function frontFlip(drone, quarter) {
    return {
        delay: quarter,
        task: () => {
            drone.frontFlip({steps: quarter / 93 });
            drone.flatTrim();
        }
    }
};

function spin(drone, quarter) {
    return {
        delay: quarter,
        task: () => {
            drone.clockwise({speed: 100, steps: quarter / 93});
            drone.flatTrim();
        }
    }
};

function forward(drone, quarter) {
    return {
        delay: quarter,
        task: () => {
            drone.forward({steps: quarter / 93});
            drone.flatTrim();
        }
    }
};

function backward(drone, quarter) {
    return {
        delay: quarter,
        task: () => {
            drone.backward({steps: quarter / 93});
            drone.flatTrim();
        }
    }
};

function up(drone, quarter) {
    return {
        delay: quarter,
        task: () => {
            drone.up({speed: 100, steps: quarter / 93});
            drone.flatTrim();
        }
    }
};

function down(drone, quarter) {
    return {
        delay: quarter,
        task: () => {
            drone.down({speed: 100, steps: quarter / 93});
            drone.flatTrim();
        }
    }
};

function nod(drone, quarter, reverse = false) {
    return {
        delay: quarter,
        task: () => {
          if (reverse) {
            drone.backward({steps: quarter / 93, speed: 100 });
            drone.flatTrim();
          } else {
            drone.forward({steps: quarter / 93, speed: 100 });
            drone.flatTrim();
          }
        }
    }
}

function pause(drone, quarter) {
    return {
        delay: quarter,
        task: () => {
          drone.flatTrim();
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


function getMoves (drone, quarter) {
    return [
      {
          meta: { name: 'flat-eric'},
          instructions:[
              // first
              forward(drone, quarter),
              backward(drone, quarter),
              backward(drone, quarter),
              backward(drone, quarter),

              moveLeft(drone, quarter),
              moveRight(drone, quarter),
              moveLeft(drone, quarter),
              moveRight(drone, quarter),

              up(drone, quarter),
              down(drone, quarter),
              up(drone, quarter),
              down(drone, quarter),

              forward(drone, quarter / 2),
              backward(drone, quarter / 2),
              forward(drone, quarter / 2),
              backward(drone, quarter / 2),
              frontFlip(drone, quarter * 2),


              // second
              forward(drone, quarter),
              backward(drone, quarter),
              backward(drone, quarter),
              backward(drone, quarter),

              moveLeft(drone, quarter),
              moveRight(drone, quarter),
              moveLeft(drone, quarter),
              moveRight(drone, quarter),

              up(drone, quarter),
              down(drone, quarter),
              up(drone, quarter),
              down(drone, quarter),

              forward(drone, quarter / 2),
              backward(drone, quarter / 2),
              forward(drone, quarter / 2),
              backward(drone, quarter / 2),
              frontFlip(drone, quarter * 2),


              // third
              forward(drone, quarter),
              backward(drone, quarter),
              backward(drone, quarter),
              backward(drone, quarter),

              moveLeft(drone, quarter),
              moveRight(drone, quarter),
              moveLeft(drone, quarter),
              moveRight(drone, quarter),

              up(drone, quarter),
              down(drone, quarter),
              up(drone, quarter),
              down(drone, quarter),

              forward(drone, quarter / 2),
              backward(drone, quarter / 2),
              forward(drone, quarter / 2),
              backward(drone, quarter / 2),
              frontFlip(drone, quarter * 2),


              // fourth
              forward(drone, quarter),
              backward(drone, quarter),
              backward(drone, quarter),
              backward(drone, quarter),

              moveLeft(drone, quarter),
              moveRight(drone, quarter),
              moveLeft(drone, quarter),
              moveRight(drone, quarter),

              up(drone, quarter),
              down(drone, quarter),
              up(drone, quarter),
              down(drone, quarter),

              forward(drone, quarter / 2),
              backward(drone, quarter / 2),
              forward(drone, quarter / 2),
              backward(drone, quarter / 2),
              frontFlip(drone, quarter * 2),


              // fifth
              forward(drone, quarter),
              backward(drone, quarter),
              backward(drone, quarter),
              backward(drone, quarter),

              moveLeft(drone, quarter),
              moveRight(drone, quarter),
              moveLeft(drone, quarter),
              moveRight(drone, quarter),

              up(drone, quarter),
              down(drone, quarter),
              up(drone, quarter),
              down(drone, quarter),

              forward(drone, quarter / 2),
              backward(drone, quarter / 2),
              forward(drone, quarter / 2),
              backward(drone, quarter / 2),
              frontFlip(drone, quarter * 2),
          ]
      },
        {
            meta: { name: 'swagger'},
            instructions:[
                moveRight(drone, quarter),
                moveLeft(drone, quarter),
                moveRight(drone, quarter),

            ]
        },
        {
            meta: { name: 'flip'},
            instructions: [
                moveLeft(drone, quarter),
                moveRight(drone, quarter),
                frontFlip(drone, quarter),
                spin(drone, quarter)
            ]
        },
        {
            meta: { name: 'rap'},
            instructions: [
                moveLeft(drone, quarter),
                moveRight(drone, quarter),
                moveLeft(drone, quarter),
                moveRight(drone, quarter),
                up(drone, quarter),
                down(drone, quarter),
                forward(drone, quarter),
                backward(drone, quarter),
                spin(drone, quarter)
            ]
        }
    ];
}


module.exports = getMoves;
