import { TOGGLE_BUTTON } from "../actions/types"

const initialState = {
  on: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_BUTTON:
      return {
        ...state,
        on: !state.on,
      }
    default:
      return state
  }
}
