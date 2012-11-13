define(['renderer/renderer'], function(Renderer){
  
  function LineRenderer(colour, xMultiplier, yMultiplier, outputCanvas){
    Renderer.call(this, 'Line', outputCanvas);

    this.model.colour = colour;
    this.model.xMultiplier = xMultiplier;
    this.model.yMultiplier = yMultiplier;
  }

  LineRenderer.prototype = Object.create(Renderer.prototype);

  LineRenderer.prototype.render = function(dataSource){
    var that = this;

    var promise = this.startRender();

    var model = this.model;

    dataSource.generate().then(function(data){
      var context = that.context;

      context.save();

      var xMultiplier = model.xMultiplier || 1;
      var yMultiplier = model.yMultiplier || 1;
      var colour = model.colour || '#000';

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

  LineRenderer.prototype.generateView = function(gui, updateFunction){
    var folder = gui.addFolder(this.name);
    var model = this.model;

    updateFunction = updateFunction || function(){};

    folder.addColor(model, 'colour').onChange(updateFunction);
  };

  return LineRenderer;

});