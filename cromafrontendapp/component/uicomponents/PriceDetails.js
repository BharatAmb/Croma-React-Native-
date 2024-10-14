import { View,Text,Dimensions } from "react-native";
import { useSelector } from "react-redux";
import {useState,useEffect} from 'react'
import MyButton from "./MyButton";
import { useNavigation } from "@react-navigation/native";
import {checkSyncData,getSyncData} from '../../storage/AsyncDataStorage'
import RazorpayCheckout from 'react-native-razorpay';
import { useDispatch } from "react-redux";
var {width,height}=Dimensions.get('window');


export default function PriceDetails(props){
    var productFromRedux = useSelector(state=>state.mycart)
    var product = Object.values(productFromRedux)
    var keys = Object.keys(productFromRedux)
    var navigation=useNavigation()
    var dispatch=useDispatch()
    const [btnStatus, setBtnStatus] = useState('Continue');
    const [userData,setUserData]=useState({})
    var totalamount=product.reduce((p1,p2)=>{
        var amt = p2.qty*p2.price
        return p1+amt
    },0);

    var amount=product.reduce((p1,p2)=>{
        var amt = p2.qty*(p2.offerprice!==0?p2.offerprice:p2.price)
        return p1+amt
    },0);

    var discountAmt = totalamount-amount
    var netamount = totalamount-discountAmt
    useEffect(async() => {
        var key=await checkSyncData()
         var data=await getSyncData(key[0])
    
        if(key)
        {  
        setBtnStatus('Make')
         setUserData(data) 
           
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

    const handlePress=async()=>{
        var key=await checkSyncData()
        
        if(key)
        {
           makePayment()
        }    
        else{
     navigation.navigate('loginscreen')
        }

    }
    return(<View>
        {keys.length==0?<View style={{alignItems:'center',justifyContentL:'center',marginTop:60}}><Text style={{color:'#000',fontSize:18,fontWeight:'600'}}>Oops no items were found...😞</Text></View>:<View style={{width:width * 0.92,height:height * 0.37,borderWidth:2,borderColor:'gray',marginBottom:20,borderRadius:10}}>
            <Text style={{color:'#000',fontSize:18,fontWeight:'500',padding:15}}>Price Details</Text>
            
            <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
                <Text style={{color:'#000',fontSize:16,paddingLeft:15}}>MRP ({keys.length} items)</Text>
                <Text style={{color:'#000',fontSize:16,paddingRight:15}}>&#8377;{totalamount}</Text>
            </View>

            <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
                <Text style={{color:'#000',fontSize:16,paddingLeft:15}}>Discount</Text>
                <Text style={{color:'#009432',fontSize:16,paddingRight:15}}>-  &#8377;{discountAmt}</Text>
            </View>

            <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
                <Text style={{color:'#000',fontSize:16,paddingLeft:15}}>Delivery Fee</Text>
                <Text style={{color:'#000',fontSize:16,paddingRight:15}}>&#8377;40</Text>
            </View>

            <View style={{height:40,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:10,backgroundColor:'#000',marginLeft:5,marginRight:5,borderRadius:10}}>
                <Text style={{color:'#fff',fontSize:16,paddingLeft:10,fontWeight:'600'}}>Total Amount</Text>
                <Text style={{color:'#fff',fontSize:16,paddingRight:10,fontWeight:'600'}}>&#8377;{netamount+40}</Text>
            </View>

            <View style={{flexDirection:'column',marginBottom:30}}>
                <Text style={{color:'#009432',fontSize:16,paddingLeft:15,fontWeight:'500'}}>You will save &#8377;{discountAmt} on this order </Text>
                
                <View style={{alignItems:'center',marginTop:5,}}>

                    <MyButton onPress={handlePress} icon={'chevron-right'} msg={btnStatus} w={0.6} h={0.06} fs={18} bradius={25} bg="#000" brdCol="#fff" />
                </View>
            </View>
            
        </View>}
        </View>
    )
}