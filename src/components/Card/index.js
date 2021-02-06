import React from "react";
const Card = ({ data }) => {
  console.log(data);
  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>{item.city}</div>
      ))}
    </div>
  );
};
export default Card;
