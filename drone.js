// import brain
// import music
// import moves

// todo: connect to drone

// todo: let brain choose move based on music


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