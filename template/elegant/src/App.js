import React from "react";
import { getData } from "data";

const { aboutMe } = getData(window.navigator.language);

const App = () => (
  <div>
    <h1>App</h1>
    <h2>{aboutMe.name}</h2>
  </div>
);

export default App;
