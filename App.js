// App.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
//import { calculateResult } from './CalculatorFunctions'; 

function App() {
   // Defining variables, initialization, and functions to modify
   const [display, setDisplay] = useState('0');
   const [firstNum, setFirstNum] = useState('0');
   const [operator, setOperator] = useState('+');
   //Keep account operations organized
   const [multiplicationNumber, setmultiplicationNumber] = useState('1');
   const [multiplicationOperator, setmultiplicationOperator] = useState('*');
   const [multiplication, setMultiplication] = useState(false);
   const [IllegalAction, setIllegalAction] = useState(false);
   // Receiving a command from the user, checking and updating the values according to it
   const handlePress = (value) => {
          if (operator === '=' ||  display === 'Illegal action'){
            //Returns to a starting point in case of error or end of calculation
            setDisplay('0');
            setFirstNum('0');
            setOperator('+');
            setmultiplicationNumber('1');
            setmultiplicationOperator('*');
            setMultiplication(false);
            setIllegalAction(false);
          }else if (!['+','=','+-', '%','-', '*', '/','C'].includes(value)) {
            if(IllegalAction == true){
              setDisplay('Illegal action');
            }else{
              setDisplay(display === '0' ? value : display + value);
            }
            setIllegalAction(false);
          } else if(['%'].includes(value)){
            if(multiplication === true){
              setmultiplicationNumber(calculate(value, multiplicationNumber, display));
              //Not so pleasing to the eye but very simplifying
              setDisplay('1');
            }else{
              //Display is only updated every login, so there's a temporary variable here
              percent_display = calculate(value, firstNum, display);
              setFirstNum(calculate(operator, firstNum, percent_display));
              setDisplay('0');
            }
            setIllegalAction(true);
          }else if (['+-'].includes(value)) {
          setDisplay('-' + display);
          setIllegalAction(true);
          } else if (['+','-'].includes(value)) {
            if(multiplication === true){
              // Add or subtract with the previous oprotor for multiplication
              temporalCalculation = calculate(multiplicationOperator, multiplicationNumber, display);
              setFirstNum(calculate(operator, firstNum, temporalCalculation));
              setmultiplicationNumber('1');
              setMultiplication(false);
            } else{
              setFirstNum(calculate(operator, firstNum, display));
              setOperator(value);
            } 
            setIllegalAction(false);
            setDisplay('0');
          } else if(['*', '/'].includes(value)) {
            setmultiplicationNumber(calculate(multiplicationOperator, multiplicationNumber, display));
            setmultiplicationOperator(value);
            setMultiplication(true);
            setDisplay('0');
            setIllegalAction(false);
          } else if (value === '=') {
          // If we received a comparison order, you returned a reply
            if (multiplication === true) {
              temporalCalculation = calculate(multiplicationOperator, multiplicationNumber, display);
              result = calculate(operator, firstNum, temporalCalculation);
              setmultiplicationNumber('1');
              setMultiplication(false);
            } else {
              result = calculate(operator, firstNum, display);
            }
          setDisplay(String(result));
          setOperator(value);
          setIllegalAction(false);
          } else if (value === 'C') {
            setDisplay('0');
            setFirstNum('0');
            setOperator('+');
            setmultiplicationNumber('1');
            setmultiplicationOperator('*');
            setMultiplication(false);
            setIllegalAction(false);
          }
   };
 
  return (
    //Frame and display the data
    <View style={styles.container}>
      <Text style={styles.display}> {display}</Text>
      <View style={styles.row}>
        {['C', '+-', '%', '/'].map((item) => (
          <Button key={item} text={item} onPress={() => handlePress(item)} />
        ))}
      </View>
      <View style={styles.row}>
        {['7', '8', '9'].map((item) => (
          <Button key={item} text={item} onPress={() => handlePress(item)} />
        ))}
        <Button key="*" text="X" onPress={() => handlePress('*')}  />
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
        {['0', '.'].map((item) => (
          <Button key={item} text={item} onPress={() => handlePress(item)} />
        ))}
        <Button key="=" text="=" onPress={() => handlePress("=")} equal={true} />
      </View>
    </View>
  );
}

// Funkaemia for button
const Button = ({ text, onPress, equal=false }) => (
  <TouchableOpacity style={equal? styles.buttonEquall : styles.button  } onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);
//Funkaemia for equal button
const ButtonEquall = ({ text, onPress }) => (
  <TouchableOpacity style={styles.buttonEquall} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

//Designs function
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2f3744',
    borderWidth: 10,
    borderColor: '#5300e5'
  },
  display: {
    fontSize: 48,
    color: '#f9ffff',
    backgroundColor: '#009b57',
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
    backgroundColor: '#e800ce',
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
  buttonEquall: {
    backgroundColor: '#ff0006',
    padding: 20,
    borderRadius: 50,
    width: 160,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default App;

function calculate(operator, num1, num2) {
  const firstNumber = parseFloat(num1);
  const secondNumber = parseFloat(num2);

  let result;

  switch (operator) {
    case '+':
      result = firstNumber + secondNumber;
      break;
    case '-':
      result = firstNumber - secondNumber;
      break;
    case '*':
      result = firstNumber * secondNumber;
      break;
    case '/':
      result = firstNumber / secondNumber;
      break;
      case '%':
      result = (firstNumber / 100) * secondNumber;
      break;
    default:
      result = 'Invalid operator';
  }

  return result;
}