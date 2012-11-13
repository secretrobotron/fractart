define([], function(){

  var MULTIPLIER = 22695477;
  var INCREMENT = 1;
  var MODULUS = 4294967296;       //2^32

  // Simple implementation of linear congruential generator PRNG
  // from http://en.wikipedia.org/wiki/Linear_congruential_generator. 
  return function(seed){
    seed = seed || Math.random() * MODULUS;

    var lastVal = seed;

    function next(){
      lastVal = (MULTIPLIER * lastVal + INCREMENT) % MODULUS;
      return lastVal / MODULUS;
    }

    next();

    return {
      next: next
    };
     
  };

});