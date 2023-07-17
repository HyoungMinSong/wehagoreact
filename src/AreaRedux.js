import { createStore } from "redux";
import App from "./App";
import { Provider } from "react-redux";
import rootReducer from "./redux/rootReducer";

const store = createStore(rootReducer);

function AreaRedux(){

  return(
    <Provider store={store}>
      <App />
    </Provider>
  );

}export default AreaRedux;

