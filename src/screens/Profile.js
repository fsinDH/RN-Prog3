import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, FlatList, ActivityIndicator, ScrollView} from 'react-native';
import { auth, db } from '../firebase/config';
import Ionicons from "react-native-vector-icons/Ionicons";
import { setStatusBarHidden } from 'expo-status-bar';
import Post from '../components/Post';
import Loader from '../components/Loader'


export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state={
            posts: [],
            loading:true,
            users: '',
        };
    }

    addPostRedirect() {
        this.props.navigation.navigate("NewPost");
    }

    logOut(){
        auth.signOut();
        this.props.navigation.navigate('Register')

    }

    componentDidMount() {
      db
      .collection('posts')
      /* PARA QUE SOLO APAREZCAN LAS PUBLICACIONES DEL MAIL ABIERTO */
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot(
        docs => {
        let posts = [];
        docs.forEach( doc => {
          posts.push({ 
            id: doc.id, 
            data: doc.data() 
          });
        
        });
        this.setState({ 
          posts: posts,
          loading: false
        });
      });
    }

    render() {
        return (
          this.state.loading? <Loader/> :
            <>
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.inLine}>
                        <Text style={styles.username}>
                            Hola! {auth.currentUser.email}
                        </Text>
                        <TouchableOpacity onPress={() => this.logOut()}>
                            <Ionicons
                            style={styles.icon}
                            name="log-out-outline"
                            size="26px"
                            color="red"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* header */}
                {this.state.posts.length > 0 ? (
                  <View>
                      <Text style={styles.titulos}>Tus Posteos</Text>
                  <FlatList 
                    data={this.state.posts}
                    keyExtractor={ post => post.id}
                    renderItem={({item})=> <Post post={item}/>}
                  />
                  </View>
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
            </ScrollView>
            </>
        );
       
    }
}

const styles = StyleSheet.create({
  
    header: {
      backgroundColor: 'rgba (255, 0, 25, 56)',
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
      textAlign: "center"
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
      backgroundColor: "#FF9C33",
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
      textAlign: "center",
      color: "black",
      fontWeight: "600",
      fontSize: 20,
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
    titulos: {
      fontWeight: "700",
      boxSizing: "border-box",
      width: "100%",
      padding: 10,
      position: "relative",
      zIndex: 0,
      flexDirection: "column",
      textAlign: "center",
    }
  });