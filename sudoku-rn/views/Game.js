import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import SudokuGrid from '../components/SudokuGrid.js';
import axios from 'axios';

export default function Game ({ navigation }) {
  const [boards, setBoards] = useState([]);
  const [initialBoards, setInitialBoards] = useState([]);
  const [reset, setReset] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get('https://sugoku.herokuapp.com/board?difficulty=random')
      .then(({ data }) => {
        setBoards(data.board);
        const val = data.board.map(row => [...row]);
        setInitialBoards(val);
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
    const encode = encodeSudoku({board: initialBoards});
    axios
      .post('http://sugoku.herokuapp.com/solve', encode)
      .then(({ data }) => {
        setBoards(data.solution);
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
      setTimeout(() => {
        navigation.navigate('Finish')
      }, 4000)
  }

  const submitSudoku = () => {
    const encode = encodeSudoku({board: boards});
    axios
      .post('http://sugoku.herokuapp.com/validate', encode)
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
      setTimeout(() => {
        navigation.navigate('Finish')
      }, 4000)
  }
  const resetBoard = () => {
    setMessage('');
    setReset(!reset);
  }

  return (
    <View style={styles.container}>
      <Text>Sudoku with React Native</Text>
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
