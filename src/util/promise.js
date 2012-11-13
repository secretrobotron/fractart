define([], function(){
  
  function Promise(){
    this.waiting = [];
    this.data = null;
  }

  Promise.prototype.then = function(notifierFunction){
    if(!this.data){
      this.waiting.push(notifierFunction);
    }
    else {
      notifierFunction(this.data);
    }
  };

  Promise.prototype.notify = function(data){
    this.data = data;
    var waiting = this.waiting.slice();
    while(waiting.length){
      waiting.pop()(data);
    }
  };

  return Promise;

});