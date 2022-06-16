import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Alert, Platform,
    PermissionsAndroid, ToastAndroid } from 'react-native'
import {
    launchCamera,
    launchImageLibrary
  } from 'react-native-image-picker';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import React, {useEffect,useState} from 'react'
import back from '../Images/back.png'
import supplier1 from '../Images/supplier1.png'
import login from '../Images/login.png'
import { openDatabase } from 'react-native-sqlite-storage'
var db = openDatabase({ name: 'QLCHNT.db' });
const data = [
  {label: 'Màu đỏ', value: 'Màu đỏ'},
  {label: 'Màu vàng', value: 'Màu vàng'},
  {label: 'Màu trắng', value: 'Màu trắng'},
  {label: 'Màu nâu', value: 'Màu nâu'},
  {label: 'Màu đen', value: 'Màu đen'},
  {label: 'Màu tím', value: 'Màu tím'},
  {label: 'Màu xanh', value: 'Màu xanh'},
  {label: 'Màu be', value: 'Màu be'},
];

export default function AddProduct({route, navigation}) {
    const {id,username} = route.params;
    const [filePath, setFilePath] = useState({});
    const [dropdown, setDropdown] = useState(null);
    const [dropdown_color, setDropdownColor] = useState(null);
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const reset = () => {
      setDesc('');
      setName('');
      setFilePath({});
      setDropdown(null);
      setDropdown(null);
    }
    const _renderItem = item => {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>      
        </View>
      );
    };
    useEffect(() => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM DANHMUC',
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push({label: results.rows.item(i).TENDANHMUC, value: results.rows.item(i).MADANHMUC});
            setItems(temp);
          }
        );
      });
    });
  const _renderItem_color = item => {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>      
        </View>
      );
  };
  const requestCameraPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs camera permission',
            },
          );
          // If CAMERA Permission is granted
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          console.warn(err);
          return false;
        }
      } else return true;
  };
   
  const requestExternalWritePermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'External Storage Write Permission',
              message: 'App needs write permission',
            },
          );
          // If WRITE_EXTERNAL_STORAGE Permission is granted
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          console.warn(err);
          alert('Write permission err', err);
        }
        return false;
      } else return true;
  };
   
  const captureImage = async (type) => {
      let options = {
        mediaType: type,
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
        videoQuality: 'low',
        durationLimit: 30, //Video max duration in seconds
        saveToPhotos: true,
      };
      let isCameraPermitted = await requestCameraPermission();
      let isStoragePermitted = await requestExternalWritePermission();
      if (isCameraPermitted && isStoragePermitted) {
        launchCamera(options, (response) => {
          console.log('Response = ', response);
          if (response.didCancel) {
            alert('User cancelled camera picker');
            return;
          } else if (response.errorCode == 'camera_unavailable') {
            alert('Camera not available on device');
            return;
          } else if (response.errorCode == 'permission') {
            alert('Permission not satisfied');
            return;
          } else if (response.errorCode == 'others') {
            alert(response.errorMessage);
            return;
          }
          setFilePath(response.assets[0]);
        });
      }
  };
   
  const chooseFile = (type) => {
      let options = {
        mediaType: type,
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
      };
      launchImageLibrary(options, (response) => {
        console.log('Response = ', response);
  
        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        setFilePath(response.assets[0]);
      });
  };
  
  const add_product = () => {
    console.log(filePath, name, dropdown, dropdown_color,desc);
    if (!name) {
      ToastAndroid.showWithGravity('Vui lòng nhập tên sản phẩm',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }
    if (!filePath) {
      ToastAndroid.showWithGravity('Vui lòng chọn ảnh sản phẩm',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }
    if (!dropdown) {
      ToastAndroid.showWithGravity('Vui lòng chọn danh mục sản phẩm',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }
    if (!dropdown_color) {
      ToastAndroid.showWithGravity('Vui lòng chọn màu sản phẩm',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }

    if (!desc) {
      ToastAndroid.showWithGravity('Vui lòng nhập mô tả sản phẩm',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }
    
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO SANPHAM (TENSP, MAU, HINHANH, GIABAN, SOLUONG, MOTA,MADANHMUC) VALUES (?,?,?,?,?,?,?)',
        [name, dropdown_color, JSON.stringify(filePath), 0, 0, desc, dropdown],      
        (tx, results) => {
          console.log('Results executeSql insert into sp: ', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('Results insert success.', results.rowsAffected);
            Alert.alert(
                'Thành công',
                'Thêm sản phẩm thành công',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('ListProduct', {id: id,username: username}),
                },
              ],
              { cancelable: false }
            );
          } else alert('Thêm sản phẩm không thành công');
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
            <Text style={styles.text_header}>Thêm sản phẩm</Text>   
          </View>
         
          <View style={styles.body}>
            <Image
             source={{uri: filePath.uri}}
             style={styles.imageStyle}
            />
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => captureImage('photo')}>
              <Text style={styles.textStyle}>
                Chụp ảnh
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle1}
              onPress={() => chooseFile('photo')}>
              <Text style={styles.textStyle}>Chọn ảnh</Text>
            </TouchableOpacity>
              <TextInput  
                multiline={true} 
                style={[styles.name_input, styles.mt10]} 
                placeholderTextColor={'#555'}  
                placeholder="Tên sản phẩm"
                value = {name}
                onChangeText={setName}  
              />           
              <Dropdown
                style={[styles.dropdown , styles.mt10]} 
                data={items}
                search
                searchPlaceholder="Tìm kiếm danh mục"
                labelField="label"     
                valueField="value"
                label="Dropdown"
                placeholderStyle={{
                  color: "#555",
                  fontSize: 20,
                }}
                placeholder="Chọn danh mục"
                value={dropdown}
                onChange={item => {
                  setDropdown(item.value);
                    console.log('selected', item);
                  }}
                selectedTextStyle={{
                  color: "#000000",
                  fontSize: 20,
                }}
                renderItem={item => _renderItem(item)}
                textError="Error"
              />
              <Dropdown
                style={[styles.dropdown , styles.mt10]} 
                containerStyle={styles.shadow}
                data={data}
                search
                searchPlaceholder="Tìm kiếm màu"
                labelField="label"
                labelStyle={{
                  color: "#000000",
                  fontSize: 20,
                }}
                valueField="value"
                label="Dropdown"
                placeholderStyle={{
                  color: "#555",
                  fontSize: 20,
                }}
                placeholder="Chọn màu sản phẩm"        
                value={dropdown_color}
                onChange={item => {
                  setDropdownColor(item.value);
                    console.log('selected', item);
                }}
                selectedTextStyle={{
                  color: "#000000",
                  fontSize: 20,
                }}
                renderItem={item => _renderItem_color(item)}
                textError="Error"
              />
              <TextInput  
                multiline={true} 
                style={[styles.name_input , styles.mt10]} 
                placeholderTextColor={'#555'}   
                placeholder="Mô tả"
                value = {desc}
                onChangeText={setDesc}               
              />
          </View>
          <TouchableOpacity style={styles.button1} onPress={add_product}>
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
    button1:{
      position: 'absolute',
      width: '30%',
      height: 50,
      left: 50,
      top: 720,
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
      top: 720,
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
    buttonStyle: {
      backgroundColor: '#F6F7FB',
      padding: 5,
      width: 90,
      left: -70,
      color: "#000000",
      borderRadius: 8,
      top: 40,
    },
    buttonStyle1: {
      backgroundColor: '#F6F7FB',
      padding: 5,
      width: 90,
      left: 70,
      color: "#000000",
      borderRadius: 8,
      bottom: 35,
      top: 5,
    },
    imageStyle: {
      width: 120,
      height: 120,
    },
    textStyle: {
      color: 'black',
      textAlign: 'center',   
    },
    dropdown: {
      width: "90%",
      paddingVertical: 5,
      borderColor: '#00CC99',
      borderWidth: 2,
      paddingHorizontal: 12,
      borderRadius: 15,
      backgroundColor: "#F6F7FB",
      color: '##000000',
      fontSize: 20,
    },
    icon: {
      marginRight: 5,
      width: 18,
      height: 18,       
    },
    item: {
      paddingVertical: 17,
      paddingHorizontal: 4,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      fontSize: 20,
      color: '#000000',
    },
  })