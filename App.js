import React, {useState, useEffect}  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from "./Screens/Splash";
import Login from "./Screens/Login";
import Register from './Screens/Register';
import Home from "./Screens/Home";
import ListCategory from "./Screens/ListCategory";
import AddCategory from "./Screens/AddCategory";
import UpdateCategory from "./Screens/UpdateCategory";
import ListSupplier from "./Screens/ListSupplier";
import AddSupplier from "./Screens/AddSupplier";
import UpdateSupplier from "./Screens/UpdateSupplier";
import ListCustomer from "./Screens/ListCustomer";
import ListProduct from "./Screens/ListProduct";
import AddProduct from "./Screens/AddProduct";
import UpdateProduct from "./Screens/UpdateProduct"
import ListBill from "./Screens/ListBill";
import ListEntry from "./Screens/ListEntry";
import Report from "./Screens/Report";
import AddCustomer from "./Screens/AddCustomer";
import UpdateCustomer from "./Screens/UpdateCustomer"
import Acount from "./Screens/Acount"
import ResetPassword from "./Screens/ResetPassword"
import UpdateAcount from "./Screens/UpdateAcount"
import Regulation from "./Screens/Regulation"
import SearchCategory from "./Screens/SearchCategory"
import SearchSupplier from "./Screens/SearchSupplier"
import SearchCustomer from "./Screens/SearchCustomer"
import SearchProduct from "./Screens/SearchProduct"
import AddBill from "./Screens/AddBill"
import AddEntry from "./Screens/AddEntry"
import DetailBill from "./Screens/DetailBill"
import DetailEntry from "./Screens/DetailEntry"
import ReportYear from "./Screens/ReportYear"
import ReportTurnover from "./Screens/ReportTurnover"
import ReportByYear from "./Screens/ReportByYear"
import ReportByMonth from "./Screens/ReportByMonth"
import Top10ProductByYear from "./Screens/Top10ProductByYear"
import Top10CustomerByYear from "./Screens/Top10CustomerByYear"
import Top10ProductByMonth from "./Screens/Top10ProductByMonth"
import ReportTurnoverByMonth from "./Screens/ReportTurnoverByMonth"
import ReportStockByMonth from "./Screens/ReportStockByMonth"
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Splash" options={{headerShown: false}} component= {Splash}/>
        <Stack.Screen name = "Login" options={{headerShown: false}} component= {Login}/>
        <Stack.Screen name = "Register" options={{headerShown: false}} component= {Register}/>
        <Stack.Screen name = "Home" options={{headerShown: false}} component= {Home}/>
        <Stack.Screen name = "ListCategory" options={{headerShown: false}} component= {ListCategory}/>
        <Stack.Screen name = "AddCategory" options={{headerShown: false}} component= {AddCategory}/>
        <Stack.Screen name = "UpdateCategory" options={{headerShown: false}} component= {UpdateCategory}/>
        <Stack.Screen name = "ListSupplier" options={{headerShown: false}} component= {ListSupplier}/>
        <Stack.Screen name = "AddSupplier" options={{headerShown: false}} component= {AddSupplier}/>
        <Stack.Screen name = "UpdateSupplier" options={{headerShown: false}} component= {UpdateSupplier}/>
        <Stack.Screen name = "ListCustomer" options={{headerShown: false}} component= {ListCustomer}/>
        <Stack.Screen name = "ListProduct" options={{headerShown: false}} component= {ListProduct}/>
        <Stack.Screen name = "AddProduct" options={{headerShown: false}} component= {AddProduct}/>
        <Stack.Screen name = "UpdateProduct" options={{headerShown: false}} component= {UpdateProduct}/>
        <Stack.Screen name = "ListBill" options={{headerShown: false}} component= {ListBill}/>
        <Stack.Screen name = "ListEntry" options={{headerShown: false}} component= {ListEntry}/>
        <Stack.Screen name = "Report" options={{headerShown: false}} component= {Report}/>
        <Stack.Screen name = "AddCustomer" options={{headerShown: false}} component= {AddCustomer}/>
        <Stack.Screen name = "UpdateCustomer" options={{headerShown: false}} component= {UpdateCustomer}/>
        <Stack.Screen name = "Acount" options={{headerShown: false}} component= {Acount}/>
        <Stack.Screen name = "ResetPassword" options={{headerShown: false}} component= {ResetPassword}/>
        <Stack.Screen name = "UpdateAcount" options={{headerShown: false}} component= {UpdateAcount}/>
        <Stack.Screen name = "Regulation" options={{headerShown: false}} component= {Regulation}/>
        <Stack.Screen name = "SearchCategory" options={{headerShown: false}} component= {SearchCategory}/>
        <Stack.Screen name = "SearchSupplier" options={{headerShown: false}} component= {SearchSupplier}/>
        <Stack.Screen name = "SearchCustomer" options={{headerShown: false}} component= {SearchCustomer}/>
        <Stack.Screen name = "SearchProduct" options={{headerShown: false}} component= {SearchProduct}/>
        <Stack.Screen name = "AddBill" options={{headerShown: false}} component= {AddBill}/>
        <Stack.Screen name = "AddEntry" options={{headerShown: false}} component= {AddEntry}/>
        <Stack.Screen name = "DetailBill" options={{headerShown: false}} component= {DetailBill}/>
        <Stack.Screen name = "DetailEntry" options={{headerShown: false}} component= {DetailEntry}/>
        <Stack.Screen name = "ReportYear" options={{headerShown: false}} component= {ReportYear}/>
        <Stack.Screen name = "ReportTurnover" options={{headerShown: false}} component= {ReportTurnover}/>
        <Stack.Screen name = "ReportByYear" options={{headerShown: false}} component= {ReportByYear}/>
        <Stack.Screen name = "ReportByMonth" options={{headerShown: false}} component= {ReportByMonth}/>
        <Stack.Screen name = "Top10ProductByYear" options={{headerShown: false}} component= {Top10ProductByYear}/>
        <Stack.Screen name = "Top10CustomerByYear" options={{headerShown: false}} component= {Top10CustomerByYear}/>
        <Stack.Screen name = "Top10ProductByMonth" options={{headerShown: false}} component= {Top10ProductByMonth}/>
        <Stack.Screen name = "ReportTurnoverByMonth" options={{headerShown: false}} component= {ReportTurnoverByMonth}/>
        <Stack.Screen name = "ReportStockByMonth" options={{headerShown: false}} component= {ReportStockByMonth}/>
    </Stack.Navigator>
    </NavigationContainer>
    );
  }
