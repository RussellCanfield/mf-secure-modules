import React from "react";
import ReactDOM from "react-dom";
import Button from "remote/Button";

import "./index.css";

const App = () => (
  <div className="container">
    <div>Name: host</div>
    <div>Framework: react</div>
    <div>Language: TypeScript</div>
    <Button label={1} />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
