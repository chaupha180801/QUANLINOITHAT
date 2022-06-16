import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import backImage from '../Images/boarding.png'
import { openDatabase } from 'react-native-sqlite-storage'
var db = openDatabase({ name: 'QLCHNT.db' });

export default function Splash({navigation}) {
    useEffect(() => {
        db.transaction(function (txn) {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='TAIKHOAN'",
            [],
            function (tx, res) {
              console.log('item:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS TAIKHOAN', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS TAIKHOAN(MANV INTEGER PRIMARY KEY AUTOINCREMENT, TENNV VARCHAR(255), SDT VARCHAR(255), EMAIL VARCHAR(255) UNIQUE,MATKHAU VARCHAR(255), DIACHI VARCHAR(255))',
                  []
                );
              }
            }
          );
        });
      }, []);
  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.image}/>
      <Text style={styles.text1}>
          MAKE YOUR
      </Text>
      <Text style={styles.text2}>
          BEAUTIFUL HOUSE
      </Text>

      <Text style={styles.text3}>
        The best simple place where you discover most wonderful furnitures and make your home beautiful
      </Text>

      <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Login', {})}}>
          <Text style={styles.text4}>Get Started</Text>
      </TouchableOpacity>
      
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
  text1: {
    position: 'absolute',
    width: 240,
    height: 40,
    left: 30,
    top: 231,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 30,
    display: 'flex',
    alignItems: 'center',
    letterSpacing: 0.05,
    color: '#606060',
  },
  text2: {
    position: 'absolute',
    width: 304,
    height: 38,
    left: 30,
    top: 276,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: 0.05,
    color: '#303030',
  },
  text3: {
    position: 'absolute',
    width: 340,
    height: 200,
    left: 45,
    top: 346,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 27,
    textAlign: 'justify',
    color: '#808080',
  },
  button: {
    position: 'absolute',
    width: 159,
    height: 54,
    left: 125,
    top: 595,
    backgroundColor: '#00CC99',
    borderRadius: 4,
    shadowColor: 'rgba(48, 48, 48, 0.3)',
  },
  text4: {
    position: 'absolute',
    left: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 40,
    textAlign: 'center',
    color: 'white',
  },
})