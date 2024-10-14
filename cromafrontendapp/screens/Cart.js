import { View,Text,ScrollView } from "react-native";
import { useSelector } from "react-redux";
import CartItems from "../component/uicomponents/CartItems";
import CartItemPrice from "../component/uicomponents/CartItemPrice";
import { useState } from "react";
export default function Cart(){

    const [pageRefresh,setPageRefresh]=useState(false)
    var products = useSelector(state=>state.mycart)
    var keys=Object.keys(products)
    return (
    
    <View style={{backgroundColor:'#000',height:'100%'}} >
  <View style={{flexDirection:'row',justifyContent:'space-between',margin:10,marginBottom:10}}>
            <Text style={{color:'#fff',marginBottom:10,fontSize:18,fontWeight:'800'}}>YOUR CART</Text>
            <Text style={{color:'#fff',marginBottom:10,fontSize:18,fontWeight:'800'}}>ITEMS: {keys.length}</Text>
        </View>
        <ScrollView>
        <View>
    <CartItems products={products} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} />
        </View>
        <View>
    <CartItemPrice products={products} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} />
        </View>
        </ScrollView>
    </View>
    )
    
}