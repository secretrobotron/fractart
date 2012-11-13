define(['util/promise'], function(Promise){
  
  function DataSource(type){
    this.type = type || "null";

    this.generator = function(){
      return [];
    }
  }

  DataSource.prototype.generate = function(){
    var promise = new Promise();
    var data = this.generator(promise);
    return promise;
  };

  return DataSource;

});