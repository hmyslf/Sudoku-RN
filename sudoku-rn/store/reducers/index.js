import {
  SET_NAME,
  FETCH_BOARD,
  SET_BOARD,
  SET_LOADING,
  SET_MESSAGE,
  SET_STATUS
} from '../actions';

const initialState = {
  name: '',
  board: [],
  initialBoards: [],
  loading: false,
  message: '',
  status: false
}

const reducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch(type) {
    case SET_NAME:
      return {
        name: payload
      }
    case FETCH_BOARD:
      return {
        ...state,
        loading: false,
        board: payload,
        initialBoards: payload.map(row => [...row])
      }
    case SET_LOADING:
      return {
        ...state,
        loading: payload
      }
    case SET_BOARD:
      return {
        ...state,
        board: payload
      }
    case SET_MESSAGE:
      return {
        ...state,
        message: payload
      }
    case SET_STATUS:
      return {
        ...state,
        status: payload
      }
    default:
      return state
  }
}

export default reducers;