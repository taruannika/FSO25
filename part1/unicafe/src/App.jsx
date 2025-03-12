import React from "react";
import { useState } from "react";

const Button = ({ field, action }) => {
  return <button onClick={() => action(field)}>{field}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ stats }) => {
  const total = Object.values(stats).reduce((sum, value) => sum + value, 0);
  const average = (stats.good - stats.bad) / total;
  const positive = (stats.good / total) * 100;

  const lines = [
    { text: "good", value: stats.good },
    { text: "neutral", value: stats.neutral },
    { text: "bad", value: stats.bad },
    { text: "all", value: total },
    { text: "average", value: average },
    { text: "positive", value: `${positive}%` },
  ];

  return (
    <table>
      <tbody>
        {lines.map((line, index) => (
          <StatisticLine key={index} text={line.text} value={line.value} />
        ))}
      </tbody>
    </table>
  );
};

const App = () => {
  const [stats, setStats] = useState({ good: 0, neutral: 0, bad: 0 });

  const hasFeedback = Object.values(stats).some((value) => value !== 0);

  const giveFeedback = (field) => {
    setStats({ ...stats, [field]: stats[field] + 1 });
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button field="good" action={giveFeedback} />
      <Button field="neutral" action={giveFeedback} />
      <Button field="bad" action={giveFeedback} />

      <h2>statistics</h2>
      {hasFeedback ? <Statistics stats={stats} /> : <p>No feedback given</p>}
    </div>
  );
};

export default App;
