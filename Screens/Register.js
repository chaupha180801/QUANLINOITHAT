import React,{ useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity,TextInput,SafeAreaView,TouchableWithoutFeedback,Alert,ToastAndroid  } from 'react-native'
import login from '../Images/login.png'
import home from '../Images/home.png'
import header from '../Images/header.png'
import { openDatabase } from 'react-native-sqlite-storage'
var db = openDatabase({ name: 'QLCHNT.db' });

export default function SignUp({navigation}) {

  let [userName, setUserName] = useState('');
  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [userCofirmPassword, setConfirmPassword] = useState('');
  const register_user = () => {
    console.log(userName, userEmail, userPassword);
 
    if (!userName) {
      ToastAndroid.showWithGravity('Vui lòng nhập tên',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }
    if (!userEmail) {
      ToastAndroid.showWithGravity('Vui lòng nhập email',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }
    if (!userPassword) {
      ToastAndroid.showWithGravity('Vui lòng nhập mật khẩu',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }
    if (userPassword != userCofirmPassword) {
      ToastAndroid.showWithGravity('Mật khẩu xác nhận không khớp',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }
    
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO TAIKHOAN (TENNV, EMAIL, MATKHAU) VALUES (?,?,?)',
        [userName, userEmail, userPassword],      
        (tx, results) => {
          console.log('Results executeSql insert into tai khoan: ', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('Results insert success.', results.rowsAffected);
            Alert.alert(
                'Thành công',
                'Đăng ký tài khoản thành công',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Login'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Đăng kí tài khoản thất bại');
        }
      );
    });
  };
  return (
    <View style={styles.container}>
      <Image source={login} style={styles.image}/>
      <Image source={home} style={styles.home_image}/>
      <Image source={header} style={styles.home_header_right}/>
      <Image source={header} style={styles.home_header_left}/>
      <Text style={styles.heading}>
        WELCOME
      </Text>
      <SafeAreaView style={styles.signup}>
        <Text style={styles.name}>  
              Tên
          </Text>
          <TextInput
            style={styles.input_name}
            placeholder="Nhập tên"
            autoCapitalize="none"
            keyboardType="default"
            autoFocus={true}
            onChangeText={
              (userName) => setUserName(userName)
            }
          />
          <Text style={styles.email}>  
              Email
          </Text>
          <TextInput
            style={styles.input_email}
            placeholder="Nhập Email"
            autoCapitalize="none"
            keyboardType="email-address"
            autoFocus={true}
            onChangeText={
              (userEmail) => setUserEmail(userEmail)
            }
          /> 
          <Text style={styles.password}>
              Mật khẩu
          </Text>
          <TextInput
              style={styles.input_password}
              placeholder="Nhập mật khẩu"
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
          <Text style={styles.confirm_password}>
              Xác nhận mật khẩu
          </Text>
          <TextInput
              style={styles.input_confirm_password}
              placeholder="Nhập lại mật khẩu"
              autoCapitalize="none"
              secureTextEntry={true}
              keyboardType="default"
              returnKeyType="next"
              underlineColorAndroid="#f000"
              autoFocus={true}
              onChangeText={
                (userCofirmPassword) => setConfirmPassword(userCofirmPassword)
              }
          />
          <Text style={styles.text1}>
              Bạn đã có tài khoản?
          </Text>
          <TouchableOpacity style={styles.button_signup} onPress={register_user}>
            <Text style={styles.text_signup}>ĐĂNG KÝ</Text>
          </TouchableOpacity>
          <TouchableWithoutFeedback onPress={()=>{navigation.navigate('Login',{})}}>
            <Text style={styles.text_signin} >Đăng nhập</Text>
          </TouchableWithoutFeedback >

      </SafeAreaView>
     
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
      width: "100%",
      height: 830,
      position: 'relative',
      top: 0,
      left: 0,
      resizeMode: 'cover',
  },
  home_image: {
    position: 'absolute',
    width: 86,
    height: 85,
    left: 160,
    top: 50,
  },
  home_header_left: {
    position: 'absolute',
    width: 145,
    height: 1.5,
    left: 245,
    top: 105,
    backgroundColor: '#BDBDBD',
    borderRadius: 2,
  },
  home_header_right: {
    position: 'absolute',
    width: 145,
    height: 1.5,
    left: 15,
    top: 105,
    backgroundColor: '#BDBDBD',
    borderRadius: 2,
  },
  heading: {
    position: 'absolute',
    width: 150,
    height: 35,
    left: 30,
    top: 150, 
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: 0.05,
    color: '#303030',
  },
  signup: {
    position: 'absolute',
    width: 373,
    height: 550,
    left: 20,
    top: 200,
    backgroundColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.12,
    shadowRadius: 30,
    shadowColor: 'rgba(138, 149, 158, 0.2)',
    borderRadius: 0,
  },
  input_name: {
    backgroundColor: "#F6F7FB",
    width: 330,
    top: 50,
    height: 58,
    left: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 9,
  },
  name: {
    position: 'absolute',
    width: 60,
    height: 30,
    left: 20,
    top: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 19,
    color: 'black',
  },
  input_email: {
    backgroundColor: "#F6F7FB",
    width: 330,
    top: 95,
    height: 58,
    left: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 9,
  },
  email: {
    position: 'absolute',
    width: 60,
    height: 30,
    left: 20,
    top: 120,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 19,
    color: 'black',
  },
  input_password: {
    backgroundColor: "#F6F7FB",
    width: 330,
    top: 140,
    height: 58,
    left: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 9,
  },
  password: {
    position: 'absolute',
    width: 100,
    height: 30,
    left: 20,
    top: 220,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 19,
    color: 'black',
  },
  input_confirm_password: {
    backgroundColor: "#F6F7FB",
    width: 330,
    top: 185,
    height: 58,
    left: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 9,
  },
  confirm_password: {
    position: 'absolute',
    width: 200,
    height: 30,
    left: 20,
    top: 325,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 19,
    color: 'black',
  },
  button_signup: {
    position: 'absolute',
    width: '80%',
    height: 50,
    left: 35,
    top: 440,
    backgroundColor: '#00CC99',
    borderRadius: 4,
    shadowColor: 'rgba(48, 48, 48, 0.3)',
    borderRadius: 8,
  },
  text_signup: {
    position: 'absolute',
    left: 95,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 37,
    textAlign: 'justify',
    color: 'white',
  },
  text1: {
    position: 'absolute',
    width: 199,
    height: 25,
    left: 48,
    top: 500,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
    color: '#808080',
  },
  text_signin: {
    position: 'absolute',
    width: 199,
    height: 25,
    left: 185,
    top: 500,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
    color: 'black',
  },

})