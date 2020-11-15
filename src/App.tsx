import React, { useState } from "react";

import Sets from "./components/sets/Sets";
import Operations from "./components/operations/Operations";

import "./App.css";

const App = () => {
  const [sets, setSets] = useState<string[][]>([[]]);

  return (
    <div className="App">
      <div className="App-content">
        <Sets sets={sets} setSets={setSets} />
        <div className="u-bottom-20" />
        <Operations sets={sets} />
      </div>
    </div>
  );
};

export default App;
