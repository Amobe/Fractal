'use strict';

let [MIN_X, MAX_X, MIN_Y, MAX_Y] = [0, 500, 0, 500];
let DEFAULT_TIMEOUT = 250;

var Triangle = module.exports = function() {
  let endpointList = new Array();
  let startAttractor = {
    x: 0,
    y: 0
  };
  let attractorList = new Array();
  let timeoutValue = DEFAULT_TIMEOUT;
  this.isStartAttractorSet = false;
  this.isGeneratorRunning = false;

  window.addEventListener('onknobxset', this, false);

  this.handleEvent = function(e) {
    switch (e.type) {
      case "onknobxset":
        timeoutValue = e.detail.slider.getValue();
        break;
    }
  }

  this.init = function() {
    endpointList.push(getPoint());
    endpointList.push(getPoint());
    endpointList.push(getPoint());
  }

  this.show = function() {
    endpointList.map(function(point) {
      console.log(`x: ${point.x}, y: ${point.y}`);
    })
  }

  this.getEndpoint = function(index) {
    return endpointList[index];
  }

  this.setStartAttractor = function(x, y) {
    startAttractor = {
      x,
      y
    };
    this.addAttractor(startAttractor);
    this.isStartAttractorSet = true;
  }

  this.getStartAttractor = function() {
    return startAttractor;
  }

  this.getLastAttractor = function() {
    return attractorList[attractorList.length - 1];
  }

  this.addAttractor = function(attractor) {
    attractorList.push(attractor);

    let event = new CustomEvent('onnextattractoradd', {
      detail: attractor
    });
    window.dispatchEvent(event);
  }

  this.startGenerator = async function(times) {
    if (this.isGeneratorRunning) {
      console.log('The attractor generator is still running.');
      return;
    }
    let i = 0;
    this.isGeneratorRunning = true;
    while (i++ < times) {
      await timeout(timeoutValue);
      getNextAttractor.apply(this);
    }
    this.isGeneratorRunning = false;
  }
}

function getRandom(low, up) {
  return Math.random() * (up - low + 1.0) + low;
}

function getRandomInt(low, up) {
  return Math.floor(getRandom(low, up));
}

// Generate a random point in (0, 0) to (1000, 1000)
function getPoint() {
  return {
    x: getRandomInt(MIN_X, MAX_X),
    y: getRandomInt(MIN_Y, MAX_Y)
  }
}

function getRandomEndpoint() {
  let index = getRandomInt(1, 3);
  return this.getEndpoint(index - 1);
}

function getMidpoint(point1, point2) {
  return {
    x: Number(((point1.x + point2.x) / 2).toFixed(2)),
    y: Number(((point1.y + point2.y) / 2).toFixed(2))
  };
}

// Calculate the midpoint between last attractor and randomly endpoint
function getNextAttractor() {
  let lastpoint = this.getLastAttractor();
  let endpoint = getRandomEndpoint.apply(this);
  let midpoint = getMidpoint(lastpoint, endpoint);

  this.addAttractor(midpoint);

  return midpoint;
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms, 'done'));
}