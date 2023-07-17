import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name : 'user',
    initialState : {},
    reducers : {
        increase(state, a){
          return a.payload
        }
    }
  })
  
  export let { increase } = user.actions 
  
  export default configureStore({
    reducer: {
      user : user.reducer
    }
  })