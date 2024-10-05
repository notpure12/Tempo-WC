import React, { useEffect, useState } from "react";
import "../styling/Sidebar.css";
import data from "../assets/data/data.json";

type Word = {
  text: string;
  value: number;
};
const Sidebar = () => {
  const [topWords, setTopWords] = useState<Word[]>([]);
  useEffect(() => {
    // Assuming your data.json has an array of words with 'text' and 'value' properties
    const sortedData = [...data].sort((a, b) => b.value - a.value);
    setTopWords(sortedData.slice(0, 10));
  }, []);
  return (
    <nav className="sidebar-wrapper">
      <h3 className="sidebar-header">Today Top 10 Words</h3>
      <ul className="sidebar-list">
        {topWords.map((word, index) => (
          <li key={index}>
            {word.text} ({word.value})
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
