class Brain {
    /*
     * The brain of our application;
     *
     * @param {String} strategy                 What strategy to choose.
     * @param {Object} [moves]                  The available moves.
     * @param {Object} move.meta                Metadata available for a move; e.g. Category.
     * @param {Object} move.instructions        One of the model's options.
     * @param {Object} music                    Music stream
     */

    constructor(strategy, moves, music) {
        this.strategy = strategy;
        this.moves = moves;
        this.music = music;
    }

    randomStrategy() {
        return this.moves.reduce((promiseChain, currentMove) => {
            return promiseChain.then(chainResults =>
                currentMove.then(currentResult =>
                    [ ...chainResults, currentResult ]
                )
            );
        }, Promise.resolve([])).then(arrayOfResults => {
            // Do something with all results
        });
    }

    test(arg) {
        this['greet'](arg);
    }

    greet(name='World') {
        console.log('Hello, ' + name);
        throw new Error("Die for deubg reasons...");
    }

}

module.exports = Brain;
