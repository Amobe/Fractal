'use strict';

var Graphics = require('pixi.js').Graphics;
var DEFAULT_KNOB_PATH = require('../assets/images/point.png');

var SliderDrawer = module.exports = function(_renderer, _stage) {
  let [DEFAULT_WIDTH, DEFAULT_COLOR] = [10, 0x888888];
  let [DEFAULT_KNOB_COLOR] = [0xAAAAAA]

  let renderer = _renderer;
  let stage = _stage;
  let slider = null;
  let lineDrawer = new Graphics();
  let knobTexture = new PIXI.Texture.fromImage(DEFAULT_KNOB_PATH);
  let knobDrawer = new PIXI.Sprite(knobTexture);
  
  window.addEventListener('onknobxset', this, false);
  
  this.handleEvent = function(e) {
    switch (e.type) {
      case "onknobxset":
        knobDrawer.position.x = e.detail;
        this.draw();
        break;
    }
  }
  
  this.setSlider = function(_slider) {
    slider = _slider;
    let [sliderX, sliderY] = slider.getLocation();
    let length = slider.getLength();
    lineDrawer.lineStyle(DEFAULT_WIDTH, DEFAULT_COLOR, 1);
    lineDrawer.moveTo(sliderX, sliderY);
    lineDrawer.lineTo(sliderX + length, sliderY);
    
    let [knobX, knobY] = slider.getKnobLocation();
    knobDrawer.interactive = true;
    knobDrawer.buttonMode = true;
    knobDrawer.anchor.x = 0.5;
    knobDrawer.anchor.y = 0.5;
    knobDrawer.position.x = knobX;
    knobDrawer.position.y = knobY;1
    knobDrawer.minX = sliderX;
    knobDrawer.maxX = sliderX + length;
    
    knobDrawer.mousedown = knobDrawer.touchstart = knobMouseDown;
    knobDrawer.mouseup = knobDrawer.mouseupoutside
                       = knobDrawer.mouseupoutside
                       = knobDrawer.touchend
                       = knobDrawer.touchendoutside
                       = knobMouseUp;
    knobDrawer.mousemove = knobDrawer.touchmove = knobMouseMove;
    
    stage.addChild(lineDrawer);
    stage.addChild(knobDrawer);
  }
  
  this.draw = function() {
    renderer.render(stage);
  }
}

function knobMouseDown(event) {
  this.data = event.data;
  this.isDragging = true;
  this.alpha = 0.9;
}

function knobMouseUp(event) {
  this.alpha = 1;
  this.isDragging = false;
  this.data = null;
}

function knobMouseMove(event) {
  if (this.isDragging && this.data) {
    let newPosition = this.data.getLocalPosition(this.parent);
    if (newPosition.x > this.minX && newPosition.x < this.maxX) {
      let event = new CustomEvent('onknobxchange', {
        detail: newPosition.x
      });
      window.dispatchEvent(event);
    }
  }
}

