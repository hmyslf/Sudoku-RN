import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { setName } from '../store/actions';

export default function Home ({ navigation }) {
  const [username, setUsername] = useState('');

  const dispatch = useDispatch();

  const playButton = () => {
    dispatch(setName(username));
    navigation.navigate('Game')
  }

  const onChangeText = (text) => {
    setUsername(text);
  }

  return (
    <View style={styles.container}>
      <Text>Your Name</Text>
      <TextInput 
        style={styles.playerInput}
        onChangeText={text => onChangeText(text)}
        defaultValue={username}
      />
      <Button
        title="Play!"
        onPress={playButton}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  playerInput: {
    padding: 2,
    height: 40,
    width: 200,
    borderColor: 'black',
    borderWidth: 1,
    margin: 5
  }
});