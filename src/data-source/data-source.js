define(['util/promise'], function(Promise){
  
  var __guid = 0;

  function DataSource(type){
    type = type || '';
    this.type = type + 'DataSource';
    this.name = this.type + __guid++;

    this.model = {};
  }

  DataSource.prototype.generator = function(){
    return [];
  };

  DataSource.prototype.generate = function(){
    var promise = new Promise();
    var data = this.generator(promise);
    return promise;
  };

  return DataSource;

});