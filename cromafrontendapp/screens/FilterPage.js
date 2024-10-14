import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import Showproducts from '../component/uicomponents/ShowProducts';

export default function FilterPage({ route, navigation }) {
    const { searchResults, title } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={{marginTop:-30}}>
            <FlatList
                data={searchResults}
                numColumns={2}
                keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                renderItem={({ item }) => <Showproducts data={[item]} />}
                
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191919',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
       marginTop:15,
    },
});