"use strict";
console.log(Date.now().toString() + ":mainline: BEGIN");
setTimeout(() => {
  console.log(
    Date.now().toString() +
      ":eventloop(callback):Asynchrounous processing complete."
  );
}, 20);
console.log(Date.now().toString() + "mainline: END");
