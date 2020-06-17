import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import { setName } from '../store/actions';

export default function Finish ({  navigation }) {
  const name = useSelector((state) => state.name);
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(setName(''));
    navigation.navigate('Home')
  }


  return (
    <View style={styles.container}>
      <Text>Congratulations, {name}! You just finished this puzzle.</Text>
      <Button 
        title="Restart game" 
        onPress={handleReset}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});