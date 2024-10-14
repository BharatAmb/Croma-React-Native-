import { View,TextInput,StyleSheet,Dimensions, Text } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import EIcon from 'react-native-vector-icons/Entypo'
import { useState } from "react";
const{width,height}=Dimensions.get('window')
/*const style=StyleSheet.create({
    container:{
        
    } 


})*/

export default function TextBox({password=false,error=false,helperText='',icon,w=.9,msg='',type='text',...props})
{  const [color,setColor]=useState('grey') 
   const [eyeIcon,setEyeIcon]=useState('eye') 
   const [showPassword,setShowPassword]=useState(false)
   const handleEyeClick=()=>{
    if(!showPassword) 
    {setEyeIcon('eye-with-line')
    setShowPassword(true)}
    else
    {
        setEyeIcon('eye')
    setShowPassword(false)
    }
   }
   
   return(
   <View>
    <View  style={{alignItems:'center',borderRadius:15, flexDirection:'row',padding:2,width:width*w,borderWidth:2,borderColor:error?'#ff4757':color,backgroundColor:'#000',marginTop:10}}>
    <Icon name={icon} size={30}  />
    <TextInput secureTextEntry={showPassword} onFocus={()=>setColor('green')} onBlur={()=>setColor('grey')}  {...props}  style={{fontSize:18}} spellCheck={true}  keyboardType={type} placeholder={msg}/>
    {password?<EIcon style={{marginLeft:'auto',padding:10}} name={eyeIcon} size={25} onPress={handleEyeClick} />:<></>} 
   </View>
    {error?<Text style={{color:'#ff4757'}}>{helperText}</Text>:<></>}
   </View>
   )

}



