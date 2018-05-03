import * as data from "data";

const span = document.createElement("span");
span.style.color = "blue";
span.style.fontWeight = "bold";
span.style.fontSize = "32px";
span.innerHTML = `${data.personal.name.first} ${data.personal.name.last}`;

document.getElementById("root").appendChild(span);
