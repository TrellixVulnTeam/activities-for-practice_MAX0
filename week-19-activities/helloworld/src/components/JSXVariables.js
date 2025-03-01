import React from "react";

const name = "Phil";
const letters = 4;
const thoughts = "is awesome";

const stripVowels = str => {
  const vowels = ["a", "e", "i", "o", "u"];
  let result = "";

  for (let i = 0; i < str.length; i++) {
    if (!vowels.includes(str[i].toLowerCase())) {
      result += str[i];
    }
  }
  return result;
};


const JSXVariables = () => (
  <div className="main-container">
    <div className="container">
      <div className="jumbotron">
        <h1>Hi! My name is {name}</h1>
        <h2>My name has {letters} letters</h2>
        <h2>I think React {thoughts}</h2>
        <h2>My name without any vowels is: ({stripVowels(name)})</h2>
      </div>
    </div>
  </div>
);
export default JSXVariables;