import { View,Text,Image ,TextInput, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import OTPInput from "../component/uicomponents/OTPInput";
import { useState } from "react";


export default function Login({route}){
    const { mobileno,myotp} = route.params

    const [otp, setOTP] = useState('');
    
    var navigation=useNavigation()
    
    const handleChangeOTP = otp => {
      setOTP(otp);
    };

    const handleVerfiyOtp = async () => {
    
        if (myotp == otp) {
          navigation.navigate('signupscreen',{mobileno})
        } else {
          Alert.alert('invalid otp');
        }
      };
    
      const handleChange = () => {
        navigation.navigate('loginscreen');
      };
    
  
   
    const handleNavigate=()=>{
        navigation.navigate('loginscreen')

    }

    return(<View style={{backgroundColor:'#000',flex:1}}>
       
       <View >
       <Image source={require('../assets/topVector.png')} style={{width:'100%', height:140}}  />
       </View>


        <View style={{alignItems:'center',marginTop:20}}>
        <Text style={{color:'#fff',fontSize:44}}>VERIFY OTP</Text>
        </View>


        <View  style={{alignItems:'center'}} >
            <Text style={{color:'#fff',fontSize:16}}>Enter the 4-digit code sent to you at</Text>
            <TouchableOpacity onPress={handleNavigate} >
                <Text style={{color:'#fff',fontSize:16,fontWeight:'bold',marginBottom:30}}>+91-{mobileno } <Text onPress={handleChange}  style={{color:'#fff',fontSize:16,fontWeight:'bold',textDecorationLine:'underline'}}>Change</Text></Text>
                </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row',gap: 10,marginTop: 10,fontSize: 300,alignItems:'center',justifyContent:'center'}}>
            <OTPInput  onChangeOTP={handleChangeOTP} />
        </View>
        <View style={{flexDirection:'row',width:'90%',justifyContent:'flex-end',marginTop:40}}>
        <Text style={{color:'#fff',fontSize:25,fontWeight:'bold'}}>Done</Text>
        <TouchableOpacity  onPress={handleVerfiyOtp}>
     <LinearGradient colors={['#F97794', '#623AA2',]} style={{borderRadius:70,width:56,height:34,marginHorizontal:15}}>
        <Icon name='long-arrow-right' size={30} color={"#fff"} style={{marginLeft:15,width:40}}/>
    </LinearGradient>
    </TouchableOpacity>

        </View>

    </View>)
}