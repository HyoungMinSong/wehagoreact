import { configureStore, createSlice } from '@reduxjs/toolkit'

// 회원가입
let user = createSlice({
    name : 'user',
    initialState : {},
    reducers : {
        increase(state, a){
          return a.payload
        }
    }
  })


  // 조직도 조건문
let areThereAnyChosenOnes = createSlice({
  name : 'areThereAnyChosenOnes',
  initialState : [],
  reducers : {
    beTheChosenOnes(state, a){
        return a.payload
      },
    clearChosenOnes(state) {
      return [];
    }
  }
})

  
  // 함수명 추출
  export let { increase } = user.actions 
  export let { beTheChosenOnes } = areThereAnyChosenOnes.actions
  export let { clearChosenOnes } = areThereAnyChosenOnes.actions

  // 저장소 추출
  export default configureStore({
    reducer: {
      user : user.reducer,
      areThereAnyChosenOnes : areThereAnyChosenOnes.reducer,
    }
  })

  /* 보내는 곳 사용법
    import { useDispatch } from 'react-redux';
    import { 추출한함수명 } from './store경로';

    const dispatch = useDispatch();
    const handleClick = () => {
      dispatch(추출한함수명(수행할값));
    };
    return (
      <button onClick={handleClick}>Set String Data</button>
    );
  */

  /* 받는 곳 사용법
    import { useSelector } from 'react-redux';

    const stringData = useSelector(state => state.저장소이름 ); // 스토어의 state에 접근
    return (
      <div>{stringData}</div>
    );
  */