import { combineReducers } from "redux"
import testReducer from "./testReducer"

const appReducer = combineReducers({
  test: testReducer,
})

export default appReducer
