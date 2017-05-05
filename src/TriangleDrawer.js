'use strict';

var Graphics = require('pixi.js').Graphics;

var TriangleDrawer = module.exports = function(_renderer, _stage) {
  let renderer = _renderer;
  let stage = _stage;
  let drawer = new Graphics();
  let attractorDrawerList = [];
  let triangle;
  let path;

  window.addEventListener('onnextattractoradd', this, false);

  this.handleEvent = function(e) {
    switch (e.type) {
      case "onnextattractoradd":
        OnNextAttractorAdd.call(this, e.detail);
        break;
    }
  }

  this.setTriangle = function(_triangle) {
    triangle = _triangle;
    path = getTrianglePath.apply(this);
    drawer.clear();
    drawer.lineStyle(1, 0xDEDEDE, 1);
    drawer.drawPolygon(path);
    drawer.endFill();
    drawer.x = 0;
    drawer.y = 0;
    stage.addChild(drawer);
    this.draw();
  }

  this.getTriangle = function() {
    return triangle;
  }

  this.addAttractorDrawer = function(attractorDrawer) {
    attractorDrawerList.push(attractorDrawer);
    stage.addChild(attractorDrawer);
  }

  this.getAttractorDrawerList = function() {
    return attractorDrawerList;
  }

  this.draw = function() {
    renderer.render(stage);
  }
}

function getTrianglePath() {
  let triangle = this.getTriangle();
  let path = [
    triangle.getEndpoint(0).x,
    triangle.getEndpoint(0).y,
    triangle.getEndpoint(1).x,
    triangle.getEndpoint(1).y,
    triangle.getEndpoint(2).x,
    triangle.getEndpoint(2).y,
    triangle.getEndpoint(0).x,
    triangle.getEndpoint(0).y,
  ];
  return path;
}

function OnNextAttractorAdd(attractor) {
  let attractorDrawer = new Graphics();
  attractorDrawer.beginFill(0xDEDEDE);
  attractorDrawer.lineStyle(1, 0xFFFFFF);
  attractorDrawer.arc(0, 0, 1, 0, Math.PI * 2);
  attractorDrawer.x = attractor.x
  attractorDrawer.y = attractor.y;
  this.addAttractorDrawer(attractorDrawer);
  this.draw();
}