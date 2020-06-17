export const SET_NAME = 'SET_NAME';
export const FETCH_BOARD = 'FETCH_BOARD';
export const SET_LOADING = 'SET_LOADING';
export const SET_BOARD = 'SET_BOARD';
export const SET_MESSAGE = 'SET_MESSAGE';
export const SET_STATUS = 'SET_STATUS';
import axios from 'axios';
const baseUrl = 'https://sugoku.herokuapp.com';

export const setName = (name) => {
  return {
    type: SET_NAME,
    payload: name
  }
}

export const fetchBoard = (difficulty) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    axios
      .get(`${baseUrl}/board?difficulty=${difficulty}`)
      .then(({ data }) => {
        dispatch(fetchBoardSuccess(data.board));
      })
      .catch(err => {
        dispatch(setMessage(err.message));
      });
  }
}

export const fetchBoardSuccess = (payload) => {
  return {
    type: FETCH_BOARD,
    payload
  }
}

export const setLoading = (payload) => {
  return {
    type: SET_LOADING,
    payload
  }
}

export const setError = (errors) => {
  return {
    type: SET_ERROR,
    payload: errors
  }
}

export const setBoard = (boards) => {
  return {
    type: SET_BOARD,
    payload: boards
  }
}

export const handleSolve = (encode) => {
  return (dispatch) => {
    axios
      .post(`${baseUrl}/solve`, encode)
      .then(({ data }) => {
        dispatch(setBoard(data.solution));
        dispatch(setStatus(true));
        dispatch(setMessage(data.status));
        setTimeout(() => {
          dispatch(setStatus(false))
        }, 4000)
      })
      .catch(err => {
        dispatch(setMessage(err.message));
      });
  }
}

export const handleSubmit = (encode) => {
  return (dispatch) => {
    axios
      .post(`${baseUrl}/validate`, encode)
      .then(({ data }) => {
        dispatch(setMessage(`This Board is ${data.status}, Ganbare!`));
        if(data.status === 'solved') {
          dispatch(setStatus(true))
          setTimeout(() => {
            dispatch(setMessage(''));
            dispatch(setStatus(false));
          }, 4000)
        }
      })
      .catch(err => {
        dispatch(setMessage(err.message));
        setTimeout(() => {
          dispatch(setMessage(''));
        }, 3000);
      });
  }
}

export const setMessage = (message) => {
  return {
    type: SET_MESSAGE,
    payload: message
  }
}

export const setStatus = (status) => {
  return {
    type: SET_STATUS,
    payload: status
  }
}