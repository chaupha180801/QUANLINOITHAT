import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React, {useState,useEffect} from 'react'
import VerticalBarGraph from '@chartiful/react-native-vertical-bar-graph'
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";

import {Dimensions} from 'react-native';
import top2 from '../Images/top2.png'
import back from '../Images/back.png'
import DatePicker from 'react-native-date-picker'
import login from '../Images/login.png'
import { openDatabase } from 'react-native-sqlite-storage'
var db = openDatabase({ name: 'QLCHNT.db' });

export default function ReportTurnoverByMonth({ route, navigation}) {
  const {id, username, year, month} = route.params;
  const [list_data, setListData] = useState([]);
  const [list_label, setListLabel] = useState([]);
  useEffect(() => {
    db.transaction(function (tx) {
      tx.executeSql(
        'SELECT strftime("%d", NGAYLAP) AS "Day", SUM(THANHTIEN) AS "ThanhTien"  FROM HOADON WHERE strftime("%Y", NGAYLAP) = ? AND strftime("%m", NGAYLAP) = ? GROUP BY strftime("%d", NGAYLAP)',
        [year, month],
        (tx, results) => {
          var temp_days = [];
          var temp_totals = [];
          console.log(results.rows.length);
          for (let i = 0; i < results.rows.length; ++i){

            temp_days.push(results.rows.item(i).Day);
            temp_totals.push(results.rows.item(i).ThanhTien);
          }
          setListData(temp_totals);
          setListLabel(temp_days);
        } 
    );
    
    const unsubscribe = navigation.addListener('focus', () => {
      db.transaction((tx) => {
        tx.executeSql(
            'SELECT strftime("%d", NGAYLAP) AS "Day", SUM(THANHTIEN) AS "ThanhTien"  FROM HOADON WHERE strftime("%Y", NGAYLAP) = ? AND strftime("%m", NGAYLAP) = ? GROUP BY strftime("%d", NGAYLAP)',
            [year, month],
          (tx, results) => {
            var temp_days = [];
            var temp_totals = [];
            console.log(results.rows.length);
            for (let i = 0; i < results.rows.length; ++i){
              temp_days.push(results.rows.item(i).Day);
              temp_totals.push(results.rows.item(i).ThanhTien);
            }
            setListData(temp_totals);
            setListLabel(temp_days);
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
        <Text style={styles.text_header}>Báo cáo doanh thu trong tháng</Text>
      </View>
      <Text style={styles.text1}>Doanh thu của của tháng {month} trong năm {year}</Text>
      <VerticalBarGraph
        data={list_data}
        labels={list_label}
        width={Dimensions.get('window').width -80}
        height={490}
        barRadius={5}
        barWidthPercentage={0.65}
        barColor='#53ae31'
        baseConfig={{
          hasXAxisBackgroundLines: false,
          xAxisLabelStyle: {
            position: 'right',
            width: 90,
            fontSize: 16            
          }
        }}
        style={{
          top: '25%',
          left: 14,
          marginBottom: 30,
          padding: 10,
          paddingTop: 30,
          borderRadius: 10,
          backgroundColor: `#dff4d7`,
          width: Dimensions.get('window').width -30
        }}
      />
      

    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 780,
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'cover',
  },
  button_top2: {
    width: '92%',
    backgroundColor: '#9FFFF6',
    height: 90,
    borderRadius: 12,
    marginTop: 20,
    top: '15%',
    left: '4%'
  },
  image_top2: {
    backgroundColor: '#9FFFF6',
    borderRadius: 12,
    left: 10,
    top: 20,
  },

  text2: {
    bottom: 40,
    left: 80,
    fontSize: 12,
    color: '#132743',
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

  name_input2: {
    width: "90%",
    paddingVertical: 5,
    borderColor: '#00CC99',
    borderWidth: 2,
    paddingHorizontal: 12,
    borderRadius: 15,
    color: "#000000",
    fontSize: 20,
    top: 115,
    backgroundColor: "#F6F7FB",
    left: '5%'
  },
  mt10: {
    marginTop: 20,
  },
  text1: {
    top: 120,
    fontSize: 18,
    color: '#dd4124',
    fontWeight: 'bold',
    textAlign: 'center'
  },
})