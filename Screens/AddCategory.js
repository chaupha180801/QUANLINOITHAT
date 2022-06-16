import { StyleSheet, Text, View,TouchableOpacity,Image,TextInput,ToastAndroid,Alert} from 'react-native'
import React, {useState,useEffect} from 'react'
import back from '../Images/back.png'
import sofa from '../Images/sofa.png'
import { openDatabase } from 'react-native-sqlite-storage'
import login from '../Images/login.png'
var db = openDatabase({ name: 'QLCHNT.db' });

export default function AddCategory({route, navigation }) {
  const {username} = route.params;
  let [inputName, setName] = useState('');
  let [inputDesc, setDesc] = useState('');
  
  const reset = () => {
    setDesc('');
    setName('');
  }

  const add_category = () => {
    console.log(inputName, inputDesc);
 
    if (!inputName) {
      ToastAndroid.showWithGravity('Vui lòng nhập tên danh mục',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }
    if (!inputDesc) {
      ToastAndroid.showWithGravity('Vui lòng nhập mô tả cho doanh mục',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }
    
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO DANHMUC (TENDANHMUC, MOTA) VALUES (?,?)',
        [inputName, inputDesc],      
        (tx, results) => {
          console.log('Results executeSql insert into danh muc: ', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('Results insert success.', results.rowsAffected);
            Alert.alert(
                'Thành công',
                'Thêm danh mục thành công',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('ListCategory', {id:id,username: username}),
                },
              ],
              { cancelable: false }
            );
          } else {
            this.render();
            alert('Thêm danh mục không thành công');
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
          <Text style={styles.text_header}>Thêm danh mục</Text>   
        </View>
       
        <View style={styles.body}>
            <Image source={sofa} style={styles.image_sofa}/>
            <TextInput 
              style={[styles.name_input, styles.mt10]} 
              placeholderTextColor={'#555'}  
              placeholder="Tên danh mục"
              value = {inputName}
              onChangeText={setName}
            />
            <TextInput 
              multiline={true}
              style={[styles.name_input , styles.mt10]} 
              placeholderTextColor={'#555'}
              placeholder="Mô tả"
              value = {inputDesc}
              onChangeText={setDesc}
            />
        </View>
        <TouchableOpacity style={styles.button1} onPress={add_category}>
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
})