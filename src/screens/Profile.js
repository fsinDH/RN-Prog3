import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, FlatList, ActivityIndicator, } from 'react-native';
import { auth, db } from '../firebase/config';
import Ionicons from "react-native-vector-icons/Ionicons";
import { setStatusBarHidden } from 'expo-status-bar';


export default class Profile extends Component {
    constructor() {
        super()
        this.state={
            posts: [],
            loading:true,
        };
    }

    componentDidMount() {
        db.collection("posts")
        .where("owner","==", auth.currentUser.email)

        .onSnapshot(
            (docs) => {
                let postsAux = [];
                docs.forEach((doc) => {
                    postsAux.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                this.setState({
                    posts: postsAux,
                });
                console.log(this.state.posts);
            }
        );
    }

    addPostRedirect() {
        this.props.navigation.navigate("NewPost");
    }

    logOut(){
        auth.signOut();
        this.props.navigation.navigate('Register')

    }

    render() {
        return (
            <>
            <View style={StyleSheet.container}>
                <View style={StyleSheet.header}>
                    <View style={StyleSheet.inLine}>
                        <Text style={StyleSheet.username}>
                            {auth.currentUser.email}
                        </Text>
                        <TouchableOpacity onPress={() => this.logOut()}>
                            <Ionicons
                            style={StyleSheet.icon}
                            name="log-out-outline"
                            size="20px"
                            color="white"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* header */}
                {this.state.posts.length > 0 ? (
                    <FlatList
                    showsHorizontalScrollIndicator={false}
                    style={StyleSheet.flastlist}
                    data={this.state.posts}
                    keyExtractor={(post) => post.id.toString()}
                    renderItem={(item) => <Post dataPost={item} {...this.props} />}
                    />
                ) : (
                <View style={styles.noFlatlist}>
                    <Text style={styles.textBlack}>
                    No tenés niguna publicación.
                    </Text>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => this.addPostRedirect()}
                >
                  <Text>¡Creá tu primer posteo!</Text>
                </TouchableOpacity>
              </View>
                )}
            </View>
            </>
        );
       
    }
}

const styles = StyleSheet.create({
    container: {
      overflow: "hidden",
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#aaa",
      color: "#ff9f68",
    },
    header: {
      backgroundColor: "#22223b",
      boxSizing: "border-box",
      width: "100%",
      padding: 10,
      position: "relative",
      zIndex: 0,
      flexDirection: "column",
      justifyContent: "space-around",
    },
    inline: {
      flexWrap: "wrap",
      alignItems: "space-between",
      flexDirection: "row",
      margin: 5,
      justifyContent: "space-between",
    },
    icon: {
      margin: 5,
    },
    flatlist: {
      overflow: "hidden",
      width: "100%",
      flex: 9,
      flexDirection: "column",
    },
    noFlatlist: {
      overflow: "hidden",
      width: "100%",
      flex: 9,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    btn: {
      backgroundColor: "#ffb703",
      color: "black",
      textAlign: "center",
      padding: 7,
      marginTop: 5,
      borderRadius: 15,
      width: "80%",
    },
    text: {
      color: "white",
      textAlign: "center",
      margin: 5,
    },
    textBlack: {
      color: "black",
      textAlign: "center",
      margin: 30,
    },
    username: {
      textAlign: "left",
      color: "white",
      fontWeight: "600",
      fontSize: 15,
      padding: 5,
    },
    modal: {
      border: "none",
      width: "100%",
      marginTop: 10,
      flexDirection: "column",
      justifyContent: "space-around",
    },
    boldText: {
      fontSize: "30",
      fontWeight: "bold",
    },
    paddingLeft: {
      paddingLeft: "5px",
    },
  });