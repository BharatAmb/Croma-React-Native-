import { View,Text, TouchableOpacity ,icon, Alert} from "react-native";
import TextBox from "./TextBox";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function SearchBar({onSearch}){
   const [query, setQuery] = useState('');

    const handleSearch = (text) => {
        
        setQuery(text);
        if (onSearch) {
            onSearch(text); // Pass the search query to the parent component
        }
    };

    return(<View>
        <TextBox icon="search1" w={0.96} msg="Search Product here..." value={query}
            onChangeText={handleSearch} />
    </View>)
}



