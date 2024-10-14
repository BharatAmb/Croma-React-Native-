import {
  FlatList,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {serverURL} from '../../services/FetchNodeServices';
import {useNavigation} from '@react-navigation/native';
import BuyButton from './BuyButton';

var {width, height} = Dimensions.get('window');

export default function Showproducts({data, title, props}) {
  var navigation = useNavigation();

  const handleNavigate = item => {
    navigation.navigate('productcomponent', {item, props});
  };
  const ProductView = ({item}) => {
    return (
      <TouchableOpacity onPress={() => handleNavigate(item)}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#353b48',
            margin: 10,
            borderRadius: 10,
            height: height * 0.35,
            width: width * 0.47,
          }}>
          <View
            style={{
              justifyContent: 'end',
              alignItems: 'end',
              marginLeft: 'auto',
              marginTop: 10,
              marginRight: 30,
            }}>
            <Icon name="heart" size={20} color="#fff" />
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{
                width: width * 0.4,
                height: height * 0.17,
                resizeMode: 'contain',
              }}
              source={{uri: `${serverURL}/images/${item.productpicture}`}}
            />
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                color: '#fff',
                width: 195,
                margin: 5,
                fontSize: 18,
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 'bold',
              }}
              numberOfLines={1}>
              {' '}
              {item.productname}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  textDecorationLine: 'line-through',
                }}>
                &#8377; {item.price}{' '}
              </Text>
            </View>
            <View>
              <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
                {' '}
                &#8377;{item.offerprice}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'space-evenly',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <PlusMinusComponent w={0.11} h={0.04} /> */}
            <BuyButton msg={'Buy'} bg={'rgb(173 20 87)'} w={0.21} h={0.04} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={{marginLeft: 20, margin: 20}}>
        <Text style={{fontSize: 22, color: '#fff'}}>{title}</Text>
      </View>
      <FlatList
        data={data}
        horizontal
        renderItem={item => <ProductView item={item.item} />}
        keyExtractor={item => item.productdetailsid}
      />
    </View>
  );
}
