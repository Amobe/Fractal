'use strict';

let [MIN_X, MAX_X, MIN_Y, MAX_Y] = [0, 500, 0, 500];

var Triangle = module.exports = function() {
  let endpointList = new Array();
  let startAttractor = {
    x: 0,
    y: 0
  };
  let attractorList = new Array();

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
    attractorList.push(startAttractor);
  }

  this.getStartAttractor = function() {
    return startAttractor;
  }

  // Select a endpoint randomly
  this.getNextAttractor = function() {
    let lastpoint = attractorList[attractorList.length - 1];
    let endpoint = getRandomEndpoint.apply(this);
    let midpoint = getMidpoint(lastpoint, endpoint);
    attractorList.push(midpoint);
    console.log(midpoint);
    return midpoint;
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