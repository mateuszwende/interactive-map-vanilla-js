import createStore from "./createStore";
import { appReducer } from "./reducer";

const store = createStore(appReducer);

export default store;
