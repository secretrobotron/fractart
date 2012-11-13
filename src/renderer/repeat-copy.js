define(['renderer/renderer', 'math/transform'], function(Renderer, Transform){
  
  function RepeatCopyRenderer(outputCanvas, inputCanvas, steps){
    Renderer.call(this, outputCanvas);
    this.inputCanvas = inputCanvas;
    this.steps = steps;
    this.repeatTransforms = [];
    this.repeatTransformRepetitions = [];
  }

  RepeatCopyRenderer.prototype = Object.create(Renderer.prototype);

  RepeatCopyRenderer.prototype.repeatTranslationFunction = function(transform){
    this.context.translate(transform.translation[0], transform.translation[1]);
  };

  RepeatCopyRenderer.prototype.repeatRotationFunction = function(transform){
    this.context.rotate(transform.rotation);
  };

  RepeatCopyRenderer.prototype.repeatScaleFunction = function(transform){
    this.context.scale(transform.scale[0], transform.scale[1]);
  };

  RepeatCopyRenderer.prototype.addTransform = function(repetitions){
    var t = new Transform();
    t.setStateFunction('translate', this.repeatTranslationFunction);
    t.setStateFunction('rotate', this.repeatRotationFunction);
    t.setStateFunction('scale', this.repeatScaleFunction);
    this.repeatTransforms.push(t);
    this.repeatTransformRepetitions.push(repetitions || 1);
    return t;
  };

  RepeatCopyRenderer.prototype.renderTransformStack = function(copyCanvas, index){
    var repetitions = this.repeatTransformRepetitions[index];

    this.context.save();
    for(var i = repetitions - 1; i >= 0; --i){

      this.repeatTransforms[index].runStateFunctions(this);

      if(index + 1 < this.repeatTransforms.length){
        this.renderTransformStack(copyCanvas, index + 1);
      }
      else {
        this.context.drawImage(copyCanvas, 0, 0);
      }

    }
    this.context.restore();
  };

  RepeatCopyRenderer.prototype.render = function(){
    var promise = this.startRender();

    this.context.save();
    this.applyTransform();

    var copyCanvas = document.createElement('canvas');
    copyCanvas.width = this.inputCanvas.width;
    copyCanvas.height = this.outputCanvas.height;

    copyCanvas.getContext('2d').drawImage(this.inputCanvas, 0, 0);

    this.context.save();
    for(var i = this.steps - 1; i >= 0; --i){
      this.renderTransformStack(copyCanvas, 0);
    }
    this.context.restore();

    this.context.restore();
    this.finishRender(promise);
  };

  return RepeatCopyRenderer;

});