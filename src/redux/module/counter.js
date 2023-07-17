// 명령을 구분할 변수명 (문자열) 정의
const COUNTER_INCREASE = "COUNTER_INCREASE";
const COUNTER_DECREASE = "COUNTER_DECREASE";

// 어떤 함수를 쓰면 어떤 명령을 수행할지 정의
export const increase = () => ({ type: COUNTER_INCREASE });
export const decrease = () => ({ type: COUNTER_DECREASE });

// 예시를 위한 초기값 설정
const initialState = 0;

// state와 action(명령어)을 매개변수로 받아, 
export default function counter(state = initialState, action) {
  switch (action.type) {
    case COUNTER_INCREASE:
      return state + 1;
    case COUNTER_DECREASE:
      return state - 1;
    default:
      return state;
  }
}