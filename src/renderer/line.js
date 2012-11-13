define(['renderer/renderer'], function(Renderer){
  
  function LineRenderer( outputCanvas ){
    Renderer.call(this, outputCanvas);
  }

  LineRenderer.prototype = Object.create(Renderer.prototype);

  LineRenderer.prototype.render = function(dataSource, xMultiplier, yMultiplier, colour){
    var that = this;

    var promise = this.startRender();

    dataSource.generate().then(function(data){
      var context = that.context;

      context.save();

      xMultiplier = xMultiplier || 1;
      yMultiplier = yMultiplier || 1;
      colour = colour || '#000';

      context.strokeStyle = colour;
      context.beginPath();

      that.applyTransform();

      context.moveTo(xMultiplier * data[0], yMultiplier * data[1]);

      for(var i = 1, l = data.length; i < l; ++i){
        context.lineTo(xMultiplier * data[i][0], yMultiplier * data[i][1]);
      }

      context.stroke();

      context.restore();

      that.finishRender(promise);
    });
  };

  return LineRenderer;

});