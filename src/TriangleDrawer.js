'use strict';

var Graphics = require('pixi.js').Graphics;

var TriangleDrawer = module.exports = function(_renderer, _stage) {
  let renderer = _renderer;
  let stage = _stage;
  let drawer = new Graphics();
  let triangle;
  let path;

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