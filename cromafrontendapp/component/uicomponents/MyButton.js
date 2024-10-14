import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
const {width, height} = Dimensions.get('window');
export default function MyButton({msg,w ,h,bg = 'green',onPress=()=>{}}) {
  return (
    <TouchableOpacity onPress={onPress} >
      <View
        style={{
          
          width: width * w,
          height:height * h,
          backgroundColor: bg,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection:'row',
         
        }}>
          
        <Text style={{fontSize: 15, fontWeight:'bold', color: '#fff',}}>
          {msg}
        </Text>
   </View>
    </TouchableOpacity>
  );
}
