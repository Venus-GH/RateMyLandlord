import React from "react";
import { TagCloud } from "react-tagcloud";

const WordCloud = ({ tags }) => {
  console.log("tags", tags);

  const tagsData = [
    { value: "responsive", count: 4 },
    { value: "unfriendly", count: 1 },
    { value: "friendly", count: 3 },
    { value: "timely", count: 1 },
    { value: "helpful", count: 1 },
    { value: "respectful", count: 1 },
    { value: "fair", count: 1 }
  ];
  return (
    <div className="section">
      <TagCloud minSize={12} maxSize={35} tags={tagsData} />
    </div>
  );
};

export default WordCloud;
