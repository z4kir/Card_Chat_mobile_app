// import { StatusBar } from 'expo-status-bar';
// import React,{useState} from 'react';
// import { Alert, Button, StyleSheet, Text, View } from 'react-native';





// function Name(props) {
//   return (
//     <View>
//       <Text style={props.style} selectable>{props.name}</Text>   
//     </View>
//   )
// }


// export default function App() {

//   const [count,setCount]=useState(0)
//   return (
//     <View  style={styles.container}>
//       <Name style={styles.textStyle} name="aabid" />
//       <Button color="black" title="click me" onPress={()=>{
//         if (count > 9) {
//           setCount(1) ; 
//         }
//         else{
//           setCount(count+1)
//         }
//         Alert.alert("Button is pressed "+count);
//         }}/>
//       <StatusBar  style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'yellow',
//     alignItems: 'center',
//     justifyContent: 'center',

//   },
//   textStyle:{
//     color:'orange',
//     fontSize: 50,

//   }

// });

import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";

import { Alert ,View,Text} from 'react-native';




import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";


import { FontAwesome, Entypo, MaterialIcons, AntDesign } from "@expo/vector-icons";


import { HomeScreen, AddCardsScreen, AllCardsScreen, AboutScreen, ContactScreen, UpdateScreen } from "./screens/index"
import { createStackNavigator } from '@react-navigation/stack';
// import { Card } from 'react-native-elements/dist/card/Card';
import * as SQLite from 'expo-sqlite';
import { useNetInfo } from '@react-native-community/netinfo';
import axios from 'axios';
import base_url from './components/base_url';

// SQLite.enablePromise(true);



const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
// const db = SQLite.openDatabase('course');





const DrawerContent=(props)=>{
//     const [dropDown, setdropDown] = useState('none')
//      useEffect(() => {
       
//     }, [dropDown])
    
//     const DropDown=()=>{
//         if(dropDown == 'none'){
//             setdropDown('flex')
//         }
//         else{
//             setdropDown('none')
//         }
//     }
    
    return(
<View style={{flex:1}}>
<DrawerContentScrollView >
    <View style={{marginTop:100,}}>
        <DrawerItem  icon={ ({ focused, color, size }) =>  (<FontAwesome name="home" size={size} color={color} focused={focused} />)} label="Home" onPress={()=>props.navigation.navigate('Home')}/>
 
        <DrawerItem   icon={ ({ focused, color, size }) =>  (<Entypo name="add-to-list" size={size} color={color} focused={focused} />)} label="Add Cards" onPress={()=>props.navigation.navigate('Add Cards')}/>
        
        
       {/* <View  style={{display:dropDown}}>
            <DrawerItem labelStyle={{marginLeft:70}} label='Online' onPress={()=>props.navigation.navigate('Add cards')} />
            <DrawerItem labelStyle={{marginLeft:70}} label='Offline'/>
        </View> */}
        
        <DrawerItem  icon={ ({ focused, color, size }) =>  (<FontAwesome name="list" size={size} color={color} focused={focused} />)} label="All Cards" onPress={()=>props.navigation.navigate('All Cards')}/>
        <DrawerItem  icon={ ({ focused, color, size }) =>  (<AntDesign name="exclamationcircle" size={size} color={color} focused={focused} />) } label="About" onPress={()=>props.navigation.navigate('About')}/>
        <DrawerItem  icon={ ({ focused, color, size }) =>  (<MaterialIcons name="contact-support" size={size} color={color} focused={focused} />)} label="Contact" onPress={()=>props.navigation.navigate('Contact')}/>
    </View>
</DrawerContentScrollView>
</View>
    )
    
    
}


function Root() {
    return (
     
        <Drawer.Navigator drawerContent={props=><DrawerContent {...props}/>}>           
            <Drawer.Screen   options={{drawerActiveBackgroundColor:'black'}}  name="Home" component={HomeScreen} />
            <Drawer.Screen  name="Add Cards" component={AddCardsScreen} />
            <Drawer.Screen name="All Cards" component={AllCardsScreen} />
            <Drawer.Screen  name="About" component={AboutScreen} />
            <Drawer.Screen name="Contact" component={ContactScreen} />
        </Drawer.Navigator>
    );
}

function App() {

    const net = useNetInfo();
    //   const net=false;




    // const [course, setcourse] = useState([{}]);

    // const [addCourse, setaddCourse] = useState([]);

    // const [latestCourse, setlatestCourse] = useState([]);

    // const [previousCourse, setpreviousCourse] = useState([])





    // useEffect(() => {
    //     // console.log(';;;;'+addCourse.length)
    //     createTable();
    // }, [])

    // useEffect(()=>{
    //     if (net.isConnected) {
    //         console.log('latest course : '+latestCourse.length)
    //         console.log('previous course : '+previousCourse.length)
    //         if (latestCourse.length>0) {

    //             latestCourse.forEach(element => {
    //                 if (previousCourse.some((c)=>{element.courseId != c.courseId}) || previousCourse.length != latestCourse.length) {
    //                     getAllCoursesFromServer();
    //                 }
    //                 else{
    //                     alwaysGettingCourseFromServer();
    //                 }       
    //             });
    //         }

    //             alwaysGettingCourseFromServer();

    //     }
    //     },[latestCourse])




    // useEffect(() => {
    //     console.log('net.isconnected : ' + net.isConnected)
    //     if (net.isConnected) {

    //         console.log('length:' + addCourse.length)
    //         getAllOffilneAddedCourse();
    //         alwaysGettingCourseFromServer();
    //     }
    // }, [net])

    // useEffect(() => {
    //     console.log("course length : " + course.length);
    //     if (net.isConnected) {
    //         clearCourse();
    //     }
    // }, [course])





    // useEffect(() => {
    //     // console.log('add course length : '+addCourse.length);
    //     if (addCourse.length > 0) {
    //         postDataTOServer();
    //     }
    // }, [addCourse])

    // offline data base



    // const addOfflineCourse = () => {



    //     db.transaction(txn => {


    //         txn.executeSql(

    //             'INSERT INTO course (courseName,courseDescription,operation) values (?,?,?)', [addCourse.courseName, addCourse.courseDescription, 'add']
    //             ,
    //             (tx, results) => {


    //             },
    //             (error) => {
    //                 console.log("add error: " + error)
    //             }
    //         )



    //     })

    // }
    // const getAllOffilneAddedCourse = () => {


    //     db.transaction(txn => {


    //         txn.executeSql(

    //             'SELECT * FROM course  WHERE operation= ?', ['add']
    //             ,
    //             (tx, results) => {
    //                 console.log("get add result :" + results.rows.length);

    //                 if (results.rows.length > 0) {
    //                     results.rows._array.forEach((item) => {
    //                         setaddCourse(results.rows._array)
    //                         console.log('added courses :' + item.courseName)
    //                         // postDataTOServer();
    //                         console.log('running...')
    //                     })
    //                 }
    //                 else {
    //                     getAllCoursesFromServer();
    //                 }
    //             },
    //         )
    //     })

    // }
    // const getCourseOffline1 = () => {
    //     db.transaction((tx) => {
    //         tx.executeSql(
    //             "SELECT * FROM course",
    //             [],
    //             (tx, results) => {
    //                 setcheck(results.rows._array)
    //                 results.rows._array.forEach(element => {
    //                     console.log("..." + element.courseName)
    //                 });
    //                 // setloading(false)
    //             },
    //             (error) => {
    //                 console.log(error)
    //             },
    //         )
    //     })

    // }

    // const clearCourse = () => {

    //     // console.log("Delete All")

    //     db.transaction(tx => {
    //         tx.executeSql(
    //             "DELETE  FROM course"
    //             ,
    //             [],
    //             (txn, results) => {
    //                 console.log("Delete Alll")
    //                 console.log('response1 ' + JSON.stringify(course))

    //                 setAllCourse()


    //             },
    //             (error) => { }

    //         )
    //     })


    // }

    // const setAllCourse = () => {

    //     console.log('course bedore setting : ' + JSON.stringify(course))
    //     course.sort((a, b) => (a.courseId > b.courseId) ? 1 : -1).forEach((item) => {
    //         console.log('forEach: ' + item.courseName)
    //         db.transaction(tx => {
    //             tx.executeSql(
    //                 'INSERT INTO course (courseId,courseName,courseDescription) values (?,?,?)',
    //                 [item.courseId, item.courseName, item.courseDescription],
    //                 (txn, results) => {
    //                     console.log("setcourse : " + results);
    //                 },
    //                 (error) => { console.log(error); }
    //             );
    //         })
    //     })
    //     // getCourseOffline1();


    // }


    // online database


    // * Adding Course

    // const postDataTOServer = () => {
    //     // console.log("course= " + JSON.stringify(addCourse))
    //     // console.log("data= " + addCourse[0].courseName)

    //     for (let i = 0; i < addCourse.length; i++) {

    //         axios.post(`${base_url}/add-course`, addCourse[i], { headers: { 'Content-Type': 'application/json' } }).then(
    //             (response) => {
    //                 console.log("success");
    //                 // getAllCoursesFromServer();

    //             }
    //             ,
    //             (error) => {
    //                 console.log(error);
    //                 Alert.alert('Error', "something went wrong when posting data")
    //             })
    //     }
    //     setaddCourse([]);
    // }


    // * Geting Courses


    // function to call server

    // const getAllCoursesFromServer = () => {


    //     axios.get(`${base_url}/view-courses`).then(
    //         (response) => {
    //             // if getting response from server(success)


    //             console.log("successfully getting courses")
    //             // setpreviousCourse(response.data);
    //             setcourse(response.data);


    //             // setloading(false)
    //         },
    //         (error) => {
    //             // if not getting any response from server(error)
    //             console.log(error);
    //             Alert.alert('Error', "something went wrong when retriving the data")

    //         }
    //     );

    // }

    // const alwaysGettingCourseFromServer = () => {


    //     axios.get(`${base_url}/view-courses`).then(
    //         (response) => {
    //             // if getting response from server(success)


    //             // console.log("successfully getting courses")
    //             setlatestCourse(response.data);
    //             // setloading(false)
    //         },
    //         (error) => {
    //             // if not getting any response from server(error)
    //             console.log(error);
    //             Alert.alert('Error', "something went wrong when retriving the data")

    //         }
    //     );

    // }

    // const createTable = () => {



    //     db.transaction(txn => {


    //         txn.executeSql(
    //             `CREATE TABLE IF NOT EXISTS course (id INTEGER PRIMARY KEY ,courseId INTEGER ,courseName TEXT,courseDescription TEXT,operation TEXT)`,
    //             [],
    //             (sqlTxn, res) => {
    //                 console.log("table created successfully")

    //             },
    //             (error) => {
    //                 console.log("error in creating table" + error)

    //             },
    //         );
    //     });

    // };
    return (
        <NavigationContainer >

            <Stack.Navigator screenOptions={{ animationEnabled: true, animationTypeForReplace: 'push' }}>

                <Stack.Screen options={{ headerShown: false }} name="root" component={Root} />

                <Stack.Screen name="Update" component={UpdateScreen} />
            </Stack.Navigator>

        </NavigationContainer>
    )
}

export default App

