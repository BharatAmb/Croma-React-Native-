import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import UploadPicture from './UploadPicture';
import Home from '../../screens/Home';
import AppHeader from './AppHeader';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, Text, View} from 'react-native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductComponent from './ProductComponent';
import SignUpScreen from '../../screens/SignUpScreen';
import OTPscreen from '../../screens/OTPscreen';
import LoginScreen from '../../screens/LoginScreen';
import Cart from '../../screens/Cart';
import {getSyncData, removeDatasync} from '../../storege/AsyncDataStorage';
import {checkSyncData} from '../../storege/AsyncDataStorage';
import {useState, useEffect} from 'react';
import Filter from '../../screens/FilterPage';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
export default function RootNavigator() {
  const [data, setData] = useState({});

  useEffect(async () => {
    var key = await checkSyncData();
    if (key) {
      console.log('AVILABLE', key);
      var data = await getSyncData(key[0]);
      console.log('DATA', data);
      setData(data);
    }
  }, []);

  const ProjectDrawer = () => {
    return (
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            drawerIcon: () => <MCI color="#000" name={'home-city'} size={24} />,
          }}
        />
      </Drawer.Navigator>
    );
  };
  const handleLogout = async () => {
    var key = await checkSyncData();
    if (key) {
      var data = await removeDatasync(key[0]);
      alert('Logout Successfully');
    }
  };

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <View
          style={{padding: 20, alignItems: 'center', flexDirection: 'column',}}>
          <Image
            style={{
              marginBottom: 5,
              borderRadius: 50,
              resizeMode: 'contain',
              width: 100,
              height: 100,
            }}
            source={require('../../assets/Alice.jpg')}
          />
          
          <Text style={{fontWeight: 'bold', color: '#000'}}>
            {data.username}
          </Text>
          <Text style={{fontWeight: 'bold', color: '#000'}}>
            +91-{data.mobileno}
          </Text>
          <Text style={{fontSize: 12, fontWeight: 'bold', color: '#000'}}>
            {data.emailid}
          </Text>
        </View>

        <DrawerItemList {...props} />

        {/* <DrawerItem
          label="My Profile"
          onPress={() => alert(JSON.stringify(data))}
          icon={() => <MCI color="#000" name={'account-box'} size={24} />}
        /> */}
        
        <DrawerItem
          label="My Profile"
          onPress={() => alert(JSON.stringify(data))}
          icon={() => <MCI color="#000" name={'account-box'} size={24} />}
        />
        <DrawerItem
          label="Settings"
          icon={() => <MCI color="#000" name={'account-settings'} size={24} />}
        />

        <DrawerItem
          onPress={handleLogout}
          label="Logout"
          icon={() => <MCI color="#000" name={'logout'} size={24} />}
        />
      </DrawerContentScrollView>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Mainscreen'}>
        <Stack.Screen
          name="Mainscreen"
          component={ProjectDrawer}
          options={{header: AppHeader}}
        />

        <Stack.Screen
          component={ProductComponent}
          name={'productcomponent'}
          options={{header: AppHeader}}
        />

        <Stack.Screen component={Cart} name={'cart'} />

        <Stack.Screen
          component={LoginScreen}
          name={'loginscreen'}
          options={{headerShown: false}}
        />

        <Stack.Screen
          component={SignUpScreen}
          name={'signupscreen'}
          options={{headerShown: false}}
        />

        <Stack.Screen
          component={OTPscreen}
          name={'otpscreen'}
          options={{headerShown: false}}
        />

        <Stack.Screen
          component={UploadPicture}
          name={'picture'}
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Filter}
          name={'filter'}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
