import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

export default function Finish ({ navigation }) {
  const name = useSelector((state) => state.name);

  return (
    <View style={styles.container}>
      <Text>Congratulations, {name}! You just finished this puzzle.</Text>
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