import {useState} from 'react';
import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MyButton from './MyButton';

const {width, height} = Dimensions.get('window');

export default function PlusMinusComponent(props) {
  const [value, setValue] = useState(0);
  // alert(JSON.stringify(props));

  // useEffect(
  //   function () {
  //     setValue(props.qty);
  //   },
  //   [props.qty, value],
  // );

  const handlePlus = () => {
    var v = value;
    v = v + 1;
    setValue(v);
    props.onChange(v);
  };

  const handleMinus = () => {
    var v = value;
    v = v - 1;
    setValue(v);
    props.onChange(v);
  };

  return (
    <View
      style={{
        width: 100,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {value == 0 ? (
        <View>
          <MyButton msg={'Add'} w={0.35} h={0.07} onPress={handlePlus} />
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: 150,
            height: 60,
            margin: 10,
            borderWidth: 1,
            borderColor: 'gray',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={handleMinus}>
            <View style={{backgroundColor: 'green', borderRadius: 50}}>
              <Icon name="minus" size={35} style={{color: '#fff'}} />
            </View>
          </TouchableOpacity>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: '#fff'}}>
            {value}
          </Text>
          <TouchableOpacity onPress={handlePlus}>
            <View style={{backgroundColor: 'green', borderRadius: 50}}>
              <Icon name="plus" size={35} style={{color: '#fff'}} />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
