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
            comentario: "",
            comment: []
        }
    }

    componentDidMount() {
        db.collection("posts")
            .doc(this.props.route.params.id)
            .onSnapshot(doc => {

                this.setState({
                    comment: doc.data().comments
                })

                console.log(this.state.comment)
                console.log(doc.data().comments)
            })
    }

    comment() {
        db.collection("posts")
        .doc(this.props.route.params.id)
        .update({
            /* Guardamos el comentario en el array comments */
            comments: firebase.firestore.FieldValue.arrayUnion({
              owner: auth.currentUser.email,
              comentario: this.state.comentario,
            }),
          })
          .then(() => {
            this.setState({
              /* Esto es para borrar del textInput el comentario despues de guardarlo */
              comentario: "",
            });
          });
    }

  render() {
    console.log(this.props.route.params.id)

    return (
      <>
        <Text> COMMENTS </Text>

        <FlatList
            data={this.state.comment}
            keyExtractor={(comment) => comment.id}
            renderItem={({ item }) => (
                <>
                  <Text>{item.owner}</Text>
                  <Text>{item.comentario}</Text>
                </>
            )}
        />

        <TextInput
          keyboardType="default"
          placeholder="Escribe un comentario..."
          placeholderTextColor="#d7d5d5"
          multiline={true}
          numberOfLines={3}
          onChangeText={(text) => this.setState({ comentario: text })}
          value={this.state.comentario}
        />
        <TouchableOpacity
          onPress={() => this.comment()}
        >
          <Text>Comentar</Text>
        </TouchableOpacity>
      </>
    )
  }
}