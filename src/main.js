'use strict';

var PIXI = require('pixi.js');
var Triangle = require('./Triangle.js');
var TriangleDrawer = require('./TriangleDrawer.js');
var Slider = require('./Slider.js')
var SliderDrawer = require('./SliderDrawer.js')

var renderer = PIXI.autoDetectRenderer(800, 500);
renderer.backgroundColor = 0x061639;
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
document.body.appendChild(renderer.view);

requestAnimationFrame(animate);
function animate() {
  requestAnimationFrame(animate);
  renderer.render(stage);
}

var stage = new PIXI.Container();

// controll panel
var controllPanel = new PIXI.Graphics();
controllPanel.x = 500;
controllPanel.y = 0;
controllPanel.beginFill(0xEBE3E4);
controllPanel.drawRect(0, 0, 300, 500);
controllPanel.endFill();
stage.addChild(controllPanel);
renderer.render(stage);

// slider
var slider = new Slider(100, 100, 100, 1000);
var sliderDrawer = new SliderDrawer(renderer, controllPanel);
sliderDrawer.setSlider(slider);
sliderDrawer.draw();

// display panel
var displayPanel = new PIXI.Graphics();
displayPanel.x = 0;
displayPanel.y = 0;
displayPanel.beginFill(0x061639);
displayPanel.drawRect(0, 0, 500, 500);
displayPanel.endFill();
displayPanel.interactive = true;
stage.addChild(displayPanel);
renderer.render(stage);

// create triangle
var shape = new Triangle();
shape.init();
shape.show();

var drawer = new TriangleDrawer(renderer, displayPanel);
drawer.setTriangle(shape);

displayPanel.on('mousedown', onMouseDown);

function onMouseDown(e) {
  if (!shape.isStartAttractorSet) {
    let mouseData = e.data.getLocalPosition(stage);
    shape.setStartAttractor(mouseData.x, mouseData.y);
  } else {
    shape.startGenerator(100);
  }
}
