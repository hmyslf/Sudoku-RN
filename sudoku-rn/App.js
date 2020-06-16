import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import SudokuGrid from './components/SudokuGrid.js';
import axios from 'axios';

export default function App() {
  const [boards, setBoards] = useState([]);
  const [reset, setReset] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get('https://sugoku.herokuapp.com/board?difficulty=random')
      .then(({ data }) => {
        setBoards(data);
      })
      .catch(err => {
        setMessage(err.message);
        setTimeout(() => {
          setMessage('')
        }, 3000)
      })
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
    const data = encodeSudoku(boards);
    axios
      .post('http://sugoku.herokuapp.com/solve', data)
      .then(({ data }) => {
        const solved = {
          board: data.solution
        }
        setBoards(solved);
        setMessage(data.status);
        setTimeout(() => {
          setMessage('');
        }, 3000)
      })
      .catch(err => {
        setMessage(err.message);
        setTimeout(() => {
          setMessage('');
        }, 3000)
      });
  }

  const submitSudoku = () => {
    const data = encodeSudoku(boards);
    axios
      .post('http://sugoku.herokuapp.com/validate', data)
      .then(({ data }) => {
        setMessage(data.status);
        setTimeout(() => {
          setMessage('');
        }, 3000);
      })
      .catch(err => {
        setMessage(err.message);
        setTimeout(() => {
          setMessage('');
        }, 3000);
      });
  }
  const resetBoard = () => {
    setMessage('');
    setReset(!reset);
  }

  return (
    <View style={styles.container}>
      <Text>Sudoku with React Native</Text>
      <Text>{message}</Text>
      <View style={styles.container}>
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
  whiteText: {
    color: "#fff"
  },
  button_rows: {
    flex: 1,
    paddingTop: 50,
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
