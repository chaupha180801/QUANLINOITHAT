import { StyleSheet, Text, View,TouchableOpacity,Image,
  ScrollView,SafeAreaView,StatusBar,TouchableWithoutFeedback,FlatList, alert, Alert,ToastAndroid } from 'react-native'
import React,{useEffect,useState} from 'react'
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import back from '../Images/back.png'
import search from '../Images/search.png'
import filter from '../Images/filter.png'
import remove from '../Images/remove.png'
import bell from '../Images/bell.png'
import user1 from '../Images/user1.png'
import house from '../Images/house.png'
import receipt from '../Images/receipt.png'
import { openDatabase } from 'react-native-sqlite-storage'
var db = openDatabase({ name: 'QLCHNT.db' });

export default function ListProduct({ route, navigation}) {
  const {id, username} = route.params;
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='SANPHAM'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS SANPHAM', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS SANPHAM(MASP INTEGER PRIMARY KEY AUTOINCREMENT, TENSP VARCHAR(255), HINHANH VARCHAR(255),SOLUONG INTEGER,MAU VARCHAR(255), MADANHMUC INTEGER, MOTA VARCHAR(255), GIABAN FLOAT, FOREIGN KEY (MADANHMUC) REFERENCES DANHMUC(MADANHMUC))',
              []
            );
          }
        }
      );
    });
  }, []);
  const [items, setItems] = useState([]);
  const [empty, setEmpty] = useState([]);
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM SANPHAM',
        [],
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
    const unsubscribe = navigation.addListener('focus', () => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM SANPHAM',
          [],
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
  }, []);

  const sort_product = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM SANPHAM ORDER BY MASP DESC',
        [],
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
  };
  const listViewItemSeparator = () => {
    return (
      <ScrollView>
       </ScrollView>
    );
  };

 
  const emptyMSG = (status) => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text style={{ fontSize: 25, textAlign: 'center' }}>
          No Record Inserted Database is Empty...
          </Text>
      </View>
    );
  }

  const remove_product = (id) => {
    Alert.alert(
      "Thông báo",
      "Bạn có chắc muốn xóa sản phẩm này?",
      [
        {
          text: "Đồng ý",
          onPress: () => {
            db.transaction((tx) => {
              tx.executeSql(
                'SELECT * FROM SANPHAM WHERE MASP = ?',
                [id],
                (tx, results) => {
                  var soluong = results.rows.item(0).SOLUONG;
                  console.log(soluong);
                  if(soluong == 0){
                    db.transaction((tx) => {
                      tx.executeSql(
                        'DELETE FROM SANPHAM WHERE MASP = ?',
                        [id],
                        (tx, results) => {
                          ToastAndroid.showWithGravity('Xóa sản phẩm thành công',
                          ToastAndroid.SHORT,
                          ToastAndroid.CENTER
                          );
                        }
                      );
                    });
                    var temp = [];
                    temp = items.filter(item => item.MASP !== id);
                    setItems(temp);
                   
                  }
                  else {
                      ToastAndroid.showWithGravity('Xóa sản phẩm không thành công vì sản phẩm đang được bán',
                      ToastAndroid.SHORT,
                      ToastAndroid.CENTER
                    );
                  }
                }
              );
            });         
          },   
        },
        {
          text: "Không đồng ý",
        },
      ]
    );
  }
  return (
    <View>
          <View styles={styles.header}>
              <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                  <Image source={back} styles={styles.imge_back} />
              </TouchableOpacity>
              <Text style={styles.text_header}>Sản phẩm</Text>
              <TouchableOpacity style={styles.button1} onPress={()=>{navigation.navigate('SearchProduct', {user_id:id, username: username, list: items})}}>
                  <Image source={search} styles={styles.imge_search} />
              </TouchableOpacity> 
          </View>
          <TouchableOpacity style={styles.button2} onPress={()=>{navigation.navigate('AddProduct', {id:id, username: username})}}>
             <Text style={styles.text2}>+ Thêm sản phẩm </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button3} onPress={sort_product}>
            <Image source={filter} styles={styles.imge_filter} />
          </TouchableOpacity>
          <SafeAreaView style={{marginHorizontal: 10,
                                top: 180,
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
          <View styles={styles.container1}>
            <TouchableOpacity style={styles.button5} onPress={() => {
                                              navigation.navigate({
                                                name: 'Home',
                                                params: {id:id, username: username},
                                                merge: true,
                                              })
                                            }}>
              <Image source={house}  />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button6}  onPress={()=>{navigation.navigate('Acount', {id:id,username: username})}}>
              <Image source={user1}  />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button7}  onPress={()=>{navigation.navigate('ListEntry', {id:id, username: username})}}>
              <Image source={bell} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button8} onPress={()=>{navigation.navigate('ListBill', {id:id,username: username})}}>
              <Image source={receipt} />
            </TouchableOpacity>
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header:{
    position: 'absolute',
    width: 200,
    height: 30,
    left: 16,
    top: 70,
    backgroundColor: 'white',
  },
  button: {
    position: 'absolute',
    width: 100,
    height: 100,
    left: 10,
    top: 40,
  },
  imge_back:{
    position: 'absolute',
    width: 90,
    height: 90,
    left: 10,
    top: 40,
  },
  text_header:{
    position: 'absolute',
    width: 250,
    left: 70,
    right: 0,
    top: 40,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 25,
    textAlign: 'center',
    color: '#303030',
  },
  button1: {
    position: 'absolute',
    width: 100,
    height: 100,
    right: -40,
    top: 40,
  },
  button2:{
    position: 'absolute',
    width: '50%',
    height: 50,
    left: 20,
    top: 110,
    backgroundColor: '#00CC99',
    borderRadius: 4,
    shadowColor: 'rgba(48, 48, 48, 0.3)',
    borderRadius: 8,
  },
  text2:{
    position: 'absolute',
    left: 18,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 37,
    textAlign: 'center',
    color: 'white',
  },
  button3:{
    position: 'absolute',
    width: 100,
    height: 100,
    right: -40,
    top: 120,
  },
  image_sp: {
    position: 'absolute',
    width: 100,
    height: 100,
    left: 10,
    top: 15,
    
  },
  scrollView: {
    marginHorizontal: 10,
    top: 180,
    height: 550,
  },
  body:{
    marginTop: 10,
    padding: 30,
    shadowColor: 'rgba(48, 48, 48, 0.3)',
    borderRadius: 8,
    backgroundColor: "white",

  },
  text3:{
   fontSize: 18,
   color: "black",

  },
  text_id:{
    color: "#00CC99",
    fontSize: 18,
    bottom: 32,
    left: 70,
    fontWeight: 'bold',
    
  },
  button4: {
    position: 'absolute',
    width: 100,
    height: 100,
    right: -60,
    top: 15,
  },

  button5: {
    position: 'absolute',
    width: 0,
    height: 40,
    left: 50,
    top: 197,
    shadowColor: 'rgba(48, 48, 48, 0.3)',
    borderRadius: 8,
  },
  button6: {
    position: 'absolute',
    width: 0,
    height: 40,
    right: 90,
    top: 198,
    backgroundColor: 'white',
    shadowColor: 'rgba(48, 48, 48, 0.3)',
    borderRadius: 8,
  },
  button7: {
    position: 'absolute',
    width: 0,
    height: 40,
    right: 180,
    top: 198,
    backgroundColor: 'white',
    shadowColor: 'rgba(48, 48, 48, 0.3)',
    borderRadius: 8,
  },
  button8: {
    position: 'absolute',
    width: 0,
    height: 40,
    left: 140,
    top: 198,
    backgroundColor: 'white',
    shadowColor: 'rgba(48, 48, 48, 0.3)',
    borderRadius: 8,
  },

})