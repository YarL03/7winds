import { combineReducers } from "redux";
import Works from '../reducers/Works'

const reducers = combineReducers({
    works: Works
})

export default reducers