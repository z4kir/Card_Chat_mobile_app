import React from 'react'
import { View, Text, Button, Dimensions, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import axios from 'axios';
import base_url from './base_url';
import { useNavigation } from '@react-navigation/core';
import * as SQLite from 'expo-sqlite';
import { useNetInfo } from '@react-native-community/netinfo'





const disp = Dimensions.get('screen').width
const cardWidth = (disp * 90) / 100;

const db = SQLite.openDatabase('course');

function Course({ course, update }) {
    // const net = useNetInfo();
    // const net=false;




    const navigation = useNavigation();

    // // offline delete
    // const deleteOffline = (id) => {
    //     db.transaction((tx) => {

    //         tx.executeSql('DELETE FROM course WHERE id = ? ',
    //             [id],
    //             (txn, results) => { update(id) },
    //             (error) => { console.log(error) }
    //         )
    //     })

    // }





    // //online delete
    // const deletefromdata = (id) => {
    //     db.transaction((tx) => {

    //         tx.executeSql('DELETE FROM course WHERE id = ? ',
    //             [id],
    //             (txn, results) => { },
    //             (error) => { console.log(error) }
    //         )
    //     })

    // }


    const deleteCourse = (id) => {
        axios.delete(`${base_url}/delete-course/${id}`).then(
            (response) => {
                //    toast.success("course is successfully removed",{position:"bottom-center"});
                update(id);
                // deletefromdata(id);

            },
            (error) => {
                //    toast.error("something went wrong",{position:"bottom-center"});
                Alert.alert('Error', "something went wrong when deleting")

            }
        )

    }

    return (

        <Card containerStyle={{ borderRadius: 8, width: cardWidth, marginTop: 5, zIndex: 1 }}>
            <Card.Title style={{ fontSize: 24 }} >{course.courseName}</Card.Title>
            <Card.Divider style={{ backgroundColor: "white", }} />

            <Text style={{ textAlign: 'center', marginBottom: 15, fontSize: 18 }}>{course.courseDescription}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                <View style={{ marginEnd: 8 }}>
                    <Button title="Update" color="orange" onPress={() => {
                        navigation.navigate('Update', { course });
                    }} />
                </View>
                <View>
                    <Button title="Delete" color="red" onPress={() => {
                        // if (net.isInternetReachable) {
                            deleteCourse(course.courseId);
                        // } else {

                        //     deleteOffline(course.id)
                        // }


                    }}
                    />
                </View>
            </View>
        </Card>

    )
}

export default Course;
