import data from "data";
const dataPath = require.context(DATA_PATH);

const span = document.createElement("span");
span.style.color = "blue";
span.style.fontWeight = "bold";
span.style.fontSize = "32px";
span.innerHTML = `${data.personal.name.first} ${data.personal.name.last} - ${
  data.professional.role
}`;

const picture = document.createElement("img");
picture.src = dataPath(data.personal.picture);
picture.style.width = "200px";

document.getElementById("root").appendChild(span);
document.getElementById("root").appendChild(picture);
