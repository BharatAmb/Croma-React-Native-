import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import TextBox from '../component/uicomponents/TextBox';
import {useState} from 'react';
import {postData} from '../services/FetchNodeServices';

export default function Login() {
  const [mobileno, setMobileno] = useState('');
  const [error, setError] = useState(false);
  var navigation = useNavigation();

  const handleMobileNo = txt => {
    setMobileno(txt);
    setError(false);
  };

  const generateOTP = () => {
    var myotp = parseInt(Math.random() * 8999) + 1000;
    console.log(myotp);
    return myotp;
  };

  // const handleSignUpNavigate = () => {
  //   navigation.navigate('signupscreen');
  // };
  const handleCheckUser = async () => {
    console.log(mobileno, 'MobileNO.');
    var submit = true;
    if (mobileno.length === 0) {
      setError(true);
      submit = false;
    }
    if (submit) {
      var result = await postData('useraccount/check_account', {mobileno});
      // console.log(result.message)
      if (result.status) {
        // console.log(userData)
        navigation.navigate('signupscreen', {
          userData: result.data,
          flag: 'true',
          mobileno,
        });
      } else {
        var myotp = generateOTP();
        navigation.navigate('otpscreen', {mobileno, myotp});
      }
    }
  };

  return (
    <View style={{backgroundColor: '#000', flex: 1, height: '80'}}>
      <View>
        <Image
          source={require('../assets/topVector.png')}
          style={{width: '100%', height: 140}}
        />
      </View>

      <View style={{alignItems: 'center'}}>
        <Text style={{color: '#fff', fontSize: 64}}>Welcome</Text>
      </View>

      <View style={{alignItems: 'center'}}>
        <Text style={{color: '#fff', fontSize: 16, marginBottom: 30}}>
          Login to your account
        </Text>
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TextBox
          bg="red"
          w={0.8}
          msg={'Enter Your Mobile No.'}
          helperText={'Please enter a valid mobile number.'}
          bradius={10}
          onChangeText={txt => handleMobileNo(txt)}
          value={mobileno}
          type={'numeric'}
          error={error}
          placeholderClr="red"
          borClr="#3f403f"
          onfocClr="white"
          pl={10}
          icon={'mobile1'}
          Iconclr="#525252"
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '90%',
          justifyContent: 'flex-end',
          marginTop: 40,
        }}>
        <Text style={{color: '#fff', fontSize: 25, fontWeight: 'bold'}}>
          Send OTP
        </Text>

        <LinearGradient
          colors={['#F97794', '#623AA2']}
          style={{
            borderRadius: 70,
            width: 56,
            height: 34,
            marginHorizontal: 15,
          }}>
          <TouchableOpacity onPress={handleCheckUser}>
            <Icon
              name="long-arrow-right"
              size={30}
              color={'#fff'}
              style={{marginLeft: 15, width: 40}}
            />
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <View style={{height: 300}}></View>

      <View style={{backgroundColor: '#000'}}>
        <TouchableOpacity >
          <Text
            style={{
              color: '#fff',
              marginBottom: 45,
              fontSize: 15,
              textAlign: 'center',
            }}>
            Don't have an account?
            <Text
              style={{
                textDecorationLine: 'underline',
                fontSize: 18,
                color: 'green',
              }}>
              Create
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
