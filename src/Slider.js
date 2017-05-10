'use strict';

var Slider = module.exports = function(_x, _y, _length, _level) {
  let [slideX, slideY, length, level] = [_x, _y, _length, _level];
  let [knobX] = [_x];
  
  window.addEventListener('onknobxchange', this, false);
  
  this.handleEvent = function(e) {
    switch (e.type) {
      case "onknobxchange":
        this.setKnobX(e.detail);
        break;
    }
  }

  this.getLocation = function() {
    return [slideX, slideY];
  }
  
  this.getLength = function() {
    return length;
  }
  
  this.getValue = function() {
    return ((knobX - slideX) / length) * level;
  }
  
  this.setKnobX = function(_x) {
    knobX = _x;
    
    let event = new CustomEvent('onknobxset', {
      detail: knobX
    });
    window.dispatchEvent(event);
  }
  
  this.getKnobLocation = function() {
    return [knobX, slideY];
  }
}
