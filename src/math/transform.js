define([], function(){
  
  function Transform(){
    this.translation = [0, 0];
    this.rotation = 0;
    this.scale = [1, 1];

    this.order = ["scale", "translate", "rotate"];
    this.stateFunctions = {};
  }

  Transform.prototype.setStateFunction = function(state, fn){
    this.stateFunctions[state] = fn;
  };

  Transform.prototype.runStateFunctions = function(that){
    var stateFunctions = this.stateFunctions;
    var transform = this;
    this.order.forEach(function(state){
      if(stateFunctions[state]){
        stateFunctions[state].call(that, transform);
      }
    });
  };

  return Transform;

});