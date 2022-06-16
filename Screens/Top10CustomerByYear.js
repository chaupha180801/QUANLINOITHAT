
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import React, {useState,useEffect} from 'react'
import { DataTable } from 'react-native-paper'; 
import { openDatabase } from 'react-native-sqlite-storage'
var db = openDatabase({ name: 'QLCHNT.db' });
import login from '../Images/login.png'
import back from '../Images/back.png' 

 export default function Top10CustomerByYear({ route, navigation})  {
    const {id, username, year} = route.params;
    const [list_data, setListData] = useState([]);
    useEffect(() => {
        console.log("năm", year);
        db.transaction(function (tx) {
          tx.executeSql(
            'SELECT KHACHHANG.TENKH, KHACHHANG.SDT, SUM(HOADON.THANHTIEN) AS "TONGTIENMUA", COUNT(HOADON.MAKH) AS "SOLUOTMUA" FROM HOADON JOIN KHACHHANG ON KHACHHANG.MAKH = HOADON.MAKH  WHERE strftime("%Y", HOADON.NGAYLAP) = ? GROUP BY HOADON.MAKH HAVING COUNT(HOADON.MAKH) >= 1 AND SUM(HOADON.THANHTIEN) >= 900000',
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
                'SELECT KHACHHANG.TENKH, KHACHHANG.SDT, SUM(HOADON.THANHTIEN) AS "TONGTIENMUA", COUNT(HOADON.MAKH) AS "SOLUOTMUA" FROM HOADON JOIN KHACHHANG ON KHACHHANG.MAKH = HOADON.MAKH  WHERE strftime("%Y", HOADON.NGAYLAP) = ? GROUP BY HOADON.MAKH HAVING COUNT(HOADON.MAKH) >= 1 AND SUM(HOADON.THANHTIEN) >= 900000',
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
                <Text style={styles.text_header}>Top 10 khách hàng</Text>
            </View>
            <Text style={styles.text_header1}>Top 10 khách hàng thân thiết năm {year}</Text>
            <DataTable style={styles.container}>
                <DataTable.Header style={styles.tableHeader}>
                    <DataTable.Title>
                      <Text style={styles.text_header2}>Tên</Text>
                    </DataTable.Title>
                    <DataTable.Title>
                      <Text style={styles.text_header2}>SĐT</Text>
                    </DataTable.Title>
                    <DataTable.Title>
                      <Text style={styles.text_header2}>SL</Text>
                    </DataTable.Title>
                    <DataTable.Title>
                      <Text style={styles.text_header2}>Tổng tiền</Text>
                    </DataTable.Title>
                </DataTable.Header>  
                <FlatList
                  data={list_data}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) =>
                  <DataTable.Row>
                    <DataTable.Cell>
                      <Text style={styles.text_name}>{item.TENKH}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell> <Text style={styles.text_name}>{item.SDT}</Text> </DataTable.Cell>
                    <DataTable.Cell> <Text style={styles.text_name}>{item.SOLUOTMUA}</Text></DataTable.Cell>
                    <DataTable.Cell> <Text style={styles.text_name}>{item.TONGTIENMUA} vnđ</Text></DataTable.Cell>
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
      top: '230%',
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
      top: 130,
      fontWeight: 'bold',
      fontSize: 20,
      lineHeight: 25,
      textAlign: 'center',
      color: '#dd4124',
    },
    text_header2:{
      position: 'absolute',
      width: 400,
      fontWeight: 'bold',
      fontSize: 16,
      lineHeight: 20,
      textAlign: 'center',
      color: 'white',
    },
    text_name:{
      fontSize: 12,
      color: '#000000',
    },
  });
