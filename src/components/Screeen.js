import React from "react";
const Screeen = ({ value, value1 }) => {
  return (
    <div className="screen-cover">
      <div className="screen" id="value1">
        {value}
      </div>
      <div className="screen" id="value2">
        {value1}
      </div>
    </div>
  );
};

export default Screeen;
