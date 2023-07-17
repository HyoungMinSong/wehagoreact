import React, { useState } from "react";

const Counter2 = ({ number2, onIncrease2 }) => {
  const [num, setNum] = useState(0);
  const onChange = (e) => {
    setNum(e.target.value);
  };
  return (
    <div>
      <hr />
      <h1>CounterContainer2</h1>
      <div>
        <button onClick={() => onIncrease2(num)}>+</button>
        <input type="text" onChange={onChange} value={num}></input>
        <p>DisplayNum</p>
        {number2}
      </div>
    </div>
  );
};

export default Counter2;