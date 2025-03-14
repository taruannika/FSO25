import React from "react";

const App = () => {
  const Header = ({ name }) => {
    return <h1>{name}</h1>;
  };

  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </div>
    );
  };

  const Part = ({ part }) => {
    const { name, exercises } = part;
    return (
      <p>
        {name} {exercises}
      </p>
    );
  };
  const Course = ({ course }) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
      </div>
    );
  };

  const course = {
    name: "Half Stack application development",
    id: 1,
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };
  return <Course course={course} />;
};

export default App;
