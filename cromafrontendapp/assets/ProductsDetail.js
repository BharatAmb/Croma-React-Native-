import { View, Text, Image, Dimensions, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { serverURL } from "../services/FetchNodeServices";
import ADI from 'react-native-vector-icons/AntDesign';
import EI from 'react-native-vector-icons/Entypo';
import { useEffect, useState } from "react";
import RenderHtml from 'react-native-render-html';
import MyButton from "../component/uicomponents/MyButton";
import PlusMinusComponent from "../component/uicomponents/PlusMinusComponent";
import ProductColorDetails from "../component/uicomponents/ProductColorDetails";
// import { useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
var { width, height } = Dimensions.get('window')

export default function ProductDetails({ route }) {

    // const route = useRoute()
    
    const { item,props } = route.params;
    console.log("DEtails",props)
    console.log("ITEMS",item)
    var dispatch=useDispatch()
    const [heart, setHeart] = useState(false);
    const [colorProduct, setColorProduct] = useState(item)

    const allImage = colorProduct.picture.split(',')
    const [image, setImage] = useState();

    const TopIcons = () => {
        return (
            <View style={{ flexDirection: 'row', marginLeft: 'auto', marginTop: 20, paddingRight: 15 }}>
                <TouchableOpacity onPress={() => setHeart(!heart)}>
                    <ADI
                        style={{ color: '#fff', paddingRight: 10 }}
                        name={heart ? 'heart' : 'hearto'}
                        size={24}
                    />
                </TouchableOpacity>
                <ADI
                    style={{ color: '#fff' }}
                    name="sharealt"
                    size={24}
                />
            </View>
        )
    }

    const MainImage = () => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ backgroundColor: '#dcdde1', borderRadius: 10, marginTop: 20, width: width * 0.8, height: height * 0.4, resizeMode: 'contain' }} source={{ uri: `${serverURL}/images/${image}` }} />
            </View>
        )
    }

    useEffect(() => {
        setImage(allImage[0])
    }, [colorProduct])

    const AllImage = ({ img }) => {
        return (

            <View style={{ alignItems: 'center', justifyContent: 'center', margin: 5, height: 150 }}>

                <TouchableOpacity onPress={() => setImage(img)}>
                    < View style={{ backgroundColor: '#dcdde1', margin: 5, alignItems: 'center', justifyContent: 'center', height: height * 0.14, width: width * 0.28, borderRadius: 10 }}>
                        <Image style={{ width: width * 0.3, height: height * 0.12, borderRadius: 10, resizeMode: 'contain' }} source={{ uri: `${serverURL}/images/${img}` }} />
                    </View>
                </TouchableOpacity>

            </View>
        )
    }

    const handleQtyChange=(value)=>{
     
        if(value==0)
        {
          dispatch({type:'REMOVE_PRODUCT',payload:[item.productdetailsid,item]})  
        }
        else
        {
        item['qty']=value
    
        dispatch({type:'ADD_PRODUCT',payload:[item.productdetailsid,item]})
        }
        props.navigation.setParams('xxxxxx');
       
      }
    

    const ProductDescription = () => {
        return (
            <View>
                <Text style={{ color: '#fff', fontWeight: 500, fontSize: 20, marginTop: 20 }}>
                    {colorProduct.brandname} {colorProduct.productname} {colorProduct.modelno}
                </Text>

                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ borderRadius: 20, color: '#088466', backgroundColor: '#cffff3', paddingVertical: 6, paddingHorizontal: 16, fontWeight: 800, fontSize: 14 }}>
                        2000 off on payment otp page
                    </Text>
                    <Text style={{ borderRadius: 20, color: '#088446', backgroundColor: '#cffff3', paddingVertical: 6, paddingHorizontal: 16, fontWeight: 800, marginLeft: 10, fontSize: 14 }}>
                        9 month cost EMI
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '2%', fontWeight: 350, fontSize: 14 }}>
                    <Text style={{ color: '#12daa8' }}> 4.5 </Text>
                    <EI
                        style={{ color: '#12daa8' }}
                        name="star"
                        size={18}
                    />
                    <Text style={{ marginLeft: 2, textDecorationLine: 'underline', color: '#12daa8' }}>59 Rating & Reviews</Text>
                </View>

                <View style={{ margin: 2, paddingTop: 10 }}>
                    {colorProduct.offerprice > 0 ?
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
                            <Text style={{ textDecorationLine: 'line-through', fontSize: 18, fontWeight: 400 }}>&#8377;{colorProduct.price}</Text>
                            <Text>  &#8377;{colorProduct.offerprice}</Text>
                        </Text>
                        :
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
                            &#8377;{colorProduct.price}
                        </Text>
                    }
                    <Text style={{ fontSize: 12, color: '#fff' }}>(Incl. all Taxes)</Text>
                </View>

                <View style={{ marginVertical: '3%' }}>
                    <Text style={{ fontSize: 18, fontWeight: 600, color: '#fff' }}>Color</Text>
                    <ProductColorDetails colorProduct={colorProduct} setColorProduct={setColorProduct} product={item} />
                </View>

                <View style={{ marginTop: 10 }}>
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 500 }}>Super Saving (2 OFFERS)</Text>

                    <View style={{ marginTop: 4, borderBottomWidth: 1.5, borderColor: '#fff' }} />

                    <View style={{ marginTop: 10, }}>
                        <Image
                            source={{ uri: `${serverURL}/images/offer.webp` }}
                            style={{ height: 100, resizeMode: "contain" }}
                        />
                    </View>

                    <View style={{ borderRadius: 10, marginTop: '3%', borderWidth: 2, borderColor: '#353535', paddingVertical: 10, paddingHorizontal: 16 }}>
                        <RenderHtml tagsStyles={{ body: { color: '#fff', fontSize: 15, fontWeight: 500 } }}
                            contentWidth={width}
                            source={{ html: colorProduct.description }}
                        />
                    </View>
                </View>

                <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5 }}>
                    <PlusMinusComponent onChange={handleQtyChange} />
                    <MyButton bg='#12daa8' msg='Buy Now' w={0.47} h={0.08} txtCol='#000' brdCol='#12daa8' />
                </View>

            </View>
        )
    }

    return (

        <ScrollView>
            <View style={{ flex: 1, backgroundColor: '#000' }}>

                {TopIcons()}

                {MainImage()}

                <View>
                    <FlatList
                        data={allImage}
                        horizontal
                        renderItem={(item) => <AllImage img={item.item} />}
                    />
                </View>

                {ProductDescription()}

            </View>
        </ScrollView>
    )
}
