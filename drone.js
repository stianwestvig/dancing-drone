const Brain = require('./brain');
// import music
const moves = require('./moves');

// TODO: connect to drone

// TODO: let brain choose move based on music
//       Inputs to brain: strategy, moves, music
const DeepThought = new Brain('random', [], {});
DeepThought.test('World');

// drone 1: Mambo_612553

const RollingSpider = require('rolling-spider');
const temporal = require('temporal');
const rollingSpider = new RollingSpider();

rollingSpider.connect(() => {


  rollingSpider.setup(() => {
    rollingSpider.flatTrim();
    rollingSpider.startPing();
    rollingSpider.flatTrim();

    console.log('Connected to drone', rollingSpider.name);

    temporal.queue([
      {
        delay: 1000,
        task: () => {
          rollingSpider.takeOff();
          rollingSpider.flatTrim();
        }
      },
      {
        delay: 1000,
        task: () => rollingSpider.forward({steps: 12})
      },
      {
        delay: 1000,
        task: () => rollingSpider.land()
      },
      {
        delay: 1000,
        task: () => {
          temporal.clear();
          process.exit(0);
        }
      }
    ]);
  });
});
