const Brain = require('./brain');
const RollingSpider = require('rolling-spider');
const temporal = require('temporal');
const readline = require('readline');

let mambo_id;
!!(process.argv[2]) ? mambo_id = process.argv[2] : mambo_id = ['Mambo_612553', 'Mambo_509529'];

const rollingSpider = new RollingSpider({uuid: mambo_id});
const quarter = 465; // flat eric
const moves = require('./moves')(rollingSpider, quarter);
const DeepThought = new Brain(moves, {bpm: 129});

rollingSpider.connect(() => {
  rollingSpider.setup(() => {
    rollingSpider.flatTrim();
    rollingSpider.startPing();
    rollingSpider.flatTrim();

    //DeepThought.strategize('randomOne');
    DeepThought.strategize('specificOne', 0);
    console.log('Connected to drone', rollingSpider.name);

    rollingSpider.takeOff();
    rollingSpider.flatTrim();

    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    console.log('Press SPACE to start the DANCE ROUTINE!!!')
    // listen for the "keypress" event
    process.stdin.on('keypress', function (ch, key) {
        if (key.ctrl && key.name === 'c') {
            temporal.clear();
            rollingSpider.land()
            process.exit(); // eslint-disable-line no-process-exit
          }
          if (key && key.name == 'space') {
            console.log("Bustin' a move...")
            temporal.queue(
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
            ));
        }
    });
  });
});
