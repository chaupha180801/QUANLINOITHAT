import { StyleSheet, Text, View, Image,TouchableOpacity} from 'react-native'
import React, {useState,useEffect} from 'react'
import header_home from '../Images/header_home.png'
import bill from '../Images/bill.png'
import category from '../Images/category.png'
import customer from '../Images/customer.png'
import supplier from '../Images/supplier.png'
import import_goods from '../Images/import_goods.png'
import report from '../Images/report.png'
import account from '../Images/account.png'
import product from '../Images/product.png'
import user from '../Images/user.png'
import regulation from '../Images/regulation.png'
import { getUserId } from '../Context/User'
import { openDatabase } from 'react-native-sqlite-storage'
var db = openDatabase({ name: 'QLCHNT.db' });

export default function Home({navigation, route}) {
    const {id,username} = route.params;
    return (
    <View style={styles.container}>
        <Image source={header_home} style={styles.image}/>
        <View style={styles.header}>
            <Image source={user} style={styles.image_user}/>
            <Text style={styles.name}>
                {username}
            </Text>
            <Text style={styles.text_1}>Chào mừng bạn đã trở lại</Text>
        </View>
        <View style={styles.body}>
            <TouchableOpacity style={styles.button_bill} onPress={()=>{navigation.navigate('ListBill', {id: id, username: username})}}>
                <Image source={bill}/>
                <Text style={styles.text_bill}>Hóa đơn</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button_category} onPress={()=>{navigation.navigate('ListCategory', {id: id,username: username})}}>
                <Image source={category}/>
                <Text style={styles.text_category}>Danh mục</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button_product} onPress={()=>{navigation.navigate('ListProduct',{id: id, username: username})}}>
                <Image source={product}/>
                <Text style={styles.text_product}>Sản phẩm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button_customer} onPress={()=>{navigation.navigate('ListCustomer',{id: id, username: username})}}>
                <Image source={customer}/>
                <Text style={styles.text_customer}>Khách hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button_supplier} onPress={()=>{navigation.navigate('ListSupplier',{id: id, username: username})}}>
                <Image source={supplier}/>
                <Text style={styles.text_supplier}>Nhà cung cấp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button_import_goods} onPress={()=>{navigation.navigate('ListEntry',{id: id,username: username})}}>
                <Image source={import_goods}/>
                <Text style={styles.text_import_goods}>Nhập hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button_report} onPress={()=>{navigation.navigate('Report',{id: id,username: username})}}>
                <Image source={report}/>
                <Text style={styles.text_report}>Báo cáo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button_account} onPress={()=>{navigation.navigate('Acount',{username: username, id: id})}}>
                <Image source={account}/>
                <Text style={styles.text_account}>Tài khoản</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button_regulation} onPress={()=>{navigation.navigate('Regulation',{username: username, id: id})}}>
                <Image source={regulation}/>
                <Text style={styles.text_regulation}>Qui định</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#fff",
    },
    image: {
        position: 'absolute',
        width: "120%",
        left: -50,
        right: 0,
        top: 0,
        bottom: 57.76,
        borderRadius: 20,
    },
    header: {
        position: 'absolute',
        width: 221,
        height: 50,
        top: 70,
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 40,
        lineHeight: 50,
        color: '#fff',
    },
    name: {
        position: 'absolute',
        width: 300,
        height: 60,
        left: 100,
        top: 10,
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 20,
        lineHeight: 40,
        color: 'black',
    },
    text_1: {
        position: 'absolute',
        width: 300,
        height: 60,
        left: 100,
        top: 45,
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 15,
        lineHeight: 40,
        color: 'black',
    },
    image_user: {
        position: 'absolute',
        width: 70,
        height: 70,
        top: 20,
        left: 20,
    },
    body: {
        position: 'absolute',
        height: 550,
        left: 0,
        right: 0,
        top: 250,
        bottom: 9.24,   
        backgroundColor: '#F9FBFC',
        borderRadius: 40,
    },
    button_bill: {
        position: 'absolute',
        width: 75.98,
        height: 100,
        left: 32,
        top: 50,
    },
    text_bill: {
        position: 'absolute',
        width: 74,
        height: 24,
        left: 5,
        top: 88,
        fontFamily: 'Readex Pro',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 14.2463,
        lineHeight: 16,
        color: '#000000',  
    },
    button_category: {
        position: 'absolute',
        width: 100,
        height: 110,
        left: 166,
        top: 50,
    },
    text_category: {
        position: 'absolute',
        width: 100,
        height: 30,
        left: -1,
        top: 88,
        fontFamily: 'Readex Pro',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 14.2463,
        lineHeight: 16,
        color: '#000000',  
    },
    button_product: {
        position: 'absolute',
        width: 100,
        height: 110,
        left: 300,
        top: 50,
    },
    text_product: {
        position: 'absolute',
        width: 110,
        height: 30,
        left: -2,
        top: 88,
        fontFamily: 'Readex Pro',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 14.2463,
        lineHeight: 16,
        color: '#000000',
    },
    button_customer: {
        position: 'absolute',
        width: 100,
        height: 110,
        left: 33,
        top: 210, 
    },
    text_customer: {
        position: 'absolute',
        width: 100,
        height: 24,
        left: -10,
        top: 88,
        fontFamily: 'Readex Pro',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 14.2463,
        lineHeight: 16,
        color: '#000000',         
    },
    button_supplier: {
        position: 'absolute',
        width: 100,
        height: 110,
        left: 166,
        top: 210,        
    },
    text_supplier: {
        position: 'absolute',
        width: 120,
        height: 24,
        left: -15,
        top: 88,
        fontFamily: 'Readex Pro',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 14.2463,
        lineHeight: 16,
        color: '#000000', 
    },
    button_import_goods: {
        position: 'absolute',
        width: 100,
        height: 110,
        left: 300,
        top: 210, 
    },
    text_import_goods: {
        position: 'absolute',
        width: 120,
        height: 24,
        left: -8,
        top: 88,
        fontFamily: 'Readex Pro',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 14.2463,
        lineHeight: 16,
        color: '#000000', 
    },
    button_report: {
        position: 'absolute',
        width: 100,
        height: 110,
        left: 33,
        top: 370,   
    },
    text_report:{
        position: 'absolute',
        width: 100,
        height: 24,
        left: 5,
        top: 88,
        fontFamily: 'Readex Pro',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 14.2463,
        lineHeight: 16,
        color: '#000000',  
    },
    button_account: {
        position: 'absolute',
        width: 100,
        height: 110,
        left: 166,
        top: 370,   
    },
    text_account:{
        position: 'absolute',
        width: 100,
        height: 24,
        left: 0,
        top: 88,
        fontFamily: 'Readex Pro',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 14.2463,
        lineHeight: 16,
        color: '#000000', 
    },
    button_regulation:{
        position: 'absolute',
        width: 100,
        height: 110,
        left: 300,
        top: 370, 
    },
    text_regulation:{
        position: 'absolute',
        width: 120,
        height: 24,
        left: 6,
        top: 88,
        fontFamily: 'Readex Pro',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 14.2463,
        lineHeight: 16,
        color: '#000000', 
    }
})