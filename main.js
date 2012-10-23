(function(){
  
  document.addEventListener('DOMContentLoaded', function(e){
    var canvas = document.querySelector('canvas');
    var context = canvas.getContext('2d');
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    var randomPoints = [];
    var startingPoint = [Math.random()*canvasWidth, Math.random()*canvasHeight];
    var rotationalSteps = 8;
    var angularIncrement = Math.PI * 2 / rotationalSteps;

    function drawPoints(pointsArray, xMultiplier, yMultiplier){
      xMultiplier = xMultiplier || 1;
      yMultiplier = yMultiplier || 1;
      for(var i = 0, l = pointsArray.length; i < l; ++i){
        context.lineTo(xMultiplier * pointsArray[i][0], yMultiplier * pointsArray[i][1]);
      }
    }

    function drawFrame(xTranslate, yTranslate, xMultiplier, yMultiplier, colour){
      context.strokeStyle = colour || '#000';
      context.beginPath();
      context.translate(xTranslate, yTranslate);
      context.moveTo(xMultiplier * startingPoint[0], yMultiplier * startingPoint[1]);
      drawPoints(randomPoints, xMultiplier, yMultiplier);
      context.stroke();
    }

    function copyRotated(angle){
      context.rotate(angle);
      context.drawImage(canvas, -canvasWidth/2, -canvasHeight/2);
    }

    for(var i = 0; i < 7; ++i){
      randomPoints.push([Math.random()*canvasWidth, Math.random()*canvasHeight]);
    }

    drawFrame(0, 0, 1, 1, '#000');

    // x flip
    context.save();
    context.scale(-1, 1);
    context.translate(-canvasWidth, 0);
    context.drawImage(canvas, 0, 0);
    context.restore();

    // y flip
    context.save();
    context.scale(1, -1);
    context.translate(0, -canvasHeight);
    context.drawImage(canvas, 0, 0);
    context.restore();

    context.translate(canvasWidth/2, canvasHeight/2);
    context.save();
    context.beginPath();
    context.arc(0, 0, 50, 0, Math.PI*2, false);
    context.fill();

    for(var i = 0; i < rotationalSteps; ++i){
      copyRotated(angularIncrement);
    }

    context.restore();
  }, false);

}());