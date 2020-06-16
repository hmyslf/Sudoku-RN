import {
  SET_NAME,
} from '../actions';

const initialState = {
  name: ''
}

const reducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type) {
    case SET_NAME:
      return {
        name: payload
      }
    default:
      return state
  }
}

export default reducers;