import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, SafeAreaView, StatusBar, Modal,
    TouchableWithoutFeedback,  Animated, TextInput, FlatList } from 'react-native'
  import React,{useState,useEffect} from 'react'
  import back from '../Images/back.png'
  import remove from '../Images/remove.png'
  import bell from '../Images/bell.png'
  import user1 from '../Images/user1.png'
  import house from '../Images/house.png'
  import receipt from '../Images/receipt.png'
  import image_demo from '../Images/image_demo.png';
  import sub from "../Images/sub.png";
  import plus from "../Images/plus.png"
  import delete_modal from "../Images/delete_modal.png"
  import { openDatabase } from 'react-native-sqlite-storage'
  var db = openDatabase({ name: 'QLCHNT.db' });

  
  export default function DetailEntry({ route, navigation}) {
    const {id, username, mapn, ngaynhap, tongtien, mancc} = route.params;
    const [list, setList] = useState([]);
    const [empty, setEmpty] = useState([]); 
    let [supplier, setSupplier] = useState('');
    useEffect(() => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM CHITIETPHIEUNHAPHANG WHERE MAPN = ?',
          [mapn],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            setList(temp);
            if (results.rows.length >= 1) {
              setEmpty(false);
            } else {
              setEmpty(true)
            }
          }
        );
      });

      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM NHACUNGCAP WHERE MANCC = ?',
          [mancc],
          (tx, results) => {
            setSupplier(results.rows.item(0).TENNCC);
          }
        );
      });
      
    },[]);

    const listViewItemSeparator = () => {
      return (
        <ScrollView>
         </ScrollView>
      );
    };
  
    const emptyMSG = (status) => {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Text style={{ fontSize: 25, textAlign: 'center' }}>
            No Record Inserted Database is Empty...
            </Text>
        </View>
      );
    }

    return (
          <View>  
            <View styles={styles.header}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Image source={back} styles={styles.imge_back} />
                </TouchableOpacity>
                <Text style={styles.text_header}> Chi tiết phiếu nhập</Text>
            </View>
            <Image source={bell} style={styles.image_receipt}/>
            <Text style={styles.text_bill}>Số phiếu: </Text>
            <Text style={styles.text_bill_id}>PNH{mapn}</Text>
            <Text style={styles.text_customer}>Nhà cung cấp: </Text>
            <Text style={styles.text_customer_name}>{supplier}</Text>
            <Text style={styles.text_date}>Ngày lập: {ngaynhap}</Text>
            <SafeAreaView style={{marginHorizontal: 10,
                                top: 80,
                                height: 550}}>
              {empty ? emptyMSG(empty) :
                <FlatList
                  data={list}
                  ItemSeparatorComponent={listViewItemSeparator}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) =>
                    <View style={styles.body}>
                      <Image source={{uri: JSON.parse(item.ANH)}} style={styles.imageStyle} />   
                      <Text style={styles.text_name_product}>{item.TENSP}</Text>                  
                      <Text style={styles.text_total}>{item.GIANHAP} VNĐ</Text>
                      <Text style={styles.text_number}>Số lượng: {item.SOLUONG} </Text>
                     
                    </View>
                  } 
                />
              }
            </SafeAreaView>
          <Text style={styles.total}> Thành tiền: {tongtien.toString()} VNĐ </Text>
         
          </View>
    )
  }
  
  const styles = StyleSheet.create({
    imageStyle:{
      height: 100,
      width: 100,
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
    button3:{
      position: 'absolute',
      width: 100,
      height: 100,
      right: -40,
      top: 120,
    },
  
    scrollView: {
      marginHorizontal: 0,
      top: 50,
      height: 500,
    },
    body:{
      marginTop: 10,
      padding: 10,
      borderRadius: 4,
      shadowColor: 'rgba(0, 0, 0, 5)',
      borderRadius: 8,
      backgroundColor: "#F6F7FB",
      height: 130,
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
      bottom: '90%',
      color: "#00CC99",
      fontSize: 17
    },
    text_total:{
      left: '30%',
      bottom: '85%',
      color: '#000000',
      fontSize: 17,
      fontWeight: 'bold',
    },
    button_sub:{
      left: '30%',
      bottom: '95%',
    },
    text_number:{
      left: '30%',
      bottom: '80%',
      color: '#000000',
      fontSize: 17,
    },
    button_plus:{
      left: '50%',
      bottom: '145%',
    },
    text_color: {
      left: '29%',
      bottom: '140%',
    },
    text_color1: {
      left: '40%',
      bottom: '162%',
      color: "#000000"
    },
    total:{
      top: '-3%',
      left: '25%',
      fontSize: 18,
      color: "black",
      fontWeight: 'bold'
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
    text_product:{
      fontSize: 20,
      top: -40,
      left: -10,
      color: "#00CC99",
      fontWeight: 'bold',
    },
    image_receipt:{
      top: '15%',
      left: '5%'
    },
    text_bill: {
      top: '10%',
      left: '15%',
      fontSize: 18,
      color: "#000000"
    },
    text_bill_id:{
      top: '5.7%',
      left: '39%',
      fontSize: 18,
      color: "#000000",
      fontWeight:'bold'
    },
    text_customer:{
      top: '7%',
      left: '7%',
      fontSize: 16,
      color: "#000000"
    },
    text_customer_name:{
      top: '2.9%',
      left: '39%',
      fontSize: 18,
      color: "#00CC99",
      fontWeight:'bold',
      width: '80%'
    },
    text_date:{
      top: '4%',
      left: '7%',
      fontSize: 16,
      color: "#000000",
      fontWeight: 'bold',
      borderRadius: 15,
      color: "#000000",
      fontSize: 18,
      backgroundColor: "#F6F7FB",
      left: '55%'
    },
    text_date:{
      top: '4%',
      fontSize: 16,
      color: "#000000",
      fontWeight: 'bold',
      borderRadius: 15,
      color: "#000000",
      fontSize: 18,
      left: '5%'
    },
  
  })