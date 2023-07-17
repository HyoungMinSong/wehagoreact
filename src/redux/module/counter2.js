const INCREASE = "counter2/INCREASE";

const initialState = {
  value: 0,
};

export const increase = (num) => ({
  type: INCREASE,
  number: num,
});

export default function counter2(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return { ...state, value: state.value + parseInt(action.number) };
    default:
      return state;
  }
}