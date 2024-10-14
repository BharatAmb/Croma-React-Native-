import {View, Text, Dimensions, TouchableOpacity, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MyButton from './MyButton';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {checkSyncData, getSyncData} from '../../storege/AsyncDataStorage';
import RazorpayCheckout from 'react-native-razorpay';
var {width, height} = Dimensions.get('window');

export default function CartItemPrice(props) {
  const [btnStatus, setBtnStatus] = useState();
  const [userData, setUserData] = useState({});

  var dispatch = useDispatch();
  var navigation = useNavigation();
  var productFromRedux = props.products;
  var keys = Object.keys(productFromRedux);
  var product = Object.values(productFromRedux);

  var totalamount = product.reduce((p1, p2) => {
    var amt = p2.qty * p2.price;
    return p1 + amt;
  }, 0);

  var amount = product.reduce((p1, p2) => {
    var amt = p2.qty * (p2.offerprice !== 0 ? p2.offerprice : p2.price);
    return p1 + amt;
  }, 0);

  var discountAmt = totalamount - amount;
  var netamount = totalamount - discountAmt;

  const handleNavigate=()=>{
    navigation.navigate('Home')
  }

  useEffect(() => {
    var key=checkSyncData()
    
     
    if(key)
    { 
       setBtnStatus('Make Payment')
    }    
   
}, []);
useEffect(() => {
    props.setPageRefresh(!props.pageRefresh);
}, []);

const makePayment=async()=>{
    var options = {
        description: 'Credits towards consultation',
        image: 'http://localhost:5000/images/logo.png',
        currency: 'INR',
        key: "rzp_test_GQ6XaPC6gMPNwH", // Your api key
        amount: netamount*100,
        name: userData?.username,
        prefill: {
          email: userData?.emailid,
          contact: userData?.mobileno,
          name: userData?.username
        },
        theme: {color: '#F37254'}
      }
   RazorpayCheckout.open(options).then((data) => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
        dispatch({type:'CLEAR_CART',payload:[]})
      

      }).catch((error) => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });

}


  const handlePress = async () => {
    var key = await checkSyncData();

    if (key) {
      {
        makePayment();
      }
    } else {
      navigation.navigate('loginscreen');
    }
  };

  return (
    <View>
      {keys.length == 0 ? (
        <View
          style={{
            alignItems: 'center',
            justifyContentL: 'center',
            marginTop: 60,
          }}>
          <Text style={{color: '#fff', fontSize: 18, fontWeight: '600'}}>
            Oops no items were found...😞
          </Text>
          <View style={{margin:'2%'}}>
          <MyButton   onPress={handleNavigate}
                  icon={'chevron-right'}
                  msg={'continue Shopping'}
                  w={0.4}
                  h={0.06}
                  fs={18}
                  bradius={50}
                  bg="#50B498"
                  brdCol="#fff" />
          </View>
        </View>
       
      ) : (
        <View
          style={{
            width: width * 1,
            height: height * 0.37,
            borderWidth: 2,
            borderColor: 'gray',
            backgroundColor: '#000',
            marginBottom: 20,
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: '500',
              padding: 15,
            }}>
            Price Details
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text style={{color: '#fff', fontSize: 16, paddingLeft: 15}}>
              MRP ({keys.length} items)
            </Text>
            <Text style={{color: '#fff', fontSize: 16, paddingRight: 15}}>
              &#8377;{totalamount}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text style={{color: '#fff', fontSize: 16, paddingLeft: 15}}>
              Discount
            </Text>
            <Text style={{color: '#009432', fontSize: 16, paddingRight: 15}}>
              - &#8377;{discountAmt}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text style={{color: '#fff', fontSize: 16, paddingLeft: 15}}>
              Delivery Fee
            </Text>
            <Text style={{color: '#fff', fontSize: 16, paddingRight: 15}}>
              &#8377;40
            </Text>
          </View>

          <View
            style={{
              height: 40,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
              backgroundColor: '#fff',
              marginLeft: 5,
              marginRight: 5,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                paddingLeft: 10,
                fontWeight: '600',
              }}>
              Total Amount
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                paddingRight: 10,
                fontWeight: '600',
              }}>
              &#8377;{netamount + 40}
            </Text>
          </View>

          <View style={{flexDirection: 'column', marginBottom: 30}}>
            <Text
              style={{
                color: '#009432',
                fontSize: 16,
                paddingLeft: 15,
                fontWeight: '500',
              }}>
              You will save &#8377;{discountAmt} on this order{' '}
            </Text>

            <TouchableOpacity>
              <View style={{alignItems: 'center', marginTop: 10}}>
                <MyButton
                  onPress={handlePress}
                  icon={'chevron-right'}
                  msg={btnStatus}
                  w={0.4}
                  h={0.06}
                  fs={18}
                  bradius={25}
                  bg="#50B498"
                  brdCol="#fff"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
