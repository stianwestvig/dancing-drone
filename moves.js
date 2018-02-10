const RollingSpider = require('rolling-spider');
const rollingSpider = new RollingSpider();

const takeOff = {
    delay: 1000,
    task: () => {
        rollingSpider.takeOff();
        rollingSpider.flatTrim();
    }
};

const moves = [{
  meta: {},
  instructions: takeOff
}];


module.exports = moves;