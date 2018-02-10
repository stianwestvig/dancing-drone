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

    constructor(moves, music) {
        this.moves = moves;
        this.music = music;
        this.result = [];
    }

    strategize(strategy, arg='') {
        console.log('Running strategy' + strategy);
        if (!!this[strategy]) this.result = this[strategy](arg); else throw new Error(strategy + ': Not a valid strategy.');
    }

    answer() {
        return this.result;
    }

    /*
            STRAGEGIES
     */

    randomOne() {
        /*
            Returns one random move from the list of moves.
        */
        return this.moves[Math.floor(Math.random()*this.moves.length)];
    }

    specificOne(index) {
      return this.moves[index];
    }

    randomSequence() {
        // WIP: Randomize an array of promises, etc. ...
        shuffle(this.moves);
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

    /*
            TEST/DEUG
     */
    test(arg) {
        this['greet'](arg);
    }

    greet(name='World') {
        console.log('Hello, ' + name);
        //throw new Error("Die for deug reasons...");
    }
}

module.exports = Brain;
