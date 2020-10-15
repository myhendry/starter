import { TOGGLE_BUTTON } from "./types"

export const testButton = () => dispatch => {
  dispatch({
    type: TOGGLE_BUTTON,
  })
}
