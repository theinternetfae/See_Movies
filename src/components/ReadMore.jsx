import { useState } from "react";

function ReadMore({ text, limit = 100 }) {
  const [expanded, setExpanded] = useState(false);

  if (text.length <= limit) {
    return <p className="small-info">{text}</p>;
  }

  return (
    <p className="small-info">
      {expanded ? text : text.slice(0, limit) + "..."}{" "}
      <button
        className="text-blue-400 underline ml-2"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </p>
  );
}

export default ReadMore;