const Brain = require('./brain');
// import music

// TODO: connect to drone

// drone 1: Mambo_612553

const RollingSpider = require('rolling-spider');
const temporal = require('temporal');
const music = require('./music');
console.log(music);

// Arg handling
/*
        process.argv.forEach(function (val, index, array) {
          console.log(index + ': ' + val);
        });
 */
let mambo_id;
!!(process.argv[2]) ? mambo_id = process.argv[2] : mambo_id = ['Mambo_612553', 'Mambo_509529'];
const rollingSpider = new RollingSpider({uuid: mambo_id});
const moves = require('./moves')(rollingSpider);

// TODO: let brain choose move based on music
//       Inputs to brain: moves, music
const DeepThought = new Brain(moves, music.stream);
//DeepThought.test('World');


rollingSpider.connect(() => {


  rollingSpider.setup(() => {

    rollingSpider.flatTrim();
    rollingSpider.startPing();
    rollingSpider.flatTrim();

    DeepThought.strategize('randomOne');
    console.log(DeepThought.answer());

    console.log('Connected to drone', rollingSpider.name);
    temporal.queue([
        {
            delay: 1000,
            task: () => {
                rollingSpider.takeOff();
                rollingSpider.flatTrim();
            }
        }].concat(
        -   (DeepThought.answer().instructions).map((instruction) => { return instruction; }).concat(
            {
                delay: 1000,
                task: () => rollingSpider.land()
            },
            {
                delay: 1000,
                task: () => {
                    temporal.clear();
                    music.playerHandler.kill();
                    process.exit(0);
                }
            }
        ))
    );
  });
});
