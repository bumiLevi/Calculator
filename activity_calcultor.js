import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Calculator() {
    // Defining variables, initialization, and functions to modify
  const [display, setDisplay] = useState('0');
  const [firstNum, setFirstNum] = useState(null);
  const [operator, setOperator] = useState(null);

  // Receiving a command from the user, checking and updating the values according to it
  const handlePress = (value) => {
    if (['+', '-', '*', '/'].includes(value)) {
      setFirstNum(display);
      setOperator(value);
      setDisplay('0');
    } else if (value === '=') {
        // If we received a comparison order, you returned a reply
        const result = eval(`${firstNum} ${operator} ${display}`);
      setDisplay(String(result));
    } else if (value === 'C') {
      setDisplay('0');
      setFirstNum(null);
      setOperator(null);
    } else {
      setDisplay(display === '0' ? value : display + value);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{display}</Text>
      <View style={styles.row}>
        {['C', '+', '%', '/'].map((item) => (
          <Button key={item} text={item} onPress={() => handlePress(item)} />
        ))}
      </View>
      <View style={styles.row}>
        {['7', '8', '9', '*'].map((item) => (
          <Button key={item} text={item} onPress={() => handlePress(item)} />
        ))}
      </View>
      <View style={styles.row}>
        {['4', '5', '6', '-'].map((item) => (
          <Button key={item} text={item} onPress={() => handlePress(item)} />
        ))}
      </View>
      <View style={styles.row}>
        {['1', '2', '3', '+'].map((item) => (
          <Button key={item} text={item} onPress={() => handlePress(item)} />
        ))}
      </View>
      <View style={styles.row}>
        {['0', '.', '='].map((item) => (
          <Button key={item} text={item} onPress={() => handlePress(item)} />
        ))}
      </View>
    </View>
  );
}

const Button = ({ text, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
  },
  display: {
    fontSize: 48,
    color: '#00ff00',
    backgroundColor: '#333',
    width: '90%',
    textAlign: 'right',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#ff69b4',
    padding: 20,
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
});