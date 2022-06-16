import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Button, Alert, ToastAndroid} from 'react-native'
import React, { useState} from 'react'
import back from '../Images/back.png'
import supplier1 from '../Images/supplier1.png'
import { RadioButton } from 'react-native-paper';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import calendar from '../Images/calendar.png'
import { openDatabase } from 'react-native-sqlite-storage'
var db = openDatabase({ name: 'QLCHNT.db' });
import login from '../Images/login.png'
export default function AddCustomer({route,navigation}) {
  const {id, name, email, sdt, diachi, gioitinh, ngaysinh, username} = route.params;
  let gender = String(gioitinh);
  let [value, setValue] = React.useState(gender);
  let [inputBirthday, setBirthDay] = useState(ngaysinh);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  let [inputEmail, setEmail] = useState(email);
  let [inputSdt, setSDT] = useState(sdt);
  let [inputAddress, setAddress] = useState(diachi);
  let [inputName, setName] = useState(name);

  const reset = () => {
    setEmail('');
    setName('');
    setSDT('');
    setAddress('');
    setBirthDay('');
    setValue('1');
  } 

  const update_customer = () => {
    console.log(name, diachi, value, sdt, ngaysinh, email);
    var current_year = new Date().getFullYear();
    var year = date.getFullYear();
    if (!name) {
      ToastAndroid.showWithGravity('Vui lòng nhập tên khách hàng',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }
    if (!email) {
      ToastAndroid.showWithGravity('Vui lòng nhập email khách hàng',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }
    if (!sdt) {
      ToastAndroid.showWithGravity('Vui lòng nhập số điện thoại',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }
    if (!diachi) {
      ToastAndroid.showWithGravity('Vui lòng nhập địa chỉ',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }

    if (!value) {
      ToastAndroid.showWithGravity('Vui lòng nhập chọn giới tính',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }
    if (!ngaysinh) {
      ToastAndroid.showWithGravity('Vui lòng nhập chọn ngày sinh',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }
    if((current_year - year) <=  18){
      ToastAndroid.showWithGravity('Khách hàng phải đủ 18 tuổi',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }
    db.transaction(function (tx) {
        tx.executeSql(
          'UPDATE KHACHHANG SET TENKH = ? , DIACHI = ?, SDT = ?, EMAIL = ?, NGAYSINH = ?, GIOITINH = ? WHERE MAKH = ?',
          [inputName, inputAddress, inputSdt, inputEmail, inputBirthday, value, id],      
          (tx, results) => {
            console.log('Results executeSql update into kh: ', results.rowsAffected);
            if (results.rowsAffected > 0) {
              console.log('Results update success.', results.rowsAffected);
              Alert.alert(
                  'Thành công',
                  'Cập nhật khách hàng thành công',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('ListCustomer', {id:id, username: username}),
                  },
                ],
                { cancelable: false }
              );
            } else alert('Cập nhật khách hàng không thành công');
          }
        );
      });
  };
  return (
    <View style={styles.container}>
        <Image source={login} style={styles.image}/>
       <View styles={styles.header}>
          <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('ListCustomer', {id:id,username:username })}}>
            <Image source={back} styles={styles.imge_back} />
          </TouchableOpacity>
          <Text style={styles.text_header}>Thông tin khách hàng</Text>   
        </View>
       
        <View style={styles.body}>
            <TextInput 
              multiline={true}
              style={[styles.name_input, styles.mt10]} 
              placeholderTextColor={'#555'}  
              placeholder="Tên khách hàng"
              value = {inputName}
              onChangeText={setName}
            />
            <TextInput 
              multiline={true} 
              style={[styles.name_input , styles.mt10]} 
              placeholderTextColor={'#555'}   
              placeholder="SĐT"
              value = {inputSdt}
              onChangeText={setSDT}
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
              style={[styles.name_input,styles.mt10]} 
              placeholderTextColor={'#555'}
              placeholder="Địa chỉ"
              value = {inputAddress}
              onChangeText={setAddress}             
            />

            <Text style={styles.gender}>Giới tính</Text>
            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
              <View style={styles.female_radio}>
                <Text style={styles.female}>Nữ</Text>
                <RadioButton value="0" />
              </View>
              <View style={styles.male_radio}>
                <Text style={styles.male}>Nam</Text>
                <RadioButton 
                value="1" 
              />
              </View>
            </RadioButton.Group>
            
            <TextInput
              multiline={true} 
              style={[styles.name_input2 , styles.mt10]} 
              placeholderTextColor={'#555'}   
              placeholder="Ngày sinh"
              editable={false}
              value = {inputBirthday}
              onChangeText={setBirthDay}
              
            />
            <TouchableOpacity style={styles.choose_date} title="Open" onPress={() => setOpen(true)} >
                <Image source={calendar} />
            </TouchableOpacity>
            <>
            <DatePicker
              modal
              mode="date"
              open={open}
              date={date}
              title="Chọn ngày"
              confirmText="Chọn"
              cancelText="Thoát"
             
              onConfirm={(date) => {
                setOpen(false)
                setDate(date)
                setBirthDay( moment(date).format('DD/MM/YYYY'))
              }}
              onCancel={() => {
                setOpen(false)
              }}
            />
            </>
        </View>
        <TouchableOpacity style={styles.button1} onPress={update_customer}>
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
  container: {
    backgroundColor : 'white'
  },
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
    color: '#303030',
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
    marginBottom:"130%",
    height: "80%",
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
  name_input1: {
    width: "90%",
    paddingVertical: 5,
    borderColor: '#00CC99',
    borderWidth: 2,
    paddingHorizontal: 12,
    borderRadius: 15,
    color: "#000000",
    fontSize: 20,
    bottom: 170,
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
    left: 40,
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
  gender: {
    width: "90%",
    color: "#555",
    fontSize: 20,
    fontWeight: '600',
    top: 13,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  female_radio:{
    width: "90%",
    color: "#555",
    fontSize: 20,
    fontWeight: '600',
    bottom:60,
    paddingVertical: 4,
    paddingHorizontal: 8,
    right: 30,
  },
  female: {
    top: 32,
    fontSize: 16,
    left: 50,
    color: "#000000",
  },
  male_radio: {
    width: "90%",
    color: "#555",
    fontSize: 20,
    fontWeight: '600',
    bottom: 133,
    paddingVertical: 4,
    paddingHorizontal: 8,
    left: 80,
  },
  male: {
    top: 32,
    fontSize: 16,
    left: 50,
    color: "#000000",
  },
  name_input2: {
    width: "90%",
    paddingVertical: 5,
    borderColor: '#00CC99',
    borderWidth: 2,
    paddingHorizontal: 12,
    borderRadius: 15,
    color: "#000000",
    fontSize: 20,
    bottom: 140,
    backgroundColor: "#F6F7FB",
  },
  choose_date: {
    bottom: 180,
    left: 150,
  }
 

})