import {
  View,
  Text,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SocialMedia from 'react-native-vector-icons/Entypo';
import TextBox from '../component/uicomponents/TextBox';
import LinearGradient from 'react-native-linear-gradient';
import {postData} from '../services/FetchNodeServices';
import {storeDatasync} from '../storege/AsyncDataStorage';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

export default function Sign({route}) {
  var {mobileno} = route.params;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const [pin, setPin] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState(false);

  const [otp, setOtp] = useState(0);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorName, setErrorName] = useState(false);

  const [errorPin, setErrorPin] = useState(false);
  const [errorAddress, setErrorAddress] = useState(false);

  var navigation = useNavigation();
  console.log('mobilee Noo', mobileno);

  const handleEmail = text => {
    setEmail(text);
    setErrorEmail(false);
  };

  const handleName = text => {
    setName(text);
    setErrorName(false);
  };

  const handlePin = text => {
    setPin(text);
    setErrorPin(false);
  };

  const handleAddress = text => {
    setAddress(text);
    setErrorAddress(false);
  };

  const handleSubmitUserInfo = async () => {
    console.log(email, 'email');
    console.log(name, 'username');

    console.log(pin, 'pincode');
    console.log(address, 'address');

    var submit = true;
    if (email.length === 0) {
      setErrorEmail(true);
      submit = false;
    }
    if (name.length === 0) {
      setErrorName(true);
      submit = false;
    }

    if (pin.length === 0) {
      setErrorPin(true);
      submit = false;
    }

    if (address.length === 0) {
      setErrorAddress(true);
      submit = false;
    }

    if (submit) {
      var body = {
        emailid: email,
        username: name,
        mobileno: mobileno,
        address: address,
        pincode: pin,
      };
      var result = await postData('useraccount/submit_useraccount', body);
      console.log(result.message);
      if (result.status) {
        await storeDatasync('USER', body);
        console.log(body);
        navigation.navigate('cart');
      } else {
        console.log(result.message);
      }
    }
  };

  return (
    <View style={{backgroundColor: '#000', flex: 1}}>
      <View>
        <Image
          source={require('../assets/topVector.png')}
          style={{width: '100%', height: 140}}
        />
      </View>

      <View style={{alignItems: 'center', marginBottom: 40, marginTop: 10}}>
        <Text style={{color: '#fff', fontSize: 39, fontWeight: 'bold'}}>
          Create account
        </Text>
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TextBox
          bg="red"
          w={0.8}
          msg={'Email Address'}
          helperText={'Incorrect Email Address.'}
          bradius={10}
          onChangeText={txt => handleEmail(txt)}
          value={email}
          type={'mail'}
          error={errorEmail}
          placeholderClr="#525252"
          borClr="#3f403f"
          onfocClr="white"
          pl={10}
          icon={'mail'}
          Iconclr="#525252"
        />

        <TextBox
          bg="red"
          w={0.8}
          msg={'Your Full Name.'}
          helperText={'Required: User Name.'}
          bradius={10}
          onChangeText={txt => handleName(txt)}
          value={name}
          type={'text'}
          error={errorName}
          placeholderClr="red"
          borClr="#3f403f"
          onfocClr="white"
          pl={10}
          icon={'user'}
          Iconclr="#525252"
        />

        <TextBox
          bg="red"
          w={0.8}
          msg={'Pincode'}
          helperText={'Required: User PinCode.'}
          bradius={10}
          onChangeText={txt => handlePin(txt)}
          value={pin}
          type={'numeric'}
          error={errorPin}
          placeholderClr="red"
          borClr="#3f403f"
          onfocClr="white"
          pl={10}
          icon={'pushpino'}
          Iconclr="#525252"
        />

        <TextBox
          bg="red"
          w={0.8}
          msg={'Full Address'}
          helperText={'Required: User Address.'}
          bradius={10}
          onChangeText={txt => handleAddress(txt)}
          value={address}
          type={'text'}
          error={errorAddress}
          placeholderClr="red"
          borClr="#3f403f"
          onfocClr="white"
          pl={10}
          icon={'home'}
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
          Create
        </Text>
        <LinearGradient
          colors={['#F97794', '#623AA2']}
          style={{
            borderRadius: 70,
            width: 56,
            height: 34,
            marginHorizontal: 15,
          }}>
          <Icon
            name="long-arrow-right"
            onPress={handleSubmitUserInfo}
            size={30}
            color={'#fff'}
            style={{marginLeft: 15, width: 40, marginLeft: 15}}
          />
        </LinearGradient>
      </View>

      <Text
        style={{
          color: '#fff',
          marginTop: 30,
          fontSize: 16,
          textAlign: 'center',
        }}>
        Or create account using social media
      </Text>

      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
        <SocialMedia
          name="facebook-with-circle"
          size={55}
          color="#014b50"
          style={{
            margin: 10,
            elevation: 10,
            borderRadius: 50,
            backgroundColor: '#fff',
          }}
        />
        <SocialMedia
          name="twitter-with-circle"
          size={55}
          color="#F97794"
          style={{
            margin: 10,
            elevation: 10,
            borderRadius: 50,
            backgroundColor: '#fff',
          }}
        />
        <SocialMedia
          name="google--with-circle"
          size={55}
          color="#3e5701"
          style={{
            margin: 10,
            elevation: 10,
            borderRadius: 50,
            backgroundColor: '#fff',
          }}
        />
      </View>
    </View>
  );
}
