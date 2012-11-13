(function(){

  require(['data-source/points', 'renderer/line', 'renderer/copy', 'renderer/repeat-copy', '../lib/dat.gui.min.js'],
    function(PointsDataSource, LineRenderer, CopyRenderer, RepeatCopyRenderer, DatGui){

    var NUM_ROTATION_STEPS = 8;

    var mainCanvas = document.querySelector('canvas');

    function start(){
      var pointsDataSource1 = new PointsDataSource(0, 0, mainCanvas.width, mainCanvas.height, 30, 10000000);
      var pointsDataSource2 = new PointsDataSource(0, 0, mainCanvas.width, mainCanvas.height, 30, 20000000);
      var pointsDataSource3 = new PointsDataSource(0, 0, mainCanvas.width, mainCanvas.height, 30, 30000000);
      var lineRenderer1 = new LineRenderer('#000', 1, 1, mainCanvas);
      var lineRenderer2 = new LineRenderer('#000', 1, 1, mainCanvas);
      var lineRenderer3 = new LineRenderer('#000', 1, 1, mainCanvas);
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
      
      function update(){
        mainCanvas.getContext('2d').clearRect(0, 0, mainCanvas.width, mainCanvas.height);
        lineRenderer1.render(pointsDataSource1);
        lineRenderer2.render(pointsDataSource2);
        lineRenderer3.render(pointsDataSource3);
        copyRenderer.render();
        repeatCopyRenerer.render();
      }

      var gui = new dat.GUI();
      pointsDataSource1.generateView(gui, update);
      pointsDataSource2.generateView(gui, update);
      pointsDataSource3.generateView(gui, update);
      lineRenderer1.generateView(gui, update);
      lineRenderer2.generateView(gui, update);
      lineRenderer3.generateView(gui, update);

      update();
    }

    if(document.readyState){
      start();
    }
    else {
      document.addEventListener('DOMContentLoaded', start, false);
    }
  });

}());