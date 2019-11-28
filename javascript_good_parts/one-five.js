function funky(o) {
  o = null;
}
var p1 = [];
funky(p1);
console.log(p1)
// o knows nothing about what was passed in...thought it was a pointer. Closures keep it contained

function swap(a, b) {
  var temp = a;
  a = b;
  b = temp;
}

var p2x= 1, p2y = 2;
swap(p2x, p2y);
console.log(p2x, p2y)
// It is one for the same reason as the above


// problem 1
function identity(x) {
  return x;
}

function add(a, b){
  return (a + b);
}

function mul(a, b) {
  return (a * b)
}

// problem 2: write a function that takes an argument and returns a function that returns
// that arguments
function identityF(x) {
  return function () {
    return x;
  }
}

// problem 3: function that adds from two invocations
// addf(3)(4);
function addf(a) {
  return function(b) {
    return a+b;
  }
}

// problem 4: write a function that takes a binary function, and makes it callable with
// with two invocations.
// addf = applyf(add);
// addf(3)(4);
// applyf(mul)(5)(6);

function applyf(binFunc) {
  // return binFunc;
  return function(x) {
    return function(y) {
      return binFunc(x, y);
    }
  }
} // dang

// problem 6?: write a function that takes a function and an argument, and returns
// a function that can supply a second argument.....
// add3 = curry(add, 3);
// add3(4);
// curry(mul, 5)(6);
function curry(binFunc, b) {
  return function(c) {
    return binFunc(b, c);
  }
}

// 7: without writing any new functions, show three ways to create the inc function;

var inc = addf(1);
inc = applyf(add)(1);
inc = curry(add, 1);

// 8 methodize: write a function that converts a binary function into a method
// Number.prototype.add = methodize(add);
// (3).add(4) // 7

function methodize(binFunc) {
  // Number.prototype[binFunc] = binFunc;
  return function(y) {
    return binFunc(this, y);
  }
  // return function (...y) {
  //   return binFunc(this, ...y);
  // }
}

// 9 demethodize a function that converts a method to a binary function
// demethodize(Number.prototype.add)(5, 8);

// function demethodize(binMethod) {
//   return binMethod(x, y)
// }

function demethodize(func) {
  return function(that, y) {
    return func.call(that, y);
  }
}
// function demethodize(func) {
//   return function (that, ...y) {
//     return func.apply(that, ...y);
//   }
// }

// 10 write a function twice that takes a binary function and returns a unary function
// that passes its argument to the binary function twice.
// var double = twice(add);
// double(11) // 22;
// var square = twice(mul);
// square(11) // 121
function twice(binFunc) {
  // you return something that can then be called.
  return function (x) {
    return binFunc(x, x)
  }
}

// 11 write a function composeu that takes two unary functions and returns a unary function that cals them both;
// var double = twice(add);
// double(11) // 22;
// var square = twice(mul);
// square(11) // 121
// composeu(double, square)(3) // 36

function composeu(func1, func2) {
  return function(x) {
    return func2(func1(x))
  }
}

// 12 composeb that takes two binary function and returns a fucntion that calls them both
// composeb(add, mul)(2, 3, 5) // 25
function composeb(func1, func2) {
  return function(x, y, z){
    return func2(func1(x, y), z)
  }
}

// 13 function that allows another function to only be called once;
// add_once = once(add);
// add_once(3, 4); // 7
// add_once(3,4); // throw
// function once(binFunc) {
//   return function(x, y){

//   }
// }

function once(func){
  return function() { // when this anonymous function is called, it makes original func variable null...
    var f = func;
    func = null;
    return f.apply(this, arguments)
  }
}

// 14 return a function that erturns two functions that implement an up/down counter;
// counter = counterf(10);
// counter.inc() // 11;
// counter.dec() // 10;

function counterf(x){
  return {
    inc: function(){
      x+=1;
      return x;
    }
    dec: function(){
      x-=1;
      return x;
    }
  }
}

// 15 make a revocable function that takes a nice function, and returns a revoke
// function that denies access to the nice function, and an invoke function that can
// invoke the nice function until it is revoked;
// temp = revokable(alert);
function revokable(nice){
  // this creates var nice = nice;
  return {
    invoke: function(){
      return nice.apply(this, arguments)
    }
    revoke: function(){
      nice = null;
    }
  }
}
