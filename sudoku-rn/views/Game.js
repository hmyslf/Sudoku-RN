import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import SudokuGrid from '../components/SudokuGrid.js';
import { fetchBoard, setMessage, handleSolve, handleSubmit, setStatus } from '../store/actions';

export default function Game ({ route, navigation }) {
  const dispatch = useDispatch();
  const {difficulty} = route.params;
  const boards = useSelector((state) => state.board);
  const initialBoards = useSelector((state) => state.initialBoards);
  const [reset, setReset] = useState(false);
  const message = useSelector((state) => state.message);
  const status = useSelector((state) => state.status);

  useEffect(() => {
    dispatch(fetchBoard(difficulty));
  }, [reset]);

  const encodeSudoku = (params) => {
    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

    const encodeParams = (params) => 
      Object.keys(params)
      .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
      .join('&');

    return encodeParams(params);
  }

  const solveSudoku = () => {
    const encode = encodeSudoku({board: initialBoards});
    dispatch(handleSolve(encode));
    if (status) {
      navigation.navigate('Finish', {
        status
      })
    }
  }

  const submitSudoku = () => {
    const encode = encodeSudoku({board: boards});
    dispatch(handleSubmit(encode));
    if (status) {
      navigation.navigate('Finish', {
        status
      })
    }
  }
  const resetBoard = () => {
    dispatch(setStatus(false));
    dispatch(setMessage(''));
    setReset(!reset);
  }

  return (
    <View style={styles.container}>
      <Text>Sudoku with React Native</Text>
      <Text>Difficulty: {difficulty}</Text>
      <Text>{message}</Text>
      <View style={styles.sudokuboard}>
        <SudokuGrid boards={boards} />
      </View>
      <View style={
        styles.button_rows
      }>
        <TouchableOpacity
          style={[
            styles.button,
            styles.greenBg
          ]}
          onPress={event => submitSudoku(event)}
        >
          <Text style={styles.whiteText}>Submit Sudoku</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.blueBg
          ]}
          onPress={event => solveSudoku(event)}
        >
          <Text style={styles.whiteText}>Solve Sudoku</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.redBg
          ]}
          onPress={event => resetBoard(event)}
        >
          <Text style={styles.whiteText}>Reset Board</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50
  },
  sudokuboard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25
  },
  whiteText: {
    color: "#fff"
  },
  button_rows: {
    flex: 0.2,
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center"
  },
  button: {
    height: 40,
    marginRight: 10,
    padding: 10,
    borderRadius: 5
  },
  redBg: {
    backgroundColor: '#f00'
  },
  blueBg: {
    backgroundColor: '#00f'
  },
  greenBg: {
    backgroundColor: '#0f0'
  }
});
