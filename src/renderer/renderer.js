define(['math/transform', 'util/promise'], function(Transform, Promise){
  
  var __guid = 0;

  function Renderer(type, outputCanvas){
    this.transform = new Transform();
    this.outputCanvas = outputCanvas;
    this.context = null;

    type = type || '';
    this.type = type + 'Renderer';
    this.name = this.type + __guid++;

    this.transform.setStateFunction('translate', this.translationFunction);
    this.transform.setStateFunction('rotate', this.rotationFunction);
    this.transform.setStateFunction('scale', this.scaleFunction);

    this.model = {};
  }

  Renderer.prototype.startRender = function(){
    this.context = this.outputCanvas.getContext('2d');
    return new Promise();
  };

  Renderer.prototype.finishRender = function(promise){
    this.context = null;
    promise.notify();
  };

  Renderer.prototype.translationFunction = function(){
    this.context.translate(this.transform.translation[0], this.transform.translation[1]);
  };

  Renderer.prototype.rotationFunction = function(){
    this.context.rotate(this.transform.rotation);
  };

  Renderer.prototype.scaleFunction = function(){
    this.context.scale(this.transform.scale[0], this.transform.scale[1]);
  };

  Renderer.prototype.applyTransform = function(){
    this.transform.runStateFunctions(this);
  };

  return Renderer;

});