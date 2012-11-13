define(["./data-source"], function(DataSource){
  
  function PointsDataSource(minX, minY, maxX, maxY, numPoints){
    DataSource.call(this, "points");

    var _points = null;

    this.generator = function(promise){
      if(!_points){
        _points = [];

        for(var i = numPoints; i >=0; --i){
          _points.push([Math.random() * (maxX - minX) + minX, Math.random() * (maxY - minY) + minY]);
        }
      }
      promise.notify(_points);
    };
  }

  PointsDataSource.prototype = Object.create(DataSource.prototype);

  return PointsDataSource;

});