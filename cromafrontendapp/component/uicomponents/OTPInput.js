import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const OTPInput = ({ length = 4, onChangeOTP }) => {

  const [otp, setOTP] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);


  const handleChangeText = (text, index) => {
    const newOTP = [...otp];
    newOTP[index] = text;
    setOTP(newOTP);
    onChangeOTP(newOTP.join(''));
    if (text !== '' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };


  return (
    <View style={styles.container}>
      {otp.map((value, index) => (
        <TextInput
          key={index}
          style={styles.input}
          ref={(ref) => (inputRefs.current[index] = ref)}
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          value={value}
          maxLength={1}
          keyboardType="numeric"
          autoFocus={index === 0}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
  },
  input: {
    height: 37,
    width: 37,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 13,
    color:'#fff'
  },
});

export default OTPInput;
