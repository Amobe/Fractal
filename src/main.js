'use strict';

var PIXI = require('pixi.js');

var renderer = PIXI.autoDetectRenderer(1000, 1000);
renderer.backgroundColor = 0x061639;
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

renderer.render(stage);