import React, { Component } from 'react'
import {
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity, 
    FlatList, View
  } from "react-native";
import firebase from "firebase";
import { auth, db } from "../firebase/config";

export default class Comments extends Component {
    constructor(props){
        super(props);
        this.state={
            userComment: "",
            comments: [],
            users:[]
        }
    }

    componentDidMount() {
        db.collection("posts")
            .doc(this.props.route.params.id)
            .onSnapshot(doc => {
              let comments = doc.data().comments
                this.setState({
                    userComment: comments,
                })
            })
    }

    crearComment() {
        db.collection("posts")
        .doc(this.props.route.params.id)
        .update({
            /* Guardamos el comentario en el array comments */
            comments: firebase.firestore.FieldValue.arrayUnion({
              owner: auth.currentUser.email,
              createdAt: Date.now(),
              commentText: this.state.userComment,
            }),
          })
          .then(() => {
            this.setState({
                userComment: "",
            })
        })
          .catch( err => console.log(err))
    }

  render() {
    console.log(this.state.userComment)

    return (
      <>
        <Text> COMMENTS </Text>

        <FlatList styles = {styles.comentario}
            data={this.state.userComment}
            keyExtractor={(userComment) => userComment.id}
            renderItem={({ item }) => (
                <>
                  <Text>{item.owner}</Text>
                  <Text>{item.commentText}</Text>
                </>
            )}
        />

        <TextInput styles = {styles.comentario}
          keyboardType="default"
          placeholder="Escribe un comentario..."
          placeholderTextColor="#black"
          multiline={true}
          numberOfLines={3}
          onChangeText={(userComment) => this.setState({ userComment: userComment })}
          /* value={this.state.userComment} */
        />
        <TouchableOpacity
          onPress={() => this.crearComment()}
        >
          <Text>Comentar</Text>
        </TouchableOpacity>
      </>
    )
  }
}
  const styles = StyleSheet.create({
    comentario: {
      overflow: "hidden",
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#red",
      color: "#ff9f68",
    },
  });

