import { StyleSheet, Text, View,TouchableOpacity,Image,TextInput,Alert } from 'react-native'
import React, {useEffect,useState} from 'react'
import back from '../Images/back.png'
import supplier1 from '../Images/supplier1.png'
import { openDatabase } from 'react-native-sqlite-storage'
var db = openDatabase({ name: 'QLCHNT.db' });
import login from '../Images/login.png'
export default function AddSupplier({route, navigation}) {
  const {id,username} = route.params;
  let [inputName, setName] = useState('');
  let [inputEmail, setEmail] = useState('');
  let [inputSDT, setSDT] = useState('');
  let [inputAddress, setAddress] = useState('');
  const reset = () => {
    setEmail('');
    setName('');
    setSDT('');
    setAddress('');
  }

  const add_supplier = () => {
    console.log(inputName, inputAddress, inputEmail, inputSDT);
    if (!inputName) {
      ToastAndroid.showWithGravity('Vui lòng nhập tên nhà cung cấp',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }
    if (!inputEmail) {
      ToastAndroid.showWithGravity('Vui lòng nhập email nhà cung cấp',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }
    if (!inputSDT) {
      ToastAndroid.showWithGravity('Vui lòng nhập số điện thoại',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }
    if (!inputAddress) {
      ToastAndroid.showWithGravity('Vui lòng nhập địa chỉ nhà cung cấp',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }
    
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO NHACUNGCAP (TENNCC, DIACHI,SDT, EMAIL) VALUES (?,?,?,?)',
        [inputName, inputAddress, inputSDT, inputEmail],      
        (tx, results) => {
          console.log('Results executeSql insert into ncc: ', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('Results insert success.', results.rowsAffected);
            Alert.alert(
                'Thành công',
                'Thêm nhà cung cấp thành công',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('ListSupplier', {id:id,username: username}),
                },
              ],
              { cancelable: false }
            );
          } else alert('Thêm nhà cung cấp không thành công');
        }
      );
    });
  };
  return (
    <View>
       <Image source={login} style={styles.image}/>
       <View styles={styles.header}>
          <TouchableOpacity style={styles.button} onPress={()=>{navigation.goBack()}}>
            <Image source={back} styles={styles.imge_back} />
          </TouchableOpacity>
          <Text style={styles.text_header}>Thêm nhà cung cấp</Text>   
        </View>
       
        <View style={styles.body}>
            <Image source={supplier1} style={styles.image_supplier}/>
            <TextInput  
              multiline={true} 
              style={[styles.name_input, styles.mt10]} 
              placeholderTextColor={'#555'}  
              placeholder="Tên nhà cung cấp"
              value = {inputName}
              onChangeText={setName}             
            />

            <TextInput  
              multiline={true} 
              style={[styles.name_input , styles.mt10]}
              placeholderTextColor={'#555'}
              placeholder="Email"
              keyboardType="email-address"
              value = {inputEmail}
              onChangeText={setEmail}
            />

            <TextInput 
              multiline={true} 
              style={[styles.name_input , styles.mt10]} 
              placeholderTextColor={'#555'}  
              placeholder="SDT"
              keyboardType="phone-pad"
              value = {inputSDT}
              onChangeText={setSDT}
            />
            <TextInput  
              multiline={true} 
              style={[styles.name_input , styles.mt10]} 
              placeholderTextColor={'#555'}   
              placeholder="Địa chỉ"
              value = {inputAddress}
              onChangeText={setAddress}
            />
        </View>
        <TouchableOpacity style={styles.button1} onPress={add_supplier}>
          <Text style={styles.text_save}>Thêm</Text>
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
  image_supplier:{
    bottom: 15,
  },
  button1:{
    position: 'absolute',
    width: '30%',
    height: 50,
    left: 50,
    top: 700,
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
    top: 700,
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
})