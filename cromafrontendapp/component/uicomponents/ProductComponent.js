import {View,Text,Image,FlatList,Dimensions,}from 'react-native';
import {serverURL} from '../../services/FetchNodeServices';
import {useEffect, useState} from 'react';
import BuyButton from './BuyButton';
import PlusMinusComponent from './PlusMinusComponent';
import EI from 'react-native-vector-icons/Entypo';
import RenderHTML from 'react-native-render-html';
import {useDispatch, useSelector} from 'react-redux';
import { TouchableOpacity } from 'react-native';
import ADI from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native';
var {width, height} = Dimensions.get('window');

export default function ProductComponent({route}) {

  const [image,setImage]=useState()
  const [heart, setHeart]=useState(false)
  const {item, props} = route.params;
  const [productdetail, setProductDetail] = useState([]);
  var dispatch = useDispatch();

  var productFromRedux = useSelector(state => state.mycart);
  var productRedux = Object.values(productFromRedux);

  const allImage = item.picture.split(',');
  const handleQtyChange = (value) => {
    if (value == 0) {
      dispatch({
        type: 'REMOVE_PRODUCT',
        payload: [item.productdetailsid, item],
      });
    } else {
      item['qty'] = value;
      dispatch({type: 'ADD_PRODUCT', payload: [item.productdetailsid, item]});
      
    }
    
    props.navigation.setParams('xxxxx');
  };

  useEffect(() => {
   
    if (item) {
      setProductDetail([item]);
     
    }
  }, [item]);
  useEffect(()=>{
setImage(allImage[0])
  },[])

  const TopIcons = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 'auto',
          marginTop: 20,
          paddingRight: 15,
        }}>
        <TouchableOpacity onPress={() => setHeart(!heart)}>
          <ADI
            style={{color: 'pink', paddingRight: 10}}
            name={heart ? 'heart' : 'hearto'}
            size={24}
          />
        </TouchableOpacity>
        <ADI style={{color: '#fff'}} name="sharealt" size={24} />
      </View>
    );
  };




  const MainImage = () => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{
            backgroundColor: '#dcdde1',
            borderRadius: 10,
            marginTop: 20,
            width: width * 0.8,
            height: height * 0.4,
            resizeMode: 'contain',
          }}
          source={{uri: `${serverURL}/images/${image}`}}
        />
      </View>
    );
  };


  const AllImage = ({img}) => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          margin: 5,
          height: 150,
        }}>
        <TouchableOpacity onPress={() => setImage(img)}>
          <View
            style={{
              backgroundColor: '#dcdde1',
              margin: 5,
              alignItems: 'center',
              justifyContent: 'center',
              height: height * 0.11,
              width: width * 0.23,
              borderRadius: 10,
            }}>
            <Image
              style={{
                width: width * 0.3,
                height: height * 0.1,
                borderRadius: 10,
                resizeMode: 'contain',
              }}
              source={{uri: `${serverURL}/images/${img}`}}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };


  const ProductPicture = () => {
    
   
    // console.log('Alllll Imagess:',allImage)
    const save = item.price - item.offerprice;

    return (
      <View>

        <Text
          style={{
            color: '#fff',
            fontWeight: 500,
            fontSize: 20,
            marginLeft: 10,
            marginTop: 20,
          }}>
          {item.brandname} {item.productname} {item.modelno}
        </Text>

        <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 10}}>
          <Text
            style={{
              borderRadius: 20,
              color: '#088466',
              backgroundColor: '#cffff3',
              paddingVertical: 6,
              paddingHorizontal: 16,
              fontWeight: 800,
              fontSize: 14,
            }}>
            2000 off on payment otp page
          </Text>
          <Text
            style={{
              borderRadius: 20,
              color: '#088446',
              backgroundColor: '#cffff3',
              paddingVertical: 6,
              paddingHorizontal: 16,
              fontWeight: 800,
              marginLeft: 10,
              fontSize: 14,
            }}>
            9 month cost EMI
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',

            margin:'2%',
            fontWeight: 350,
            fontSize: 14,
          }}>
          <Text style={{color: '#12daa8'}}> 4.5 </Text>
          <EI style={{color: '#12daa8'}} name="star" size={18} />
          <Text
            style={{
              marginLeft: 2,
              textDecorationLine: 'underline',
              color: '#12daa8',
            }}>
            59 Rating & Reviews
          </Text>
        </View>

        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 25,
            color: '#fff',
            marginLeft: 15,
            marginTop: 12,
          }}>
          ₹{item.offerprice}
          <Text style={{fontSize: 14, color: '#95afc0'}}>
            {' '}
            (Inclusive of all taxes)
          </Text>
        </Text>

        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: 'grey',
            marginTop: 10,
          }}
        />
        <View>
          <Text
            style={{
              color: '#fff',
              fontSize: 17,
              marginTop: 13,
              marginLeft: 15,
            }}>
            MRP: ₹{item.price}{' '}
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 15}}>
              (Your Savings ₹{save})
            </Text>
          </Text>

          <View style={{marginVertical: '3%'}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#fff',
                marginLeft: 10,
                marginBottom: 10,
              }}>
              Color 
            </Text>

            <View
              style={{
                width: 55,
                height: 42,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#fff',
                marginLeft: 10,
              }}>
              <Text style={{color: '#fff'}}>{item.color}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: 'grey',
            marginTop: 20,
          }}
        />

        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: '#fff',
            marginLeft: 15,
            marginTop: 15,
          }}>
          Product Description
        </Text>

        <View
          style={{
            padding: 10,
            margin: 15,
            borderRadius: 8,
            marginLeft: 15,
            marginTop: 20,
            borderWidth: 1,
            borderColor: 'white',
          }}>
          <RenderHTML
            contentWidth={width - 30}
            source={{
              html: `<div style="color: #fff; font-size: 15px;">${item.description}</div>`,
            }}
          />
        </View>

        <View
          style={{
            marginTop: 15,
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
           
          }}>
          <PlusMinusComponent
            qty={
              productFromRedux[item?.productdetailsid]?.qty == undefined
                ? 0
                : productFromRedux[item?.productdetailsid]?.qty
            }
            onChange={value => handleQtyChange(value, item)}
          />
          
          <BuyButton msg={'Buy'} bg={'rgb(173 20 87)'} w={0.35} h={0.07} />
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <View style={{alignItems: 'center', marginTop: 3}}>
      {TopIcons()}  
     {MainImage()}
      </View>
      <View>
          <FlatList
            data={allImage}
            horizontal
            renderItem={item => <AllImage img={item.item} />}
          />
        </View>

        {ProductPicture()}
    </View>
    </ScrollView>);
}
