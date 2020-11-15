import React, { useState } from "react";

import Sets from "./components/sets/Sets";
import Operations from "./components/operations/Operations";

import "./App.css";

const App = () => {
  const [sets, setSets] = useState<string[][]>([[]]);

  return (
    <div className="App">
      <Sets sets={sets} setSets={setSets} />
      <Operations sets={sets} />
    </div>
  );
};

export default App;
