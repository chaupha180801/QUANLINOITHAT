import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import back from '../Images/back.png'
import login from '../Images/login.png'
import { openDatabase } from 'react-native-sqlite-storage'
var db = openDatabase({ name: 'QLCHNT.db' });
export default function UpdateAcount({route,navigation}) {
    const {id, name, email, address, sdt} = route.params;
    let [inputName, setName] = useState(name);
    let [inputAddress, setAddress] = useState(address);
    let [inputEmail, setEmail] = useState(email);
    let [inputContact, setContact] = useState(sdt);
    const update_acount = () => {
        console.log(inputName, inputAddress, inputEmail, inputContact);
        if (!inputName) {
          ToastAndroid.showWithGravity('Vui lòng nhập tên tài khoản',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
          );
          return;
        }
        if (!inputEmail) {
          ToastAndroid.showWithGravity('Vui lòng nhập email',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
          );
          return;
        }
        if (!inputContact) {
          ToastAndroid.showWithGravity('Vui lòng nhập số điện thoại',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
          );
          return;
        }
        if (!inputAddress) {
          ToastAndroid.showWithGravity('Vui lòng nhập địa chỉ ',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
          );
          return;
        }
        
        db.transaction(function (tx) {
          tx.executeSql(
            'UPDATE TAIKHOAN SET TENNV = ? , DIACHI = ?, SDT = ?, EMAIL = ? WHERE MANV = ?',
            [inputName, inputAddress, inputContact, inputEmail, id],      
            (tx, results) => {
              console.log('Results executeSql update into TK: ', results.rowsAffected);
              if (results.rowsAffected > 0) {
                console.log('Results update success.', results.rowsAffected);
                Alert.alert(
                    'Thành công',
                    'Cập nhật tài khoản thành công',
                  [
                    {
                      text: 'Ok',
                      onPress: () => navigation.navigate('Acount', {id:id,username: inputName}),
                    },
                  ],
                  { cancelable: false }
                );
              } else alert('Cập nhật tài khoản không thành công');
            }
          );
        });
      };
  return (
    <View>
        <Image source={login} style={styles.image}/>
       <View styles={styles.header}>
       <TouchableOpacity style={styles.button}  onPress={()=>{navigation.navigate('Acount', {id:id,username: inputName})}}>
            <Image source={back} styles={styles.imge_back} />
          </TouchableOpacity>
          <Text style={styles.text_header}>Cập nhật tài khoản</Text>   
        </View>
        <View style={styles.body}>  
            <Text style={styles.text_name}>Tên tài khoản</Text>
            <TextInput  
              multiline={true} 
              style={[styles.name_input, styles.mt10]} 
              placeholderTextColor={'#555'}  
              placeholder="Tên tài khoản"
              value = {inputName}
              onChangeText={setName}
              />
            <Text style={styles.text_name}>Email</Text>
            <TextInput  
              multiline={true} 
              style={[styles.name_input , styles.mt10]}
              placeholderTextColor={'#555'}
              placeholder="Email"
              keyboardType="email-address"
              value = {inputEmail}
              onChangeText={setEmail}
            />
            <Text style={styles.text_name}>SDT</Text>
            <TextInput 
              multiline={true} 
              style={[styles.name_input , styles.mt10]} 
              placeholderTextColor={'#555'}  
              placeholder="SDT"
              keyboardType="phone-pad"
              value = {inputContact}
              onChangeText={setContact}
            />
            <Text style={styles.text_name}>Địa chỉ</Text>
            <TextInput  
              multiline={true} 
              style={[styles.name_input , styles.mt10]} 
              placeholderTextColor={'#555'}   
              placeholder="Địa chỉ"
              value = {inputAddress}
              onChangeText={setAddress}
            />

        </View>
        <TouchableOpacity style={styles.button1} onPress={update_acount}>
          <Text style={styles.text_save}>Lưu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} >
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
    backgroundColor: 'white',
    marginBottom:"80%",
    height: "85%",
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
    marginBottom:"80%",
    height: "85%",
  },
  text_header:{
    position: 'absolute',
    width: "100%",
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
    marginTop:"40%",
    height: "65%",
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
  text_name:{
    width: "90%",
    color: "#0b2239",
    fontSize: 20,
    fontWeight: '600',
    top: 10,
    paddingHorizontal: 8,
  },
  text_id:{
    color: "#00CC99",
    fontSize: 22,
    fontWeight: 'bold',
    bottom:20,
  },
  image_sofa:{
    bottom: 20,
  },
  button1:{
    position: 'absolute',
    width: '30%',
    height: 50,
    left: 50,
    top: 690,
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
    left: 40,
  },
  button2:{
    position: 'absolute',
    width: '30%',
    height: 50,
    right: 50,
    top: 690,
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