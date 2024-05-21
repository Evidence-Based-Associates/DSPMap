import _ from "lodash";
import "./style.css";
import Logo from "./logo.jpg";
import Data from "./data.xml";
import Notes from "./data.csv";
import jsonData from "./data.json";
import printMe from "./print.js";

function component() {
  const element = document.createElement("div");
  const btn = document.createElement("button");

  element.innerHTML = _.join(["Hello", "webpack"], " ");
  element.classList.add("hello");

  btn.innerHTML = "Click me and check the console!";
  btn.onclick = printMe;

  element.appendChild(btn);

  // Add the image to our existing div.
  const myLogo = new Image();
  myLogo.src = Logo;

  element.appendChild(myLogo);

  console.log(Data);
  console.log(Notes);
  console.log(jsonData);

  return element;
}

document.body.appendChild(component());
