import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increase, decrease } from "../module/counter";

const Counter = () => {
  // counter에 정의되어 있는 state를 사용할 것이라고 Select해주는 것?
  const number = useSelector((state) => state.counter);

  // 여기 컴포넌트에서 state의 변경 명령을 보낼것이다(dispatch)
  const dispatch = useDispatch();

  // onIncrease 이벤트 발생시 counter에 정의 되어있는 increase함수를 발동하도록 보내다
  const onIncrease = () => {
    dispatch(increase());
  };
  // onDecrease 이벤트 발생시 counter에 정의 되어있는 decrease함수를 발동하도록 보내다
  const onDecrease = () => {
    dispatch(decrease());
  };
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
};

export default Counter;