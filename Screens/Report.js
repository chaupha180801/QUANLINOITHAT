import { StyleSheet, Text, View,TouchableOpacity,Image,ScrollView,SafeAreaView,StatusBar,TouchableWithoutFeedback, TextInput } from 'react-native'
import React from 'react'
import back from '../Images/back.png'
import remove from '../Images/remove.png'
import bell from '../Images/bell.png'
import user1 from '../Images/user1.png'
import house from '../Images/house.png'
import receipt from '../Images/receipt.png'
import top1 from '../Images/top1.png'
import top2 from '../Images/top2.png'
import top3 from '../Images/top3.png'
import top4 from '../Images/top4.png'
import top5 from '../Images/top5.png'
import login from '../Images/login.png'
import { openDatabase } from 'react-native-sqlite-storage'
var db = openDatabase({ name: 'QLCHNT.db' });

export default function Report({route, navigation}) {
  const {id,username} = route.params;
  return (
    <View>
       <Image source={login} style={styles.image}/>
          <View styles={styles.header}>
              <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                  <Image source={back} styles={styles.imge_back} />
              </TouchableOpacity>
              <Text style={styles.text_header}>Báo Cáo</Text>            
          </View>
          <View style={styles.body}>
            <TouchableOpacity onPress={()=>{navigation.navigate('ReportByMonth', {id:id, username: username})}}>
             <Text style={styles.text1}>Báo cáo theo tháng</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate('ReportByYear', {id:id, username: username})}}>
             <Text style={styles.text1}>Báo cáo theo năm</Text>
            </TouchableOpacity>
          </View>
          
          <View styles={styles.container1}>
            <TouchableOpacity style={styles.button5} onPress={() => {
                                              navigation.navigate({
                                                name: 'Home',
                                                params: {id:id, username: username},
                                                merge: true,
                                              })
                                            }}>
              <Image source={house}  />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button6} onPress={()=>{navigation.navigate('Acount', {id:id, username: username})}}>
              <Image source={user1}  />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button7} onPress={()=>{navigation.navigate('ListEntry', {id:id, username: username})}}>
              <Image source={bell} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button8} onPress={()=>{navigation.navigate('ListBill', {id:id, username: username})}}>
              <Image source={receipt} />
            </TouchableOpacity>
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 740,
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
    top: 40,
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
    top: 110,
    backgroundColor: '#00CC99',
    borderRadius: 4,
    shadowColor: 'rgba(48, 48, 48, 0.3)',
    borderRadius: 8,
  },
 
  button3:{
    position: 'absolute',
    width: 100,
    height: 100,
    right: -40,
    top: 120,
  },
  button5: {
    position: 'absolute',
    width: 0,
    height: 40,
    left: 50,
    top: 196,
    borderRadius: 4,
    shadowColor: 'rgba(48, 48, 48, 0.3)',
    borderRadius: 8,
  },
  button6: {
    position: 'absolute',
    width: 0,
    height: 40,
    right: 90,
    top: 200,
    backgroundColor: 'white',
    borderRadius: 4,
    shadowColor: 'rgba(48, 48, 48, 0.3)',
    borderRadius: 8,
  },
  button7: {
    position: 'absolute',
    width: 0,
    height: 40,
    right: 180,
    top: 198,
    backgroundColor: 'white',
    borderRadius: 4,
    shadowColor: 'rgba(48, 48, 48, 0.3)',
    borderRadius: 8,
  },
  button8: {
    position: 'absolute',
    width: 0,
    height: 40,
    left: 140,
    top: 198,
    backgroundColor: 'white',
    borderRadius: 4,
    shadowColor: 'rgba(48, 48, 48, 0.3)',
    borderRadius: 8,
  },
  body: {
    marginHorizontal: 10,
    top: 155,
    height: 550,
  },
  button_top1: {
    width: '100%',
    backgroundColor: '#45C6EE',
    height: 90,
    borderRadius: 12,
  },
  button_top2: {
    width: '100%',
    backgroundColor: '#9FFFF6',
    height: 90,
    borderRadius: 12,
    marginTop: 20,
  },
  
  image_top1: {
    backgroundColor: '#45C6EE',
    borderRadius: 12,
    left: 10,
    top: 20,
  },
  image_top2: {
    backgroundColor: '#9FFFF6',
    borderRadius: 12,
    left: 10,
    top: 20,
  },
  
  text1: {
    top: 140,
    left: 25,
    fontSize: 30,
    color: '#5f4b8b',
    fontWeight: 'bold',
  },
  text2: {
    bottom: 40,
    left: 80,
    fontSize: 12,
    color: '#132743',
  }
 
  

})