import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity,TextInput,SafeAreaView,TouchableWithoutFeedback,Alert,ToastAndroid} from 'react-native'
import login from '../Images/login.png'
import home from '../Images/home.png'
import header from '../Images/header.png'
import { setUserId, getUserId } from '../Context/User'
import { openDatabase } from 'react-native-sqlite-storage'
var db = openDatabase({ name: 'QLCHNT.db' });

export default function Login({navigation}) {
 
  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');

  login_home = () => {
    console.log(userEmail, userPassword);
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

    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM TAIKHOAN WHERE EMAIL = ?',
        [userEmail], (tx, results) => {
                var len = results.rows.length;
                if(len == 0) {
                  ToastAndroid.showWithGravity('Tài khoản không tồn tại',
                  ToastAndroid.SHORT,
                  ToastAndroid.CENTER
                  );
                } else {
                    var userpassword = results.rows.item(0).MATKHAU;
                    var username = results.rows.item(0).TENNV;
                    id = results.rows.item(0).MANV;
                    setUserId(results.rows.item(0).MANV);
                    console.log("Username: " + username);
                    console.log("Userid: " + getUserId());
                    if(userPassword == userpassword){
                        Alert.alert(
                            'Thông báo',
                            'Đăng nhập thành công',
                          [
                            {
                              text: 'Ok',
                              onPress: () => navigation.navigate('Home', {username: username,id: id}),
                            },
                          ],
                          { cancelable: false }
                        ); 
                    }else{
                      ToastAndroid.showWithGravity('Email hoặc mật khẩu không đúng.',
                      ToastAndroid.SHORT,
                      ToastAndroid.CENTER
                      );
                    }
                }
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
          Hello! 
      </Text>
      <Text style={styles.heading1}>
          WELCOMEBACK
      </Text>
      <SafeAreaView style={styles.login}>
        <Text style={styles.email}>  
            Email
        </Text>
        <TextInput
          style={styles.input}
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
            style={styles.inputPassword}
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
          <TouchableOpacity style={styles.button} onPress={login_home}>
            <Text style={styles.text4}>ĐĂNG NHẬP</Text>
          </TouchableOpacity>

          <TouchableWithoutFeedback >
            <Text style={styles.forgot_button}>Quên mật khẩu?</Text>
          </TouchableWithoutFeedback>
          
          <TouchableOpacity style={styles.buttonSignup} onPress={()=>{navigation.navigate('Register',{})}}>
            <Text style={styles.signup_button}>ĐĂNG KÝ</Text>
          </TouchableOpacity>
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
    width: 300,
    height: 120,
    left: 30,
    top: 145,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 30,
    lineHeight: 45,
    color: '#909090',
    
  },
  heading1: {
    position: 'absolute',
    width: 300,
    height: 120,
    left: 30,
    top: 205,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 30,
    lineHeight: 45,
    color: '#303030',
  },
  login: {
    position: 'absolute',
    width: 345,
    height: "50%",
    left: 32,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.12,
    shadowRadius: 30,
    shadowColor: 'rgba(138, 149, 158, 0.2)',
    borderRadius: 8,
    marginBottom: '60%',
    marginTop: '70%'

  },
  input: {
    backgroundColor: "#F6F7FB",
    width: 300,
    top: 60,
    height: 58,
    left: 24,
    fontSize: 16,
    borderRadius: 10,
    padding: 9,
  },
  email: {
    position: 'absolute',
    width: 50,
    height: 30,
    left: 25,
    top: 25,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 19,
    color: 'black',
  },
  password: {
    position: 'absolute',
    width: 100,
    height: 30,
    left: 25,
    top: 125,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 19,
    color: 'black',
  },
  inputPassword: {
    backgroundColor: "#F6F7FB",
    width: 300,
    top: 103,
    height: 58,
    left: 24,
    fontSize: 16,
    borderRadius: 10,
    padding: 9,  
  },
  signup_button: {
    position: 'absolute',
    left: 90,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 37,
    textAlign: 'justify',
    color: 'black',
  },
  button: {
    position: 'absolute',
    width: '80%',
    height: 50,
    left: 35,
    top: 240,
    backgroundColor: '#00CC99',
    borderRadius: 4,
    shadowColor: 'rgba(48, 48, 48, 0.3)',
    borderRadius: 8,
  },
  text4: {
    position: 'absolute',
    left: 79,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 37,
    textAlign: 'justify',
    color: 'white',
  },
  forgot_button: {
    position: 'absolute',
    width: 200,
    height: 30,
    left: 75,
    top: 370,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 25,
    textAlign: 'center',
    color: '#303030',
    borderRadius:25,
  },
  buttonSignup: {
    position: 'absolute',
    width: '80%',
    height: 50,
    left: 35,
    top: 310,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    shadowColor: 'rgba(48, 48, 48, 0.3)',
    borderRadius: 8,
  },
})