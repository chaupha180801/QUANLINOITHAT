import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Button, TouchableWithoutFeedback, Alert } from 'react-native'
import React, { useState,useEffect} from 'react'
import back from '../Images/back.png'
import email from '../Images/email.png'
import phone_call from '../Images/phone_call.png'
import location from '../Images/location.png'
import user_icon from '../Images/user_icon.png'
import exchange from '../Images/exchange.png'
import power from '../Images/power.png'
import { setUserId, getUserId } from '../Context/User'
import { openDatabase } from 'react-native-sqlite-storage'
var db = openDatabase({ name: 'QLCHNT.db' });

export default function AddCustomer({route,navigation}) {
  const {id, username} = route.params;
  let [userName, setName] = useState(username)
  let [password, setUserPassword] = useState('');
  let [userContact, setUserContact] = useState('');
  let [userId, setUserId] = useState(id);
  let [userAddress, setUserAddress] = useState('');
  let [userEmail, setUserEmail] = useState('');
  let data_acount = (contact, address, email, name) => {
    setUserContact(contact);
    setUserAddress(address);
    setUserEmail(email);
    setName(name);
  };

  
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM TAIKHOAN WHERE MANV = ?',[userId],
        (tx, results) => {
            var len = results.rows.length;
            if (len > 0) {
                let res = results.rows.item(0);
                data_acount(
                    res.SDT,
                    res.DIACHI,
                    res.EMAIL,
                    res.TENNV,
                );
            } else {     
                alert('No user found');
                data_acount('', '', '');
          }
        }
      );
    });
  });

  const logout = () => {
    Alert.alert(
      "Đăng xuất",
      "Bạn có chắc muốn kết thúc phiên đăng nhập này không?",
      [
        {
            text: "Đóng",
        },
        {
          text: "Đồng ý",
          onPress: () => navigation.navigate('Login'),
        }
        
      ]
    );
  };

  return (
    <View style={styles.container}>
       <View styles={styles.header}>
          <TouchableOpacity style={styles.button}  onPress={() =>{navigation.navigate('Home', 
                        { username: userName, id: userId})}}>
            <Image source={back} styles={styles.imge_back} />
          </TouchableOpacity>
          <Text style={styles.text_header}>Thông tin tài khoản</Text>   
        </View>
       
        <View style={styles.body}>
          <Image source={user_icon}  style={styles.image_user}/>
          <Text style={styles.text_name}> {userName} </Text>
          <View>
            <Text style={styles.information_text}> Thông tin liên hệ </Text>
            <TouchableWithoutFeedback onPress={()=>{navigation.navigate('UpdateAcount', 
                        {email: userEmail, name: userName, sdt: userContact, id: userId, address:userAddress})}} >
              <Text style={styles.update_button}>Chỉnh sửa</Text>
            </TouchableWithoutFeedback>
            <View style={styles.view_name}>
              <View style={styles.view_email}>
                <Image source={email}  />
                <Text style={styles.text_email}> Email:</Text>
                <Text style={styles.text_inputemail}>{userEmail}</Text>
              </View>
              <View style={styles.view_phone}>
                <Image source={phone_call} />
                <Text style={styles.text_email}> SĐT:</Text>
                <Text style={styles.text_inputphone}>{userContact}</Text>
              </View>
              <View style={styles.view_address}>
                <Image source={location} />
                <Text style={styles.text_email}> Địa chỉ:</Text>
                <Text style={styles.text_inputaddress}>{userAddress}</Text>
              </View>  
              <TouchableOpacity style={styles.button_reset} onPress={() =>{navigation.navigate('ResetPassword', 
                        { username: userName, id: userId})}}>
                  <Image source={exchange}/>
                  <Text style={styles.text4}>Đổi mật khẩu</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button_logout} onPress={logout}>
                  <Image source={power}/>
                  <Text style={styles.text4}>Đăng xuất</Text>
              </TouchableOpacity>
            </View>
          </View>
            
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
  information_text: {
    marginTop : '70%',
    fontSize: 19,
    fontWeight: 'bold',
    color: '#303030' ,
  },
  view_name: {
    position: 'absolute',
    marginTop: '80%',
    borderWidth: 2,
    borderColor:'white',
    width:'100%',
    height: 70,
    backgroundColor: '#ffffff',
    height: 230,
   
  },
  view_email:{
    marginHorizontal: 10,
    marginTop: '7%',
  },
  text_email: {
    marginLeft: '10%',
    top: -27,
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
  },
  text_inputemail: {
    marginLeft: '27%',
    bottom: 56,
    color: 'black',
    fontSize: 16,
  },
  view_phone: {
    marginHorizontal: 10,
    top: -40,
  },
  text_inputphone: {
    marginLeft: '25%',
    bottom: 56,
    color: 'black',
    fontSize: 16,
  },
  view_address: {
    marginHorizontal: 10,
    top: -80,
  },
  text_inputaddress:{
    marginLeft: '30%',
    bottom: 56,
    color: 'black',
    fontSize: 16,
  },
  update_button: {
    bottom: 30,
    left: 320,
    color: 'black',
    fontWeight: 'bold',
    fontStyle: 'italic',
    textDecorationLine: 'underline'
  },
  button_reset:{
    position: 'absolute',
    top: 320,
    width:'100%',
    height: 60,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 4,
    shadowColor: 'rgba(48, 48, 48, 0.3)',
  },
  button_logout: {
    position: 'absolute',
    top: 390,
    width:'100%',
    height: 60,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 4,
    shadowColor: 'rgba(48, 48, 48, 0.3)',
  },
  image_user: {
    position: 'absolute',
    left: 152,
    top: 100, 
  },
  text_name: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 210,
    marginLeft: '18%',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  text4: {
    fontSize: 18,
    color: 'black',
    left: 50,
    bottom: 30,
    fontWeight: 'bold'
  },

})