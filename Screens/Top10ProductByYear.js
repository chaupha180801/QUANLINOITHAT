import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import React, {useState,useEffect} from 'react'
import { DataTable } from 'react-native-paper'; 
import { openDatabase } from 'react-native-sqlite-storage'
var db = openDatabase({ name: 'QLCHNT.db' });
import login from '../Images/login.png'
import back from '../Images/back.png'  
import top1 from '../Images/top1.png'

 export default function Top10ProductByYear({ route, navigation})  {
    const {id, username, year} = route.params;
    const [list_data, setListData] = useState([]);
    useEffect(() => {
        console.log("năm", year);
        db.transaction(function (tx) {
          tx.executeSql(
            'SELECT SANPHAM.MAU, SANPHAM.GIABAN, SANPHAM.HINHANH, SANPHAM.TENSP, SUM(CHITIETHOADON.SOLUONG) AS "SOLUONGBAN" FROM CHITIETHOADON JOIN SANPHAM ON SANPHAM.MASP = CHITIETHOADON.MASP JOIN HOADON ON HOADON.SOHD = CHITIETHOADON.SOHD WHERE strftime("%Y", HOADON.NGAYLAP) = ? GROUP BY CHITIETHOADON.MASP ORDER BY SUM(CHITIETHOADON.SOLUONG) DESC LIMIT 10',
            [year],
            (tx, results) => {
              var temp = [];
              console.log(results.rows.length);
              for (let i = 0; i < results.rows.length; ++i){
                temp.push(results.rows.item(i));
              }
              setListData(temp);
            } 
        );
        
        const unsubscribe = navigation.addListener('focus', () => {
          db.transaction((tx) => {
            tx.executeSql(
                'SELECT SANPHAM.MAU, SANPHAM.GIABAN, SANPHAM.HINHANH, SANPHAM.TENSP, SUM(CHITIETHOADON.SOLUONG) AS "SOLUONGBAN" FROM CHITIETHOADON JOIN SANPHAM ON SANPHAM.MASP = CHITIETHOADON.MASP JOIN HOADON ON HOADON.SOHD = CHITIETHOADON.SOHD WHERE strftime("%Y", HOADON.NGAYLAP) = ? GROUP BY CHITIETHOADON.MASP ORDER BY SUM(CHITIETHOADON.SOLUONG) DESC LIMIT 10',
                [year],
                (tx, results) => {
                    var temp = [];
                    console.log(results.rows.length);
                    for (let i = 0; i < results.rows.length; ++i){
                        temp.push(results.rows.item(i));
                    }
                    setListData(temp);
                } 
            );
          });
        });
    
        return unsubscribe;
      });
      }, []);
    return (
        <View>
            <Image source={login} style={styles.image}/>
            <View styles={styles.header}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Image source={back} styles={styles.imge_back} />
                </TouchableOpacity>
                <Text style={styles.text_header}>Top 10 sản phẩm bán chạy</Text>
            </View>        
            <Text style={styles.text1}>Top 10 sản phẩm bán chạy trong năm {year}</Text>       
            <DataTable style={styles.container}>
                <DataTable.Header style={styles.tableHeader}>
                    <DataTable.Title>
                      <Text style={styles.text_header2}>Tên</Text>
                    </DataTable.Title>
                    <DataTable.Title>
                      <Text style={styles.text_header2}>SL</Text>
                    </DataTable.Title>
                    <DataTable.Title>
                    <Text style={styles.text_header2}>Giá bán</Text>
                    </DataTable.Title>
                </DataTable.Header>  
                <FlatList
                  data={list_data}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) =>
                  <DataTable.Row style={styles.tableRow}>
                    <DataTable.Cell>
                      <Text style={styles.text_name}>{item.TENSP}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <Text style={styles.text_name}>{item.SOLUONGBAN}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <Text style={styles.text_name}>{item.GIABAN} vnđ</Text>
                    </DataTable.Cell>
                  </DataTable.Row>
                } 
                />
            </DataTable>
     </View>
    );
};
const styles = StyleSheet.create({
    image: {
      width: "100%",
      height: 790,
      position: 'absolute',
      top: 0,
      left: 0,
      resizeMode: 'cover',
    },
    container: {
      top: '50%',
      backgroundColor: 'white',
      borderColor: '#00CC99'
    },
    tableHeader: {
      backgroundColor: '#00CC99',
      height: 60,
      padding: 5,
      
    },
    imageStyle:{
      height: 100,
      width: 100,
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
      width: 400,
      left: 20,
      right: 0,
      top: 40,
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: 20,
      lineHeight: 25,
      textAlign: 'center',
      color: '#303030',
    },
    text_header1:{
      position: 'absolute',
      width: 400,
      left: 0,
      right: 0,
      top: 120,
      fontWeight: 'bold',
      fontSize: 20,
      lineHeight: 25,
      textAlign: 'center',
      color: '#132743',
    },
    text_header2:{
      position: 'absolute',
      width: 400,
      fontWeight: 'bold',
      fontSize: 18,
      lineHeight: 20,
      textAlign: 'center',
      color: 'white',
    },
 
    text1: {
      bottom: 40,
      top: 140,
      fontSize: 18,
      color: '#dd4124',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    text_name:{
      fontSize: 17,
      color: '#000000',

    },
    tableRow:{
      padding: 12,
    }
    
  });
