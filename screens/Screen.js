import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Button, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { Card, Input } from 'react-native-elements';
import Course from '../components/Course';
import axios from 'axios';
import base_url from '../components/base_url';
import { useRoute } from '@react-navigation/core';
// import * as SQLite from 'expo-sqlite';
import { TextInput } from 'react-native-gesture-handler';
import { NetInfoStateType, useNetInfo } from '@react-native-community/netinfo'





const disp = Dimensions.get('screen').width
const cardWidth = (disp * 90) / 100;

// const db = SQLite.openDatabase('course');






function screen({ navigation, name }) {
    // checking device internet connection with the help of useNetInfo() Hook

    const net = useNetInfo();
    // const net = false;

    
    // useEffect(()=>{
    //     net=useNetInfo().isInternetReachable;
    // })


    // const [count, setCount] = useState(0)
    
    const [course, setCourse] = useState([])

    const [addCourse, setaddCourse] = useState([])

    
        // validation state
        const [validation, setValidation] = useState()
    
        // Loading state
        const [loading, setloading] = useState(true)

    // const [initialLaunch, setinitialLaunch] = useState(true);
    


    

    






    // // offline data base

    // // console.log("internet :"+net);


    // const addOfflineCourse = () => {

     

    //         db.transaction(txn => {


    //             txn.executeSql(

    //                 'INSERT INTO course (courseName,courseDescription,operation) values (?,?,?)', [addCourse.courseName, addCourse.courseDescription, 'add']
    //                 ,
    //                 (tx, results) => {


    //                 },
    //                 (error) => {
    //                     console.log("add error: " + error)
    //                 }
    //             )



    //         })
 
    // }
    // const getAllOffilneAddedCourse = () => {
    //     try {

    //         db.transaction(txn => {


    //             txn.executeSql(

    //                 'SELECT * FROM course  WHERE operation= ?', ['add']
    //                 ,
    //                 (tx, results) => {
    //                     // console.log("get add result :" + results.rows.length)
    //                     setCourse(results.rows._array)
    //                 },
    //                 (error) => {
    //                     console.log("add error: " + error)
    //                 }
    //             )



    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // const getCourseOffline =  () => {
        
    //         db.transaction((tx) => {
    //             tx.executeSql(
    //                 "SELECT * FROM course",
    //                 [],
    //                 (tx, results) => {
    //                     if (count == 0) {
                            
    //                         console.log('result :'+results.rows.length)
    //                         setCount(1);
    //                     }

                       
    //                         setCourse(results.rows._array);
                     
    //                     setloading(false)

    //                 },
    //                 (error) => {
    //                     console.log(error)
    //                 },
    //             )
    //         })
    
    // }

    // const clearCourse = () => {
      
    //         db.transaction(tx => {
    //             tx.executeSql(
    //                 "DELETE  FROM course",
    //                 [],
    //                 (txn, results) => { 
    //                     setAllCourse(); 
    //                 },
    //                 (error)=>{console.log(error);}
    //             )
    //         }
    //         )
   
    // }

    // const setAllCourse =  () => {
        
    //         course.forEach((item) => {
    //             console.log('forEach: ' + item.courseName)

    //             db.transaction(tx => {
    //                 tx.executeSql(
    //                     'INSERT INTO course (courseId,courseName,courseDescription) values (?,?,?)',
    //                     [item.courseId, item.courseName, item.courseDescription],
    //                     (txn, results) => { console.log("setcourse : " + results) },
    //                     () => { }
    //                 )
    //             })
    //         })
      
    // }


    // online database


    // * Adding Course



    const postDataTOServer = () => {
        console.log("course= " + JSON.stringify(addCourse))
        console.log("data= " + addCourse.courseName)
      
            axios.post(`${base_url}/add-course`, addCourse, { headers: { 'Content-Type': 'application/json' } }).then(
                (response) => {
                    console.log("success");
                    // if(net.isConnected){
                    //     console.log('bay...')
                    // getAllCoursesFromServerToTable();
                    // }

                }
                ,
                (error) => {
                    console.log(error);
                    Alert.alert('Error', "something went wrong when posting data")

                }

            )


  
    }


    // * Geting Courses


    // function to call server
    const getAllCoursesFromServer = () => {

       
            axios.get(`${base_url}/view-courses`).then(
                (response) => {
                    // if getting response from server(success)
                    setCourse(response.data);
                    setloading(false);
                },
                (error) => {
                    // if not getting any response from server(error)
                    console.log(error);
                    Alert.alert('Error', "something went wrong when retriving the data")

                }
            );

    }

    // // get all value from server to put in table
    // const getAllCoursesFromServerToTable = () => {

     
    //         axios.get(`${base_url}/view-courses`).then(
    //             (response) => {
    //                 // if getting response from server(success)
    //                 setCourse(response.data);

    //                 clearCourse();
    //             },
    //             (error) => {
    //                 // if not getting any response from server(error)
    //                 console.log(error);
    //                 Alert.alert('Error', "something went wrong when retriving the data")

    //             }
    //         );
     
    // }











    switch (name) {

        case "Home":
            return (
                <View style={styles.container}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={styles.innerContainer}>
                            <Card containerStyle={{ borderRadius: 8, backgroundColor: 'black', width: cardWidth }} >
                                <Card.Title style={{ color: 'white', fontSize: 28 }}>Hello! Want To Learn ReactJs</Card.Title>
                                <Card.Divider style={{ backgroundColor: "white" }} />

                                <Text style={{ color: 'white', fontSize: 18, marginBottom: 15 }}>If you want to learns reactjs, So just press the button</Text>
                                <Button title="Start" color="grey" onPress={() => { navigation.navigate('All Cards') }} />
                            </Card>
                        </View>
                    </SafeAreaView>
                </View>
            )
            break;





        case "Add Cards":
            const [validationValue, setValidationValue] = useState([{ nameValidation: '', descriptionValidation: "" }])
            return (
                <View style={styles.container}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={styles.innerContainer}>
                            <Card containerStyle={{ borderRadius: 8, width: cardWidth }} >
                                <Card.Title style={{ fontSize: 28 }}>Add Card</Card.Title>
                                <Card.Divider style={{ backgroundColor: "white" }} />

                                <Input editable id="name" value={validationValue.nameValidation} placeholder="Enter Crad Title" onChangeText={(e) => { setaddCourse({ ...addCourse, courseName: e }); setValidationValue({ ...validationValue, nameValidation: e }); }} />
                                <Text value={validation} style={{ color: 'red', paddingStart: 10 }}>{validation}</Text>
                                <Input editable id="Description" value={validationValue.descriptionValidation} placeholder="Enter Crad Description" onChangeText={(e) => { setaddCourse({ ...addCourse, courseDescription: e }); setValidationValue({ ...validationValue, descriptionValidation: e }); }} />
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                                    <View style={{ marginEnd: 8 }}>

                                        <Button title="Add Card" color="green" onPress={() => {
                                            // setcheck(check.push({courseName:validationValue.nameValidation,courseDescription:validationValue.descriptionValidation}))
                                            if (validationValue.nameValidation != "") {
                                                // Database setup according to internet connectivity
                                                if (net.isInternetReachable) {
                                                    postDataTOServer();
                                                }
                                                else {
                                                    Alert.alert("No Internet","please connect to the internet")
                                                }

                                                navigation.navigate('All Cards')
                                                setValidationValue({ ...validationValue, nameValidation: '', descriptionValidation: '' })
                                            }
                                            else {
                                                setValidation("Please provide Card title");
                                            }
                                        }} />
                                    </View>
                                    <View>
                                        <Button title="Clear text" color="orange" onPress={() => {
                                            setValidationValue({ ...validationValue, nameValidation: '', descriptionValidation: '' })
                                        }} />
                                    </View>
                                </View>
                            </Card>
                        </View>
                    </SafeAreaView>
                </View>
            )
            break;




        case "All Cards":
            // form handler method

                   
            useEffect(() => {
                // console.log("internet2 :" + net.isInternetReachable);


                // if (net.isConnected) {
                    // getCourseOffline();


                    getAllCoursesFromServer();
                  

                    // getAllOffilneAddedCourse();
               

                // }
                // else{
                //     setloading(false);
                // }
             
            }, [course])
            const updateCourse = (id) => {
                setCourse(course.filter((c) => c.courseId !== id))
                

            }



            return (
                <View style={styles.container}>
                    <SafeAreaView style={{ flex: 1 }}>

                        <Text  style={{ fontSize: 28, fontWeight: 'bold', alignSelf: 'center', marginTop: 3, zIndex: 99 }}>
                            All Cards
                        </Text>


                        <ScrollView style={{ marginBottom: 10, borderTopWidth: 2, borderColor: 'black', borderStyle: 'solid' }} >


                            {loading ? (<ActivityIndicator style={{ marginTop: 10 }} size="large" color="black" />)
                                : net.isInternetReachable
                                    ? (course.length > 0)
                                        ? course.sort((a, b) => (a.courseId > b.courseId) ? 1 : -1).map((item) => (<Course key={item.courseId} course={item} update={updateCourse} />))
                                        : <Text style={{ fontSize: 16, marginTop: 10 }} >No course found</Text>
                                    :  <Text style={{ fontSize: 16, marginTop: 10 }} >No Internet connection</Text>

                            }


                        </ScrollView>

                    </SafeAreaView>

                </View>
            )
            break;



        case "About":
            return (
                <View style={styles.container}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={styles.innerContainer}>
                            <Card containerStyle={{ borderRadius: 8, borderColor: '#c1c2c2', backgroundColor: "#eee", width: cardWidth }} >
                                <Card.Title style={{ fontSize: 28, fontFamily: "serif" }}>This Is Not An Actual Product</Card.Title>
                                <Card.Divider style={{}} />

                                <Text style={{ fontSize: 18, marginBottom: 15, textAlign: 'center', fontFamily: "serif" }}>This is just a practice project to learn React Native</Text>

                            </Card>
                        </View>
                    </SafeAreaView>
                </View>
            )
            braek;



        case "Contact":
            // const [table, settable] = useState({
            //     tableTitle: ['E-mail', 'Contact No'],
            //     tableData: ['skzakir78641@gmail.com', 'xxxxxxxx45']
            // })
            return (
                <View style={styles.container}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={styles.innerContainer}>
                            <Card containerStyle={{ borderRadius: 8, borderWidth: 1.5, borderColor: 'black', width: cardWidth }} >

                                <Card.Title style={{ fontSize: 28 }}>Contact Details</Card.Title>
                                <Card.Divider style={{ backgroundColor: 'black', height: 2 }} />
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                            <Text style={{ textAlign: 'center', fontWeight: 'bold' }} >
                                                E-mail
                                            </Text>
                                        </View>
                                        <Card.Divider />
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                            <Text style={{ textAlign: 'center', fontWeight: 'bold' }} >
                                                Contact No
                                            </Text>
                                        </View>
                                        <Card.Divider />
                                    </View>

                                    <View style={{ flexDirection: 'column' }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                            <Text style={{ textAlign: 'center' }} >
                                                skzakir78641@gmail.com
                                            </Text>
                                        </View>
                                        <Card.Divider />
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                            <Text style={{ textAlign: 'center' }} >
                                                xxxxxxxx45
                                            </Text>
                                        </View>
                                        <Card.Divider />
                                    </View>



                                </View>
                            </Card>
                        </View>
                    </SafeAreaView>
                </View>
            )
            break;

        case "Update":



            const route = useRoute();
            const forUpdating = route.params.course;



            const [courseForUpdate, setCourseForUpdate] = useState(forUpdating)


            // form handler method
            const handleFormForUpdate = () => {


                // postDataTOServerForUpdate(courseForUpdate);
                updateCourseOffline(courseForUpdate);
            }
            // offline update
            const updateCourseOffline = (data) => {

                db.transaction((tx) => {
                    tx.executeSql(
                        'UPDATE cours SET courseName = ? , courseDescription =? WHERE id = ?', [data.courseName, data.courseDescription, data.id],
                        (txn, results) => {

                        },
                        (error) => {
                            console.log(error)
                        }

                    )

                })

            }

            // send data to server

            const postDataTOServerForUpdate = (data) => {
                axios.put(`${base_url}/update-course/${data.courseId}`, data).then(
                    (response) => {
                        console.log("success");

                    }
                    ,
                    (error) => {
                        console.log(error);
                        console.log("error");
                    }

                )

            }





            return (
                <View style={styles.container}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={styles.innerContainer}>
                            <Card containerStyle={{ borderRadius: 8, width: cardWidth }} >
                                <Card.Title style={{ fontSize: 28 }}>Update Card</Card.Title>
                                <Card.Divider style={{ backgroundColor: "white" }} />

                                <Input editable value={courseForUpdate.courseName} id="name" placeholder="Enter Crad Title" onChangeText={(e) => { setCourseForUpdate({ ...courseForUpdate, courseName: e }) }} />
                                <Text value={validation} style={{ color: 'red', paddingStart: 10 }}>{validation}</Text>
                                <Input editable id="description" value={courseForUpdate.courseDescription} placeholder="Enter Crad Description" onChangeText={(e) => { setCourseForUpdate({ ...courseForUpdate, courseDescription: e }) }} />
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                                    <View style={{ marginEnd: 8 }}>
                                        <Button title="Update Card" color="green" onPress={() => {
                                            if (courseForUpdate.courseName != "") {
                                                handleFormForUpdate();
                                                navigation.navigate('All Cards')
                                            }
                                            else {
                                                setValidation("Please provide Card title");
                                            }
                                        }} />
                                    </View>
                                    <View>
                                        <Button title="Clear text" color="orange" onPress={() => {
                                            setCourseForUpdate({ ...courseForUpdate, courseName: '', courseDescription: '' })

                                            // document.getElementById("description")
                                        }} />
                                    </View>
                                </View>
                            </Card>
                        </View>
                    </SafeAreaView>
                </View>
            )
            break;

        default:
            return (
                <View style={styles.container}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={styles.container}>
                            <Text style={styles.text}>deafult Screen</Text>
                        </View>
                    </SafeAreaView>
                </View>
            )
            break;
    }






}

const tableStyles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 28 },
    text: { textAlign: 'center' }
});

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: "#FFf",
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    innerContainer: {
        flex: 1,
        backgroundColor: "#FFF",
        justifyContent: 'center',
        alignItems: 'center',
        width: disp
    },
    text: {
        color: "#161924",
        fontSize: 25,
        fontWeight: "500"
    },
    button: {
        fontSize: 20,
        display: 'flex'

    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },




})


export default screen
