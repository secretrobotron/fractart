define(['./data-source', 'util/random'], function(DataSource, Random){
  
  var MAX_SEED = 4294967296;
  var MIN_SEED = 0;
  var MIN_POINTS = 2;
  var MAX_POINTS = 100;

  function PointsDataSource(minX, minY, maxX, maxY, numPoints, seed){
    DataSource.call(this, "points");

    var model = this.model;

    model.minX = minX;
    model.maxX = maxX;
    model.minY = minY;
    model.maxY = maxY;
    model.numPoints = numPoints;
    model.seed = seed;
  }

  PointsDataSource.prototype = Object.create(DataSource.prototype);

  PointsDataSource.prototype.generator = function(promise, zoo){
    var points = [];
    var model = this.model;

    var random = new Random(model.seed);

    for(var i = model.numPoints; i >=0; --i){
      points.push([random.next() * (model.maxX - model.minX) +
        model.minX, random.next() * (model.maxY - model.minY) +
        model.minY]);
    }

    promise.notify(points);
  };

  PointsDataSource.prototype.generateView = function(gui, updateFunction){
    var folder = gui.addFolder(this.name);
    var model = this.model;

    updateFunction = updateFunction || function(){};

    folder.add(model, 'minX').onChange(updateFunction);
    folder.add(model, 'maxX').onChange(updateFunction);
    folder.add(model, 'minY').onChange(updateFunction);
    folder.add(model, 'maxY').onChange(updateFunction);
    folder.add(model, 'numPoints', MIN_POINTS, MAX_POINTS).onChange(updateFunction);
    folder.add(model, 'seed', MIN_SEED, MAX_SEED).onChange(updateFunction);
  };

  return PointsDataSource;

});