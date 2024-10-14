import React, {useState} from 'react';
import {View, Alert} from 'react-native';
import TextBox from './TextBox';
import MyButton from './MyButton';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {postData} from '../../services/FetchNodeServices';

const Mainscreen = () => {
  const [firstName, setFirstName] = useState('');
  const [errorFirst, setErrorFirst] = useState(false);
  const [imageUri, setImageUri] = useState([]);

  const openCamera = () => {
    let options = {
      storageOption: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    launchCamera(options, response => {
      console.log('Response', response);
      if (response.didCancel) {
        console.log('User Cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button', response.customButton);
      } else {
        const source = {
          base64: 'data:image/jpeg;base64,' + response.assets[0].base64,
          name: response.assets[0].fileName,
          type: response.assets[0].type,
          uri: response.assets[0].uri,
        };
        setImageUri([imageUri, source]);
        // setImageUri(source);
      }
    });
  };

  const handleFirstNameChange = text => {
    setFirstName(text);
    setErrorFirst(false);
  };

  const handleSubmit = async () => {
    if (!firstName) {
      setErrorFirst(true);
      return;
    }

    // var formData = new FormData();
    // formData.append('picturetype', firstName);
    // formData.append('picture', {
    //   name: imageUri.name,
    //   type: imageUri.type,
    //   uri: imageUri.uri,
    // });
  var body= ({'picturetype':firstName, 'picture':imageUri})
    try {
      let responseJson = await postData(
        'userinterface/submit_picture',
        {body}
      );
      if (responseJson) {
        if (responseJson?.status) {
          Alert.alert('Success', responseJson.message);
        } else {
          Alert.alert('Error', responseJson.message);
        }
      } else {
        Alert.alert('Error', 'No response from server');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while submitting the data');
    }
  };

  return (
    <View style={{marginTop: 10, padding: 10}}>
      <TextBox
        bg="#363535"
        msg="Enter Your Name"
        helperText="Please Enter Your Name."
        bradius={15}
        w={0.85}
        onChangeText={handleFirstNameChange}
        value={firstName}
        error={errorFirst}
        placeholderClr="#525252"
        borClr="#3f403f"
        onfocClr="white"
        pl={10}
      />
      <View style={{marginTop: 20}}>
        <MyButton
          h={0.07}
          w={0.85}
          bg="#1565c0"
          msg="Upload Picture"
          bradius={15}
          onPress={openCamera}
        />
      </View>
      {imageUri && (
        <View style={{marginTop: 20}}>
          <MyButton
            h={0.07}
            w={0.85}
            bg="#1565c0"
            msg="Submit"
            bradius={15}
            onPress={handleSubmit}
          />
        </View>
      )}
    </View>
  );
};

export default Mainscreen;
