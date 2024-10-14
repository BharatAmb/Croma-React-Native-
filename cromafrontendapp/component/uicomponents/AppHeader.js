
import {Image, Dimensions, Text,View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';
import Icon from "react-native-vector-icons/Feather"
const {width, height} = Dimensions.get('window');
import { useSelector } from 'react-redux';

export default function AppHeader() {
  var navigation = useNavigation();
  var cartItems=useSelector((state)=>state.mycart)
  var keys=Object.keys(cartItems)
  return (
    <View>
      <View
        style={{
          alignItems: 'center',
       
          display: 'flex',
          width: width,
          backgroundColor:'#fff',
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: 5,
        }}>
        <Icon 
        color="#000"
          name="menu"
          size={24}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
        <Image
          style={{resizeMode:'cover', width: 100, height: 45}}
          source={require('../../assets/Croma-Logo.png')}
        />
        <TouchableOpacity onPress={()=>navigation.navigate('cart')} >
     <View style={{position:'relative',padding:10}}>
      <View style={{position:'absolute',zIndex:3,left:16,justifyContent:'center',alignItems:'center',top:-3,backgroundColor:'green',width:18,height:18,borderRadius:50}}>
      <Text style={{fontWeight:'bold',color:'#fff'}}>{keys.length}</Text>
      </View>
      <Icon name="shopping-cart" size={24} color="#000" />
     </View>
     </TouchableOpacity>

      </View>
    </View>
  );
}


