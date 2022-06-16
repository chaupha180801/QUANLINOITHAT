import { StyleSheet, Text, View,TouchableOpacity,Image,TextInput,ToastAndroid,Alert} from 'react-native'
import React, {useState,useEffect} from 'react'
import back from '../Images/back.png'
import sofa from '../Images/sofa.png'
import { openDatabase } from 'react-native-sqlite-storage'
import login from '../Images/login.png'
import regulation_header from '../Images/regulation_header.png'
var db = openDatabase({ name: 'QLCHNT.db' });

export default function ResetPassword({route, navigation }) {
  const {id, username} = route.params;
  let [userNewPassword, setNewUserPassword] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [userCofirmNewPassword, setConfirmNewPassword] = useState('');
  
  const reset = () => {
    setNewUserPassword('');
    setUserPassword('');
    setConfirmNewPassword('');
  }
 const reset_password = () => {
    console.log(userNewPassword, userPassword, userCofirmNewPassword);
 
    if (!userNewPassword) {
      ToastAndroid.showWithGravity('Vui lòng nhập mật khẩu cũ',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }
    if (!userPassword) {
      ToastAndroid.showWithGravity('Vui lòng nhập mật khẩu mới',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }
    if (!userCofirmNewPassword) {
      ToastAndroid.showWithGravity('Vui lòng nhập mật khẩu',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }
    if (userNewPassword != userCofirmNewPassword) {
      ToastAndroid.showWithGravity('Mật khẩu xác nhận không khớp',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }
    
    db.transaction(function (tx) {
      tx.executeSql('SELECT * FROM TAIKHOAN WHERE MANV = ?',
      [id], (tx, results) => { 
        var userpassword = results.rows.item(0).MATKHAU;
        if(userpassword == userPassword){       
            tx.executeSql(
              'UPDATE TAIKHOAN SET MATKHAU = ?  WHERE MANV = ?',
              [userNewPassword, id],      
              (tx, results) => {
                if (results.rowsAffected > 0) {
                  console.log('Results update success.', results.rowsAffected);
                  Alert.alert(
                    'Thông báo',
                    'Cập nhật mật khẩu thành công',
                    [
                      {
                        text: 'Ok',
                          onPress: () => navigation.navigate('Login', {username: username,id: id}),
                      },
                    ],
                    { cancelable: false }
                  ); 
                } else alert('Cập nhật sản phẩm không thành công');
              }
            );
          }else{
            ToastAndroid.showWithGravity('Mật khẩu không đúng',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        }
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
          <Text style={styles.text_header}>Cập nhật mật khẩu</Text>   
        </View>
       
        <View style={styles.body}>
            <Text style={styles.text_name}>Mật khẩu cũ</Text>
            <TextInput 
              style={[styles.name_input, styles.mt10]} 
              placeholder="Nhập mật khẩu cũ"
              placeholderTextColor={'#555'}
              autoCapitalize="none"
              secureTextEntry={true}
              keyboardType="default"
              returnKeyType="next"
              underlineColorAndroid="#f000"
              autoFocus={true}
              onChangeText={
                (userPassword) => setUserPassword(userPassword)
              }
            />
            <Text style={styles.text_name}>Mật khẩu mới</Text>
            <TextInput 
              style={[styles.name_input, styles.mt10]} 
              placeholder="Nhập mật khẩu mới"
              placeholderTextColor={'#555'}
              autoCapitalize="none"
              secureTextEntry={true}
              keyboardType="default"
              returnKeyType="next"
              underlineColorAndroid="#f000"
              autoFocus={true}
              onChangeText={
                (userNewPassword) => setNewUserPassword(userNewPassword)
              }
            />
            <Text style={styles.text_name}>Xác nhận mật khẩu</Text>
            <TextInput 
              style={[styles.name_input, styles.mt10]} 
              placeholder="Nhập lại mật khẩu mới"
              placeholderTextColor={'#555'}
              autoCapitalize="none"
              secureTextEntry={true}
              keyboardType="default"
              returnKeyType="next"
              underlineColorAndroid="#f000"
              autoFocus={true}
              onChangeText={
                (userCofirmNewPassword) => setConfirmNewPassword(userCofirmNewPassword)
              }
            />
        </View>
        <TouchableOpacity style={styles.button1} onPress={reset_password}>
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