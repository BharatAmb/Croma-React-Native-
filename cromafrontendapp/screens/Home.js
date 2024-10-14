import {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {ScrollView} from 'react-native';
import SearchBar from '../component/uicomponents/SearchBar';
import SliderComponent from '../component/uicomponents/SliderComponent';
import {getData, serverURL, postData} from '../services/FetchNodeServices';
import Showproducts from '../component/uicomponents/ShowProducts';
import Banners from '../component/uicomponents/Banners';
import Brands from '../component/uicomponents/Brands';
import { useNavigation } from '@react-navigation/native';

export default function Home(props) {
  // console.log("PROPSS HOME:",props)

  var navigation=useNavigation()
  const [category, setCategoryList] = useState([]);
  const [Product, setProduct] = useState([]);
  const [saleProduct, setSaleProduct] = useState([]);
  const [Banner, setBanner] = useState('');
  const [Brand, setBrand] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAllBanners = async () => {
    var result = await getData('userinterface/fetch_all_banner');
    setBanner(result?.data[0]?.files);
  };

  const fetchAllCategory = async () => {
    var result = await getData('userinterface/display_all_category');
    setCategoryList(result.data);
  };

  const fetchProductByStatus = async status => {
    var result = await postData(
      'userinterface/display_all_products_by_status',
      {status},
    );
    setProduct(result.data);
  };

  const fetchSaleProduct = async status => {
    var result = await postData(
      'userinterface/display_all_products_by_status',
      {status},
    );
    setSaleProduct(result.data);
  };

  const fetchBrand = async () => {
    var result = await getData('userinterface/display_all_brands');
    setBrand(result.data);
  };

  const handleSearch = (query) => {

    setSearchQuery(query);
    const filteredProducts = Product.filter(product =>
        product.productname.toLowerCase().includes(query.toLowerCase())
    );

    // const filteredNewArrival = newArrival.filter(product =>
    //     product.productname.toLowerCase().includes(query.toLowerCase())
    // );

    const filterSaleProduct = saleProduct.filter(product =>
        product.productname.toLowerCase().includes(query.toLowerCase())
    );

    const searchResults = [...filteredProducts, ...filterSaleProduct,];

    navigation.navigate('filter', { searchResults, title: 'Search Results' });
};


  useEffect(function () {
    fetchAllCategory();
    fetchProductByStatus('Trending');
    fetchSaleProduct('Sale');
    
    fetchAllBanners();
    fetchBrand();
  }, []);
  return (
    <ScrollView>
      <View style={{flex: 1, backgroundColor: '#000'}}>
        <View style={{alignItems: 'center'}}>
          <SearchBar w="0.9" onSearch={handleSearch} />
        </View>
        <SliderComponent data={category} title={'Categories'} />
        <View>
          <Banners data={Banner} />
        </View>
        <View>
          <Brands data={Brand} title={'Top Brands'} />
        </View>

        <View>
          <Showproducts
            data={Product}
            title={'Deals of tha Day'}
            props={props}
          />
        </View>
        <View>
          <Showproducts
            data={saleProduct}
            title={'Sale'}
            props={props}
          />
        </View>

        {/* 
 <View>
   <UploadImage />
 </View> */}
      </View>
    </ScrollView>
  );
}
