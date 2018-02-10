// todo: export a stream of audio analyze data for brain to consume
const fs = require('fs');
const Analyser = require('audio-analyser');

// For tempo purposes
var AudioContext = require("web-audio-api").AudioContext;
var MusicTempo = require("music-tempo");

// play the music
const player = require('play-sound')(opts = {});
const playerHandler = player.play('./flying.mp3', function(err){
  if (err) throw err;
  //console.log(err);
});

const readStream = fs.createReadStream('./flying.mp3');
const music = new Analyser({
	// Magnitude diapasone, in dB
	minDecibels: -1000,
	maxDecibels: 0,

	// Number of time samples to transform to frequency
	fftSize: 256,

	// Number of frequencies, twice less than fftSize
	frequencyBinCount: 256 / 2,

	// Smoothing, or the priority of the old data over the new data
	smoothingTimeConstant: 0.2,

	// Number of channel to analyse
	channel: 1,

	// Size of time data to buffer
	bufferSize: 44100,

	//...pcm-stream params, if required
	'pcm-stream': {
		channels: 1,
		sampleRate: 16000,
		bitDepth: 16,
		byteOrder: 'LE',
		max: 32767,
		min: -32768,
		samplesPerFrame: 1024,
	}
});

readStream.on('data', (chunk) => { });

music.on('data', (chunk) => {
  const floatFreq = music.getFloatFrequencyData(new Float32Array(music.fftSize));
  const waveform = music.getFloatTimeDomainData(new Float32Array(music.fftSize));
  //console.log('frequency', floatFreq);
  //console.log('waveform', waveform);
})

var bpm;

var calcTempo = function (buffer) {
  var audioData = [];
  // Take the average of the two channels
  if (buffer.numberOfChannels == 2) {
    var channel1Data = buffer.getChannelData(0);
    var channel2Data = buffer.getChannelData(1);
    var length = channel1Data.length;
    for (var i = 0; i < length; i++) {
      audioData[i] = (channel1Data[i] + channel2Data[i]) / 2;
    }
  } else {
    audioData = buffer.getChannelData(0);
  }
  var mt = new MusicTempo(audioData);

  console.log(mt.tempo); // catch bpm
  //console.log(mt.beats);

  bpm = mt.tempo;
}

var data = fs.readFileSync('./flying.mp3');
var context = new AudioContext();

context.decodeAudioData(data, calcTempo);
bpm = 129;

module.exports = {
	playerHandler,
	music: {
		stream: readStream.pipe(music),
		bpm: bpm
	}
};
