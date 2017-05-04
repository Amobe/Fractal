'use strict';

var PIXI = require('pixi.js');
var Triangle = require('./Triangle.js');
var TriangleDrawer = require('./TriangleDrawer.js');

var renderer = PIXI.autoDetectRenderer(500, 500);
renderer.backgroundColor = 0x061639;
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

renderer.render(stage);

// create triangle
var shape = new Triangle();
shape.init();
shape.show();
shape.setStartAttractor(40, 500);

var drawer = new TriangleDrawer(renderer, stage);
drawer.setTriangle(shape);