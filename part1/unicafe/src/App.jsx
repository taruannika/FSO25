import React from "react";
import { useState } from "react";

const App = () => {
  const [stats, setStats] = useState({ good: 0, neutral: 0, bad: 0 });

  const giveFeedback = (field) => {
    setStats({ ...stats, [field]: stats[field] + 1 });
  };
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => giveFeedback("good")}>good</button>
      <button onClick={() => giveFeedback("neutral")}>neutral</button>
      <button onClick={() => giveFeedback("bad")}>bad</button>

      <h2>statistics</h2>
      <p>good {stats.good}</p>
      <p>neutral {stats.neutral}</p>
      <p>bad {stats.bad}</p>
    </div>
  );
};

export default App;
