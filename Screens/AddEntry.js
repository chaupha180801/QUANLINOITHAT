import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, SafeAreaView, StatusBar, Modal,
  TouchableWithoutFeedback,  Animated, TextInput, ToastAndroid,FlatList,PermissionsAndroid,ImageList, Alert } from 'react-native'
import React,{useState,useEffect} from 'react'
import moment from 'moment';
import back from '../Images/back.png'
import search from '../Images/search.png'
import filter from '../Images/filter.png'
import remove from '../Images/remove.png'
import bell from '../Images/bell.png'
import user1 from '../Images/user1.png'
import house from '../Images/house.png'
import receipt from '../Images/receipt.png'
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import image_demo from '../Images/image_demo.png';
import sub from "../Images/sub.png";
import plus from "../Images/plus.png"
import delete_modal from "../Images/delete_modal.png"
import { openDatabase } from 'react-native-sqlite-storage'
var db = openDatabase({ name: 'QLCHNT.db' });
import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';
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

const ModalPoup = ({visible, children}) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};
export default function AddEntry({ route, navigation}) {
  const {id, username} = route.params;
  const [dropdown, setDropdown] = useState(null);
  const [visible, setVisible] = React.useState(false);
  const [list_supplier, setListSu] = useState([]);
  const [list_product, setListPro] = useState([]);
  let [choose_supplier, setChooseSu] = useState(null);
  let [choose_product, setChoosePro] = useState(null);
  let [stock_max, setStockMax] = useState('');
  let [import_price, setImportPrice] = useState('');
  let [import_number, setImportNumber] = useState('');
  let [list, setList] = useState([]);
  let [empty, setEmpty] = useState([]);
  let [filePath, setFilePath] = useState('');
  let [name_product, setNameProduct] = useState('');
  let [total, setTotal] = useState('');
  let [tile, setTiLe] = useState('');
  let [soluong, setSL] = useState('');
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM NHACUNGCAP',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push({label: results.rows.item(i).TENNCC, value: results.rows.item(i).MANCC});
          setListSu(temp);
        }
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM QUIDINH',
        [],
        (tx, results) => {
          setStockMax(results.rows.item(0).SOLUONGTOITHIEUNHAP);
          setTiLe(results.rows.item(0).TILEGIA);
        }
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM SANPHAM',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push({label: results.rows.item(i).TENSP, value: results.rows.item(i).MASP});
          setListPro(temp);
        }
      );
    });
    
          
  },[]);
  const _renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>      
      </View>
    );
  };

  const save_product  = () => {
    if (!choose_product) {
      ToastAndroid.showWithGravity('Vui lòng chọn sách cần nhập',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }
    
    if (!import_number) {
      ToastAndroid.showWithGravity('Vui lòng nhập số lượng nhập',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }

    if (!import_number) {
      ToastAndroid.showWithGravity('Vui lòng nhập số lượng nhập',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }
    
    if (!import_price) {
      ToastAndroid.showWithGravity('Vui lòng nhập giá nhập sách',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }  
   
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM SANPHAM WHERE MASP = ?',
        [choose_product],
        (tx, results) => {
          console.log(stock_max);
          if(parseInt(results.rows.item(0).SOLUONG) <= stock_max){
            name_product = results.rows.item(0).TENSP;
            filePath = JSON.parse(results.rows.item(0).HINHANH).uri;
            soluong = results.rows.item(0).SOLUONG;
            setSL(soluong);
            setFilePath(filePath);
            setNameProduct(name_product);
            list.push({masanpham: choose_product, tensp: name_product, gianhap: import_price, soluongnhap: import_number, anh: filePath, soluongcu: soluong});
            console.log(list);
            setChoosePro(null);
            setImportPrice('');
            setImportNumber('');
            total_price();
            setVisible(false);
          } 
          else {
              ToastAndroid.showWithGravity('Số lượng tồn sản phẩm vượt quá mức qui định nhập',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
          }
        }    
      );
    });
  }

  const listViewItemSeparator = () => {
    return (
      <ScrollView>
       </ScrollView>
    );
  };

  const remove_product = (id) => {
    console.log(id);
    Alert.alert(
      "Thông báo",
      "Bạn có chắc muốn xóa sản phẩm này?",
      [
        {
          text: "Đồng ý",
          onPress: () => {
            for(var i = 0; i < list.length; i++){
              if(list[i].masanpham == id){
                 setList(list.filter(item => item.masanpham !== id));
              }
            }    
            list.pop(id);
            total_price();
          },
        
        },
        {
          text: "Không đồng ý",
        },
      ]
    );
    
  }

  const total_price = () =>{
    var sum = 0;
    for(var i = 0; i < list.length; i++){
      sum = sum + ( parseInt(list[i].soluongnhap) *  parseFloat(list[i].gianhap));       
    }
    setTotal(sum.toString());
   
  }

  const plus_number_product = (id) => {
    for(var i = 0; i < list.length; i++){
      if(list[i].masanpham == id){
        list[i].soluongnhap = (parseInt(list[i].soluongnhap) + 1).toString();       
      }
    }
    total_price();
  }

  const sub_number_product = (id) => {
    for(var i = 0; i < list.length; i++){
      if(list[i].masanpham == id){
        list[i].soluongnhap = (parseInt(list[i].soluongnhap) - 1).toString();       
      }
    }
    total_price();
  }

  const add_entry = () => {
    if (!choose_supplier) {
      ToastAndroid.showWithGravity('Vui lòng chọn nhà cung cấp',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
      );
      return;
    }
    var ngay_nhap = moment(new Date()).format('YYYY-MM-DD');
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO PHIEUNHAPHANG (MANV, NGAYNHAP, THANHTIEN, MANCC, SOLUONGSP) VALUES (?,?,?,?,?)',
        [id, ngay_nhap, total, choose_supplier, list.length],      
        (tx, results) => {
          if (results.rowsAffected > 0) {
            var curr_id = results.insertId;
            console.log(curr_id);
            for(var i = 0; i < list.length; i++){
              tx.executeSql(
                'INSERT INTO CHITIETPHIEUNHAPHANG (MAPN, MASP, TENSP, SOLUONG, GIANHAP, ANH) VALUES (?,?,?,?,?,?)',
                [curr_id, list[i].masanpham, list[i].tensp, list[i].soluongnhap, list[i].gianhap, JSON.stringify(list[i].anh)]);
                tx.executeSql('UPDATE SANPHAM SET SOLUONG = ? , GIABAN = ? WHERE MASP = ?',
                [(parseInt(list[i].soluongnhap) + parseInt(list[i].soluongcu)).toString(), (list[i].gianhap * tile), list[i].masanpham]);    
            }   
            Alert.alert(
              'Thành công',
              'Thêm phiếu nhập thành công',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('ListEntry', {id: id,username: username}),
                },
              ],
              { cancelable: false }
            ); 
          } else alert('Thêm chi tiết thành công không thành công');
        }
      );
    });
  };
  return (
        <View>
          <ModalPoup visible={visible} >
            <View style={{alignItems: 'center'}}>
              <View style={styles.header}>
                <TouchableOpacity onPress={() => setVisible(false)}>
                  <Image
                    source={delete_modal}
                    style={{height: 30, width: 30}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{alignItems: 'center',height: 400,}}>
              <Text style={styles.text_product}>Chọn sản phẩm</Text>
              <Dropdown
                style={[styles.dropdown1 , styles.mt10]} 
                containerStyle={styles.shadow}
                data={list_product}
                search
                searchPlaceholder="Tìm kiếm sản phẩm"
                labelField="label"          
                valueField="value"
                label="Dropdown"
                placeholderStyle={{
                  color: "#555",
                  fontSize: 20,
                }}
                placeholder="Chọn sản phẩm"
                value={choose_product}
                onChange={item => {
                  setChoosePro(item.value);
                  console.log('selected', item);
                }}
                selectedTextStyle={{
                  color: "#000000",
                  fontSize: 20,
                }}
                renderItem={item => _renderItem(item)}
                textError="Error"
              />
              <TextInput 
                multiline={true} 
                style={[styles.name_input , styles.mt10]} 
                placeholderTextColor={'#555'}   
                placeholder="Số lượng"
                keyboardType="numeric"
                value = {import_number}
                onChangeText={setImportNumber}
              />
              <TextInput 
                multiline={true} 
                style={[styles.name_input1 , styles.mt10]} 
                placeholderTextColor={'#555'}   
                placeholder="Giá nhập"
                keyboardType="numeric"
                value = {import_price}
                onChangeText={setImportPrice}
              />
            </View>
            <TouchableOpacity style={styles.button6} onPress={() => {save_product()}}>
               <Text style={styles.text2}>Lưu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button7} onPress={() => setVisible(false)}>
               <Text style={styles.text2}>Hủy</Text>
            </TouchableOpacity>
           
          </ModalPoup>
          <View styles={styles.header}>
              <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                  <Image source={back} styles={styles.imge_back} />
              </TouchableOpacity>
              <Text style={styles.text_header}>Thêm chi tiết phiếu nhập</Text>
          </View>
          <Dropdown
            style={[styles.dropdown , styles.mt10]} 
            containerStyle={styles.shadow}
            data={list_supplier}
            search
            searchPlaceholder="Tìm kiếm nhà cung cấp"
            labelField="label"          
            valueField="value"
            label="Dropdown"
            placeholderStyle={{
              color: "#555",
              fontSize: 20,
            }}
            placeholder="Chọn nhà cung cấp"
            value={choose_supplier}
            onChange={item => {
              setChooseSu(item.value);
              console.log('selected', item);
            }}   
            renderItem={item => _renderItem(item)}
            selectedTextStyle={{
              color: "#000000",
              fontSize: 20,
            }}
            textError="Error"
          />
          <TouchableOpacity style={styles.button2} onPress={() => setVisible(true)}>
             <Text style={styles.text2}>+ Thêm sản phẩm </Text>
          </TouchableOpacity>
          <SafeAreaView style={{marginHorizontal: 10,height: 450,top: 80,}}>
              <FlatList
                  data={list}
                  ItemSeparatorComponent={listViewItemSeparator}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) =>
                    <View style={styles.body}>
                      <Image source={{uri: item.anh}} style={styles.imageStyle} />
                      <Text style={styles.text_name_product}>{item.tensp}</Text>                  
                      <Text style={styles.text_total}>{item.gianhap} VNĐ</Text>
                      <TouchableOpacity style={styles.button_sub} onPress={() => {sub_number_product(item.masanpham)}}>
                        <Image source={sub}  />
                      </TouchableOpacity>
                      <Text style={styles.text_number}> {item.soluongnhap} </Text>
                      <TouchableOpacity  style={styles.button_plus} onPress={() => {plus_number_product(item.masanpham)}}>
                        <Image source={plus}  />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button4} onPress={() => {remove_product(item.masanpham)}}>
                        <Image source={remove} styles={styles.image_remove} />
                      </TouchableOpacity> 
                    </View>
                  } 
                />
          </SafeAreaView>
          <Text style={styles.total}> Thành tiền:  </Text>
          <TextInput
              multiline={true} 
              style={[styles.name_input2, styles.mt10]} 
              placeholderTextColor={'#555'}   
              placeholder=""
              editable={false}
              value = {total}
              onChangeText={setTotal}
            />
          <TouchableOpacity style={styles.button5} onPress={add_entry}>
             <Text style={styles.text2}>Lưu</Text>
          </TouchableOpacity>
        </View>
  )
}

const styles = StyleSheet.create({
  imageStyle: {
    width: 100,
    height: 100,
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
    top: 44,
  },
  imge_back:{
    position: 'absolute',
    width: 90,
    height: 90,
    left: 10,
    top: 50,
  },
  text_header:{
    position: 'absolute',
    width: 290,
    left: 70,
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
  button2:{
    position: 'absolute',
    width: '50%',
    height: 50,
    left: 20,
    top: 170,
    backgroundColor: '#00CC99',
    borderRadius: 4,
    shadowColor: 'rgba(48, 48, 48, 0.3)',
    borderRadius: 8,
  },
  text2:{
    position: 'absolute',
    left: 25,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 37,
    textAlign: 'justify',
    color: 'white',
  },
  button3:{
    position: 'absolute',
    width: 100,
    height: 100,
    right: -40,
    top: 120,
  },

  scrollView: {
    marginHorizontal: 0,
    top: 80,
    height: 480,
  },
  body:{
    marginTop: 10,
    padding: 10,
    borderRadius: 4,
    shadowColor: 'rgba(0, 0, 0, 5)',
    borderRadius: 8,
    backgroundColor: "#F6F7FB",
    height: 130,
    flex: 1
  },
  
  button4: {
    position: 'absolute',
    width: 100,
    height: 100,
    right: -60,
    top: 10,
  },

  
  mt10: {
    marginTop: 100,
  },
  dropdown: {
    width: "80%",
    paddingVertical: 5,
    borderColor: '#00CC99',
    borderWidth: 2,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: "#F6F7FB",
    color: '##000000',
    fontSize: 20,
    left: 20,
  },
  dropdown1:{
    width: "90%",
    paddingVertical: 5,
    borderColor: '#00CC99',
    borderWidth: 2,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: "#F6F7FB",
    color: '##000000',
    fontSize: 20,
    left: -1,
    top: -90,
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
  text_name_product:{
    left: '30%',
    bottom: '87%',
    color: "#00CC99"
  },
  text_total:{
    left: '30%',
    bottom: '86%',
    color: '#000000',
    fontSize: 18,
  },
  button_sub:{
    left: '30%',
    bottom: '75%',
  },
  text_number:{
    left: '39.7%',
    bottom: '100%',
    color: '#000000'
  },
  button_plus:{
    left: '50%',
    bottom: '125%',
  },

  total:{
    top: '9%',
    left: '25%',
    fontSize: 18,
    color: "black",
    fontWeight: 'bold'
  },
  button5:{
    position: 'absolute',
    width: '20%',
    height: 50,
    top: '94%',
    left: '75%',
    backgroundColor: '#00CC99',
    borderRadius: 4,
    shadowColor: 'rgba(48, 48, 48, 0.3)',
    borderRadius: 8,
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
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
    top: -150,
  },
  name_input2:{
    width: "45%",
    paddingVertical: 5,
    borderColor: '#00CC99',
    borderWidth: 2,
    paddingHorizontal: 12,
    borderRadius: 15,
    color: "#000000",
    fontSize: 18,
    backgroundColor: "#F6F7FB",
    top: -65,
    left: '55%'
  },
  name_input1:{
    width: "90%",
    paddingVertical: 5,
    borderColor: '#00CC99',
    borderWidth: 2,
    paddingHorizontal: 12,
    borderRadius: 15,
    color: "#000000",
    fontSize: 20,
    backgroundColor: "#F6F7FB",
    top: -210,
  },
  text_product:{
    fontSize: 20,
    top: -40,
    left: -10,
    color: "#00CC99",
    fontWeight: 'bold',
  },
  button6: {
    position: 'absolute',
    width: '30%',
    height: 50,
    top: '90%',
    left: '60%',
    backgroundColor: '#00CC99',
    borderRadius: 4,
    shadowColor: 'rgba(48, 48, 48, 0.3)',
    borderRadius: 8,
  },
  button7: {
    position: 'absolute',
    width: '30%',
    height: 50,
    top: '90%',
    left: '20%',
    backgroundColor: '#00CC99',
    borderRadius: 4,
    shadowColor: 'rgba(48, 48, 48, 0.3)',
    borderRadius: 8,
  }

})