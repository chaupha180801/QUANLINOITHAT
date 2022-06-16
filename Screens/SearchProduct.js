import React, {useEffect, useState} from 'react';
import { Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, View, Image, Alert, FlatList, TextInput } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage'
var db = openDatabase({ name: 'QLCHNT.db' });
import remove from '../Images/remove.png'
import email from '../Images/email.png'
import phone_call from '../Images/phone_call.png'
import location from '../Images/location.png'
import search from '../Images/search.png'

export default function SearchProduct({ route,navigation }) {
  const {user_id,username,list} = route.params;
  let [searchText, setSearchText] = useState('');
  const [items, setItems] = useState(list);
  const [empty, setEmpty] = useState([]);

  
  const search_category = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM SANPHAM WHERE TENSP LIKE ?',
        [`%${searchText}%`],
        (tx, results) => {
          console.log(results.rows.length);
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setItems(temp);
          
          if (results.rows.length >= 1) {
            setEmpty(false);
          } else {
            setEmpty(true)
          }

        }
      );
    });
    const unsubscribe = navigation.addListener('focus', () => {
      db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM SANPHAM WHERE TENSP LIKE ?',
            [`%${searchText}%`],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            setItems(temp);
   
            if (results.rows.length >= 1) {
              setEmpty(false);
            } else {
              setEmpty(true)
            }
          }
        );
      });
    });
    return unsubscribe;
  };

  const emptyMSG = (status) => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text style={{ fontSize: 25, textAlign: 'center' }}>
           Không tìm thấy dữ liệu cần tìm
          </Text>
      </View>
    );
  }
  const listViewItemSeparator = () => {
    return (
      <ScrollView style={styles.controllview}>
       </ScrollView>
    );
  };

  return (
    <View>
      <TextInput 
        style={[styles.name_input, styles.mt10]} 
        placeholderTextColor={'#555'}  
        placeholder="Tìm kiếm"  
        value = {searchText}
        onChangeText={setSearchText} 
      />
      <TouchableOpacity style={styles.button1}  onPress={search_category}>
          <Image source={search} styles={styles.imge_search} />
        </TouchableOpacity>  
        <SafeAreaView style={{marginHorizontal: 10,
                                top: 20,
                                height: 550}}>
            {empty ? emptyMSG(empty) :
                <FlatList
                  data={items}
                  ItemSeparatorComponent={listViewItemSeparator}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) =>
                  <View key={item.MASP}>
                      <TouchableOpacity onPress={()=>{navigation.navigate('UpdateProduct',
                                                { id: item.MASP,
                                                  name: item.TENSP,
                                                  desc: item.MOTA,
                                                  fileImage: item.HINHANH,
                                                  stock: item.SOLUONG,
                                                  color: item.MAU,
                                                  category_id: item.MADANHMUC,
                                                  username: username})}}>
                          
                          <View style={styles.body} >                        
                            <Text style={styles.text3}>Mã SP: </Text> 
                            <Text style={styles.text_id}> SP{item.MASP}</Text>
                            <Text style={styles.text3}>Tên SP: {item.TENSP}</Text>
                            <TouchableOpacity style={styles.button4} onPress={() => {remove_product(item.MASP)}}>
                              <Image source={remove} styles={styles.image_remove} />
                            </TouchableOpacity>    
                          </View>
                        </TouchableOpacity> 
                  </View>
                } 
                />
              }
          </SafeAreaView>
    
  </View>
  )
}
const styles = StyleSheet.create({
    text_id:{
        color: "#00CC99",
        fontSize: 18,
        bottom: 32,
        left: 75,
        fontWeight: 'bold', 
    },
    button1:{
        top: -40,
        left: 370,
    },
    body:{
      marginTop: 10,
      padding: 30,
      borderRadius: 4,
      shadowColor: 'rgba(48, 48, 48, 0.3)',
      borderRadius: 8,
      backgroundColor: "#F6F7FB",
    },
    text3:{
       fontSize: 20,
       color: "#000000",
    },   
    button4: {
        position: 'absolute',
        width: 100,
        height: 100,
        right: -50,
        top: 15,
    }, 
    mt10: {
      marginTop: 20,
    },
    name_input:{
      width: "100%",
      paddingVertical: 5,
      borderColor: '#00CC99',
      borderWidth: 2,
      paddingHorizontal: 12,
      borderRadius: 15,
      color: "#000000",
      fontSize: 20,
      backgroundColor: "#F6F7FB",
      
    },

});
