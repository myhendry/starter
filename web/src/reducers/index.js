import { combineReducers } from "redux"

import testReducer from "./testReducer"
import alertReducer from "./alertReducer"

const appReducer = combineReducers({
  test: testReducer,
  alert: alertReducer,
})

export default appReducer
