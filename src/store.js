import { configureStore, createSlice } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

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
    beTheChosenOnes(state, action){
        return action.payload
      },
    clearChosenOnes(state) {
      return [];
    }
  }
})

// 로그인한 유저 정보
let loginUserData = createSlice({
  name : 'loginUserData',
  initialState : {
    user: {},
    service: [],
    company: [],
    companyName: ''
  },
  reducers : {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setService: (state, action) => {
      state.service = action.payload;
    },
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    setCompanyName: (state, action) => {
      state.companyName = action.payload;
    }
  }
});

const reducers = combineReducers({
  user : user.reducer,
  areThereAnyChosenOnes : areThereAnyChosenOnes.reducer,
  loginUserData : loginUserData.reducer,
  // 여기 밑에 쭉쭉 적기
});

const persistConfig = {
  key: 'root',
  //로컬 스토리지를 사용할 것이기때문에 storage를 적어주었다
  storage,
  whitelist: ['loginUserData']
};

const persistedReducer = persistReducer(persistConfig, reducers);

  
  // 함수명 추출
  export let { increase } = user.actions 
  export let { beTheChosenOnes } = areThereAnyChosenOnes.actions
  export let { clearChosenOnes } = areThereAnyChosenOnes.actions
  export let { setUser, setService, setCompany, setCompanyName } = loginUserData.actions;

  // 저장소 추출
  export default configureStore({
    reducer: persistedReducer,
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