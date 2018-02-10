const Brain = require('./brain');
const RollingSpider = require('rolling-spider');
const temporal = require('temporal');

let mambo_id;
!!(process.argv[2]) ? mambo_id = process.argv[2] : mambo_id = ['Mambo_612553', 'Mambo_509529'];

const rollingSpider = new RollingSpider({uuid: mambo_id});
const moves = require('./moves')(rollingSpider, bpm);
const DeepThought = new Brain(moves, {});

rollingSpider.connect(() => {
  rollingSpider.setup(() => {
    rollingSpider.flatTrim();
    rollingSpider.startPing();
    rollingSpider.flatTrim();

    //DeepThought.strategize('randomOne');
    DeepThought.strategize('specificOne', 0);
    console.log('Connected to drone', rollingSpider.name);
    temporal.queue([
        {
            delay: 1000,
            task: () => {
                rollingSpider.takeOff();
                rollingSpider.flatTrim();
            }
        }].concat(
            (DeepThought.answer().instructions).map((instruction) =>{ return instruction; }).concat(
            {
                delay: 1500,
                task: () => rollingSpider.land()
            },
            {
                delay: 1000,
                task: () => {
                    temporal.clear();
                    process.exit(0);
                }
            }
        ))
    );
  });
});
