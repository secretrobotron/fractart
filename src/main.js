(function(){

  require(['data-source/points', 'renderer/line', 'renderer/copy', 'renderer/repeat-copy'],
    function(PointsDataSource, LineRenderer, CopyRenderer, RepeatCopyRenderer){

    var NUM_ROTATION_STEPS = 8;

    var mainCanvas = document.querySelector('canvas');

    function start(){
      var pointsDataSource = new PointsDataSource(0, 0, mainCanvas.width, mainCanvas.height, 6);
      var lineRenderer = new LineRenderer(mainCanvas);
      var copyRenderer = new CopyRenderer(mainCanvas, mainCanvas);
      var repeatCopyRenerer = new RepeatCopyRenderer(mainCanvas, mainCanvas, 1);
      var copyRenderer2 = new CopyRenderer(mainCanvas, mainCanvas);

      copyRenderer.transform.scale = [-1, 1];
      copyRenderer.transform.translation = [-mainCanvas.width, 0];

      copyRenderer2.transform.scale = [1, -1];
      copyRenderer2.transform.translation = [0, -mainCanvas.height];

      repeatCopyRenerer.addTransform().translation = [mainCanvas.width/2, mainCanvas.height/2];
      repeatCopyRenerer.addTransform(NUM_ROTATION_STEPS).rotation = Math.PI * 2 / NUM_ROTATION_STEPS;
      repeatCopyRenerer.addTransform().translation = [-mainCanvas.width/2, -mainCanvas.height/2];
      
      lineRenderer.render(pointsDataSource);
      copyRenderer.render();
      repeatCopyRenerer.render();
//      copyRenderer2.render();

    }

    if(document.readyState){
      start();
    }
    else {
      document.addEventListener('DOMContentLoaded', start, false);
    }
  });

}());