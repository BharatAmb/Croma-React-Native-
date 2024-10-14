import { Text, View,Image,Dimensions  } from "react-native";
import { useDispatch,useSelector } from "react-redux";
import { serverURL } from "../../services/FetchNodeServices";
import MyButton from "./MyButton";
var {width,height}=Dimensions.get('window');


export default function CartItems(props){

    var products = useSelector(state=>state.mycart)
    
    var products=Object.values(products)

    var dispatch = useDispatch()

    const removeProduct=(item)=>{
        dispatch({type:'REMOVE_PRODUCT',payload:[item?.productdetailsid,item]})
        props?.setPageRefresh(!props.pageRefresh)
       
    }

    const cartbox=()=>{
       return products?.map((item,i)=>{
            return(
                <View style={{paddingBottom:10}}>
                     <View style={{justifyContent:'space-between',flexDirection:'row',width:width*1,height:height*0.26,borderWidth:2,borderColor:'gray',borderRadius:15}}>
                <View style={{marginLeft:8,alignItems:'center',justifyContent:'center',height:200}}>
                    <Image style={{width:120,height:130,backgroundColorL:'green'}} source={{uri: `${serverURL}/images/${item.productpicture}`}} />
                </View>
                <View style={{flexDirection:'column',width:'68%',marginRight:2}}>
                <View style={{marginTop:18}}>
                    <Text style={{color:'#000',fontSize:16,fontWeight:'600',color:'#fff'}}>{item.brandname} {item.productname}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <View style={{marginTop:2}}>
                    <Text style={{color:'#000',fontSize:14,fontWeight:'600',textDecorationLine:'line-through',opacity:0.6,color:'#fff'}}>&#8377;{item.price}</Text>
                </View>
                <View style={{marginLeft:5,marginTop:2}}>
                    <Text style={{color:'#000',fontSize:17,fontWeight:'600',color:'#fff'}}>&#8377;{item.offerprice}</Text>
                </View>
                
                </View>
                <Text style={{color:'gray',fontSize:13}}>(Incl. all Taxes)</Text>
                <View style={{marginTop:4}}>
                    <Text style={{color:'#fff',fontSize:12}}>Express delivery by today | &#8377;99</Text>
                    <Text style={{color:'#fff',fontSize:12}}>Standard delivery by 2 July 2024 | Free</Text> 
                </View>
                <View style={{height:1,width:'100%',backgroundColor:'gray',marginTop:30}}  ></View>
                <View style={{flexDirection:'row',marginTop:4, }}> 
          
                    <MyButton msg={'Move to Wishlist'} w={0.3} h={0.05} fs={12} bg="#000" brdCol="#fff" />
                    <MyButton onPress={()=>removeProduct(item)} msg={'Remove'} w={0.3} h={0.05} fs={12} bg="#000" brdCol="#fff" />
                </View>
                </View>
        
             </View>

                </View>
            )
        })

    }      


    return(
        <View style={{backgroundColor:'black'}}>
            <View >
            {cartbox()}
            </View>
        </View>
    )
}