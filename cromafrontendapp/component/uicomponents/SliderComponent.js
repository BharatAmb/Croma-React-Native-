import { FlatList,View,Text,Dimensions,Image } from "react-native";
import { serverURL } from "../../services/FetchNodeServices";
var {width,height}=Dimensions.get('window')



export default function SliderComponent({data,title})
{
  const CategoryView=({item})=>{
    
    return(
    <View style={{alignItems:'center',justifyContent:'center'}}>
    <View style={{marginLeft:10,marginTop:10,marginRight:10,alignItems:'center',justifyContent:'center', height:height*0.15,width:width*0.3,borderRadius:width*0.15}}>
       
     <Image style={{width:width*0.4, height:height*0.15,resizeMode:'contain'}}  source={{uri:`${serverURL}/images/${item.image}`}} />

    </View>
    <Text style={{color:'#fff'}}>{item.categoryname}</Text>
    </View>
    )

  }

    return(<View>
            <View style={{marginLeft:20,marginTop:10}}><Text style={{fontSize:20,color:'#fff'}}>{title}</Text></View>

        <FlatList 
         data={data}
        horizontal
         renderItem={(item)=><CategoryView item={item.item}/>}
         keyExtractor={item => item.categoryid}
       />
    </View>)
}
