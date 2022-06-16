
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import React, {useState,useEffect} from 'react'
import { DataTable } from 'react-native-paper'; 
import { openDatabase } from 'react-native-sqlite-storage'
var db = openDatabase({ name: 'QLCHNT.db' });
import login from '../Images/login.png'
import back from '../Images/back.png'  
 export default function ReportStockByMonth({ route, navigation})  {
    const {id, username, year, month} = route.params;
    const [list_data, setListData] = useState([]);
    useEffect(() => {
        console.log("năm", year);
        db.transaction(function (tx) {
          tx.executeSql(
            'SELECT  SANPHAM.MASP, SANPHAM.GIABAN, SANPHAM.TENSP, SUM(CHITIETHOADON.SOLUONG) AS "SOLUONGBAN" FROM CHITIETHOADON JOIN SANPHAM ON SANPHAM.MASP = CHITIETHOADON.MASP JOIN HOADON ON HOADON.SOHD = CHITIETHOADON.SOHD WHERE strftime("%Y", HOADON.NGAYLAP) = ? AND strftime("%m", HOADON.NGAYLAP) = ? GROUP BY CHITIETHOADON.MASP',
            [year, month],
            (tx, results) => {
                var temp1 = [];
                for (var i = 0; i < results.rows.length; ++i){
                    temp1.push(results.rows.item(i));
                }
                tx.executeSql(
                'SELECT  SANPHAM.MASP, SANPHAM.GIABAN, SANPHAM.TENSP, SUM(CHITIETPHIEUNHAPHANG.SOLUONG) AS "SOLUONGNHAP" FROM CHITIETPHIEUNHAPHANG JOIN SANPHAM ON SANPHAM.MASP = CHITIETPHIEUNHAPHANG.MASP JOIN PHIEUNHAPHANG ON PHIEUNHAPHANG.MAPN = CHITIETPHIEUNHAPHANG.MAPN WHERE strftime("%Y", PHIEUNHAPHANG.NGAYNHAP) = ? AND strftime("%m", PHIEUNHAPHANG.NGAYNHAP) = ? GROUP BY CHITIETPHIEUNHAPHANG.MASP',
                [year, month],
                (tx, results) => {                  
                    var temp = [];
                    for (var j = 0; j < results.rows.length; ++j){
                        for(var k = 0; k < temp1.length; ++k){
                            if(results.rows.item(j).MASP == temp1[k].MASP){
                                temp.push({masanpham: results.rows.item(j).MASP, tensp: results.rows.item(j).TENSP, SLnhap:results.rows.item(j).SOLUONGNHAP, SLban: temp1[k].SOLUONGBAN });
                            }
                        }
                    }
                    setListData(temp);
                });  
            } 
        );
        
        const unsubscribe = navigation.addListener('focus', () => {
          db.transaction((tx) => {
            tx.executeSql(
                'SELECT  SANPHAM.MASP, SANPHAM.GIABAN, SANPHAM.TENSP, SUM(CHITIETHOADON.SOLUONG) AS "SOLUONGBAN" FROM CHITIETHOADON JOIN SANPHAM ON SANPHAM.MASP = CHITIETHOADON.MASP JOIN HOADON ON HOADON.SOHD = CHITIETHOADON.SOHD WHERE strftime("%Y", HOADON.NGAYLAP) = ? AND strftime("%m", HOADON.NGAYLAP) = ? GROUP BY CHITIETHOADON.MASP',
                [year, month],
                (tx, results) => {
                    var temp1 = [];
                    for (var i = 0; i < results.rows.length; ++i){
                        temp1.push(results.rows.item(i));
                    }
                    tx.executeSql(
                    'SELECT  SANPHAM.MASP, SANPHAM.GIABAN, SANPHAM.TENSP, SUM(CHITIETPHIEUNHAPHANG.SOLUONG) AS "SOLUONGNHAP" FROM CHITIETPHIEUNHAPHANG JOIN SANPHAM ON SANPHAM.MASP = CHITIETPHIEUNHAPHANG.MASP JOIN PHIEUNHAPHANG ON PHIEUNHAPHANG.MAPN = CHITIETPHIEUNHAPHANG.MAPN WHERE strftime("%Y", PHIEUNHAPHANG.NGAYNHAP) = ? AND strftime("%m", PHIEUNHAPHANG.NGAYNHAP) = ? GROUP BY CHITIETPHIEUNHAPHANG.MASP',
                    [year, month],
                    (tx, results) => {                  
                        var temp = [];
                        for (var j = 0; j < results.rows.length; ++j){
                            for(var k = 0; k < temp1.length; ++k){
                                if(results.rows.item(j).MASP == temp1[k].MASP){
                                    temp.push({masanpham: results.rows.item(j).MASP, tensp: results.rows.item(j).TENSP, SLnhap:results.rows.item(j).SOLUONGNHAP, SLban: temp1[k].SOLUONGBAN });
                                }
                            }
                        }
                        setListData(temp);
                    });  
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
                <Text style={styles.text_header}>Thống kê nhập/xuất</Text>
            </View>
            <Text style={styles.text_header1}>Thống kê nhập xuất các sản phẩm trong tháng {month} năm {year}</Text>
            <DataTable style={styles.container}>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title>
                <Text style={styles.text_header2}>Tên</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={styles.text_header2}>SL Nhập</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={styles.text_header2}>SL Bán</Text>
              </DataTable.Title>
              </DataTable.Header>  
              <FlatList
                data={list_data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                <DataTable.Row style={styles.tableRow}>
                  <DataTable.Cell>
                    <Text style={styles.text_name}>{item.tensp}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Text style={styles.text_name}>{item.SLnhap}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <Text style={styles.text_name}>{item.SLban}</Text>
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
      resizeMode: 'cover',
    },
    container: {
      top: '90%',
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
      left: 10,
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
      fontSize: 18,
      lineHeight: 20,
      textAlign: 'center',
      color: 'white',
    },
    text_name:{
      fontSize: 17,
      color: '#000000',

    },
    tableRow:{
      padding: 12,
    }
  });
