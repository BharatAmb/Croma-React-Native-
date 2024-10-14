import { FlatList,View,Text,Dimensions,Image, TouchableOpacity, Alert } from "react-native";
import { serverURL } from "../../services/FetchNodeServices";
var {width,height}=Dimensions.get('window')



export default function Brands({data,title})
{
   const BrandView=({item})=>{
    
    return(
      <TouchableOpacity>
    <View style={{alignItems:'center',justifyContent:'center'}}>
    <View  style={{marginLeft:10,marginTop:10,marginRight:10,alignItems:'center',justifyContent:'center', height:height*0.15,width:width*0.3,borderRadius:width*0.15}}>
       
     <Image style={{width:width*0.4, height:height*0.15,resizeMode:'contain'}}  source={{uri:`${serverURL}/images/${item.logo}`}} />

    </View>
    <Text style={{color:'#fff'}}>{item.brandname}</Text>
    </View>
    </TouchableOpacity> )

  }

    return(<View>
      <View style={{marginLeft:20}}><Text style={{fontSize:22,color:'#fff'}}>{title}</Text></View>
        <FlatList 
         data={data}
        horizontal
         renderItem={(item)=><BrandView item={item.item}/>}
         keyExtractor={item => item.brandid}
       />
    </View>
    )
}
