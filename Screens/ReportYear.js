import { StyleSheet, Text, View,TouchableOpacity,Image,TextInput } from 'react-native'
import React,{useState} from 'react'
import VerticalBarGraph from '@chartiful/react-native-vertical-bar-graph'
import {Dimensions} from 'react-native';
import top1 from '../Images/top1.png'
import top2 from '../Images/top2.png'
import top3 from '../Images/top3.png'
import top4 from '../Images/top4.png'
import top5 from '../Images/top5.png'
import login from '../Images/login.png'
import back from '../Images/back.png'
export default function ReportYear({ route, navigation}) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <View>
      <View styles={styles.header}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Image source={back} styles={styles.imge_back} />
          </TouchableOpacity>
          <Text style={styles.text_header}>Báo Cáo</Text>
      </View>
      
      <TouchableOpacity style={styles.button_top2}>
        <Image source={top3} style={styles.image_top2}/>
        <Text style={styles.text1}>Doanh thu trong từng năm</Text>
        <Text style={styles.text2}>Thống kê doanh thu theo từng năm</Text>
      </TouchableOpacity>
 
      <VerticalBarGraph
        data={[20, 45, 28, 80, 99, 43]}
        labels={['2017', '2018', '2019', '2020', '2021', '2022']}
        width={Dimensions.get('window').width -60}
        height={400}
        barRadius={5}
        barWidthPercentage={0.65}
        barColor='#303030'
        baseConfig={{
          hasXAxisBackgroundLines: false,
          xAxisLabelStyle: {
            position: 'right',
            prefix: '$'
          }
        }}
        style={{
          top: '30%',
          left: 14,
          marginBottom: 30,
          padding: 10,
          paddingTop: 30,
          borderRadius: 10,
          backgroundColor: `#D799FF`,
          width: Dimensions.get('window').width -30
        }}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  button_top2: {
    width: '92%',
    backgroundColor: '#D799FF',
    height: 90,
    borderRadius: 12,
    marginTop: 20,
    top: '15%',
    left: '4%'
  },
  image_top2: {
    backgroundColor: '#D799FF',
    borderRadius: 12,
    left: 10,
    top: 20,
  },
  text1: {
    bottom: 40,
    left: 78,
    fontSize: 18,
    color: '#132743',
    fontWeight: 'bold',
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
})