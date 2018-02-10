const Brain = require('./brain');
// import music
const moves = require('./moves');

// TODO: connect to drone

// TODO: let brain choose move based on music
//       Inputs to brain: strategy, moves, music
const DeepThought = new Brain('oneRandom', [], {});
DeepThought.test('World');

// drone 1: Mambo_612553

const RollingSpider = require('rolling-spider');
const temporal = require('temporal');
const rollingSpider = new RollingSpider({uuid: ['Mambo_612553', 'Mambo_509529']});

rollingSpider.connect(() => {


  rollingSpider.setup(() => {

    rollingSpider.flatTrim();
    rollingSpider.startPing();
    rollingSpider.flatTrim();

    console.log('Connected to drone', rollingSpider.name);

    temporal.queue([
        moves[0].instructions,
    ]);
  });
});
