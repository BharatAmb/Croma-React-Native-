import { FlatList, View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import { Card, Title, Paragraph } from 'react-native-paper';
import { serverURL } from "../../services/FetchNodeServices";
var { width, height } = Dimensions.get('window')
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Feather"
import MyButton from "./MyButton";
import BuyButton from "./BuyButton";
import PlusMinusComponent from "./PlusMinusComponent";

export default function ShowNewArrival({ data, title, props }) {
    const navigation = useNavigation();
    
    // Function to navigate to ProductDetails
    const productDetails = (item) => {
        navigation.navigate('productdetails', { item, props });
    };
    const ProductView = ({ item }) => {
        const images = item.picture.split(',');
        const save = item.price - item.offerprice

        return (
            <TouchableOpacity onPress={() => productDetails(item)} >
                <View
                    style={{
                        width: width * 0.47,
                        height: height * 0.26,
                        margin: 5,
                        backgroundColor: 'black',
                        borderRadius: 10,
                        shadowRadius: 2,
                        marginTop: 20
                    }}
                >
                    <View style={{ marginLeft: 'auto', marginTop: 10, marginRight: 15, }}>
                        <Icon name='heart' size={20} style={{ color: '#fff' }} />
                    </View>

                    <Image
                        source={{ uri: ${serverURL}/images/${images[0]} }}
                        style={{
                            width: width * 0.4,
                            height: height * 0.1,
                            resizeMode: 'contain',
                            marginTop: 10,
                            backgroundColor: 'grey',

                            marginLeft: 13
                        }}
                    />
                    <View style={{ padding: 10 }}>
                        <Text
                            ellipsizeMode="tail"
                            numberOfLines={2}
                            style={{
                                fontSize: 13,
                                color: '#fff'
                            }}
                        >
                            {item.productname} {item.modelno} color {item.color}
                        </Text>
                        <Text style={{ marginTop: 8, color: '#fff' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>₹{item.offerprice} </Text>
                            <Text style={{ textDecorationLine: 'line-through', fontSize: 9 }}>₹{item.price} </Text>
                        </Text>
                        {/* <Text style={{ color: '#10ac84', fontSize: 10 }}>You Saved ₹{save}</Text> */}
                    </View>
                    {/* <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ marginRight: 8 }}>
                            <MyButton msg={'Add'} w={0.19} h={0.04} fs={18} bg={'#1289A7'} />
                        </View>
                        
                        <BuyButton msg={'Buy'} bg={'rgb(173 20 87)'} w={0.19} h={0.04} />
                    </View> */}
                </View>


            </TouchableOpacity>
        )
    }

    return (
        <View style={{ marginTop: 15 }}>
            <View style={{ marginLeft: 12 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>{title}</Text>
            </View>
            <FlatList
                data={data}
                //numColumns={2}
                horizontal
                renderItem={(item) => <ProductView item={item.item} />}
                keyExtractor={item => item.productdetailsid}
            />
        </View>

    )
}