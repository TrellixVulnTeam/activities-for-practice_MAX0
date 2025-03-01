//Redo Warmup
//In this activity we will convert a JavaScript file using var to use const and let instead.
//Instructions
// Open function-scoped.js
// Convert all of the var identifiers in this file to use either const or let, without breaking the code.
// Hints
// Remember, both const and let are block scoped.
// const should be used for any values which won't be reassigned, let should be used for values that will be reassigned.
let name = "Nick";

const tinyize = function(name) {
  const myName = "Tiny " + name + "!";

  return myName;
};

name = tinyize("Rick");
console.log(name);

for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100);
}
