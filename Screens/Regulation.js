import { StyleSheet, Text, View,TouchableOpacity,Image,TextInput,ToastAndroid,Alert} from 'react-native'
import React, {useState,useEffect} from 'react'
import back from '../Images/back.png'
import sofa from '../Images/sofa.png'
import { openDatabase } from 'react-native-sqlite-storage'
import login from '../Images/login.png'
import regulation_header from '../Images/regulation_header.png'
var db = openDatabase({ name: 'QLCHNT.db' });

export default function Regulation({route, navigation }) {
  const {username} = route.params;
  let [inputPrice, setPrice] = useState('');
  let [inputStock, setStock] = useState('');
  let [id, setId] = useState('');
  
  const reset = () => {
    setPrice('');
    setStock('');
  }
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='QUIDINH'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS QUIDINH', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS QUIDINH(MAQĐ INTEGER PRIMARY KEY AUTOINCREMENT, TILEGIA FLOAT, SOLUONGTOITHIEUNHAP INTEGER)',
              []
            );
            txn.executeSql('INSERT INTO QUIDINH (TILEGIA, SOLUONGTOITHIEUNHAP) VALUES (?,?)',[1.05, 40]);
          }
        }
      );
    });
  }, []);
  useEffect(() => {
    db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM QUIDINH',
          [],
          (tx, results) => {
            var id = results.rows.item(0).MAQĐ;
            var tilegia = results.rows.item(0).TILEGIA;
            var sl =  results.rows.item(0).SOLUONGTOITHIEUNHAP;
            setPrice(tilegia.toString());
            setStock(sl.toString());
            setId(id.toString());   
          }
        );
      });
    const unsubscribe = navigation.addListener('focus', () => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM QUIDINH',
          [],
          (tx, results) => {
            var id = results.rows.item(0).MAQĐ;
            var tilegia = results.rows.item(0).TILEGIA;
            var sl =  results.rows.item(0).SOLUONGTOITHIEUNHAP;
            setPrice(tilegia.toString());
            setStock(sl.toString());
            setId(id.toString());            
          }
        );
      });
    });

  return unsubscribe;
  }, []);

  const update_regulation = () => {
    console.log(inputPrice, inputStock,id);
    if (!inputPrice) {
      ToastAndroid.showWithGravity('Vui lòng nhập tỉ lệ giá bán',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }
    if (!inputStock) {
      ToastAndroid.showWithGravity('Vui lòng nhập số lượng tồn tối thiểu',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }
    
    db.transaction(function (tx) {
      tx.executeSql(
        'UPDATE QUIDINH SET TILEGIA = ? , SOLUONGTOITHIEUNHAP = ? WHERE MAQĐ = ?',
        [Number(inputPrice), Number(inputStock) , Number(id)],      
        (tx, results) => {
          console.log('Results executeSql update into qui định: ', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('Results update success.', results.rowsAffected);
            Alert.alert(
                'Thành công',
                'Cập nhật qui định thành công',
            );
          } else alert('Cập nhật qui định không thành công');
        }
      );
    });
  };
  return (
    <View>
       <Image source={login} style={styles.image}/>
       <View styles={styles.header}>
         
          <TouchableOpacity style={styles.button} onPress={()=>navigation.goBack()}>
            <Image source={back} styles={styles.imge_back} />
          </TouchableOpacity>
          <Text style={styles.text_header}>Thông tin qui định</Text>   
        </View>
       
        <View style={styles.body}>
            <Image source={regulation_header} style={styles.image_sofa}/>
            <Text style={styles.text_name}>Tỉ lệ giá bán</Text>
            <TextInput 
                style={[styles.name_input, styles.mt10]} 
                placeholderTextColor={'#555'}  
                placeholder="Tỉ lệ giá bán"
                value = {inputPrice}
                onChangeText={setPrice}
            />
            <Text style={styles.text_name}>Số lượng tồn tối thiểu</Text>
            <TextInput 
                multiline={true}
                style={[styles.name_input , styles.mt10]} 
                placeholderTextColor={'#555'}
                placeholder="Số lượng tồn"
                value = {inputStock}
                onChangeText={setStock}
            />
        </View>
        <TouchableOpacity style={styles.button1} onPress={update_regulation}>
          <Text style={styles.text_save}>Lưu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={reset}>
          <Text style={styles.text_reset}>Reset</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 830,
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'cover',
  },
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
    top: 45,
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
    left: 80,
    right: 0,
    top: 40,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 25,
    textAlign: 'center',
    color: '#0b2239',
  },
  button1: {
    position: 'absolute',
    width: 100,
    height: 100,
    right: -40,
    top: 40,
  },
  mt10: {
    marginTop: 20,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom:"100%",
    height: "75%",
  },
  name_input:{
    width: "90%",
    paddingVertical: 5,
    borderColor: '#00CC99',
    borderWidth: 2,
    paddingHorizontal: 12,
    borderRadius: 15,
    color: "#000000",
    fontSize: 20,
    backgroundColor: "#F6F7FB",
    
  },
  image_sofa:{
    bottom: 40,
  },
  button1:{
    position: 'absolute',
    width: '30%',
    height: 50,
    left: 50,
    top: 650,
    backgroundColor: '#0b2239',
    shadowColor: 'rgba(48, 48, 48, 0.3)',
    borderRadius: 8,
  },
  text_save: {
    position: 'absolute',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 37,
    color: 'white',
    left: 29,
  },
  button2:{
    position: 'absolute',
    width: '30%',
    height: 50,
    right: 50,
    top: 650,
    backgroundColor: '#0b2239',
    shadowColor: 'rgba(48, 48, 48, 0.3)',
    borderRadius: 8,
  },
  text_reset: {
    position: 'absolute',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 37,
    color: 'white',
    right: 29,
  },
  text_name:{
    width: "90%",
    color: "#0b2239",
    fontSize: 20,
    fontWeight: '600',
    top: 10,
    paddingHorizontal: 8,
  },
})