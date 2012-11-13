define(['renderer/renderer'], function(Renderer){
  
  function CopyRenderer(outputCanvas, inputCanvas){
    Renderer.call(this, 'Copy', outputCanvas);
    this.inputCanvas = inputCanvas;
  }

  CopyRenderer.prototype = Object.create(Renderer.prototype);

  CopyRenderer.prototype.render = function(){
    var promise = this.startRender();

    this.context.save();
    this.applyTransform();
    this.context.drawImage(this.outputCanvas, 0, 0);
    this.context.restore();
    this.finishRender(promise);
  };

  return CopyRenderer;

});