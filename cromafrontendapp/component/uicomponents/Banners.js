import { Dimensions, Image, View } from 'react-native';
import { serverURL } from '../../services/FetchNodeServices';
import Carousel from 'react-native-reanimated-carousel';
const {width,height} = Dimensions.get('window');
export default function Banners({data,}){
    var image=data?.split(',')
     
        // console.log('Imagess:',image)

    return(
        <View height={190} >
        <Carousel
            loop
            width={width}
            height={width / 2}
            autoPlay={true}
            data={image}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => console.log('current index:', index)}
            renderItem={({ item }) => (
                <View
                    style={{
                        flex: 1,
                        borderWidth: 1,
                        justifyContent: 'center',
                        

                    }}
                >
                <Image style={{width:width,height:height/2,resizeMode:'contain'}} source={{uri:`${serverURL}/images/${item}`}}  />      
                </View>
            )}
        />
    </View>)}
