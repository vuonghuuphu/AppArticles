import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Route } from "../Common/Enum";

export default function ScreenFrom(props) {
  const { id } = props.route.params;
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [title, settitle] = useState(null);
  const [category, setcategory] = useState(null);
  const [Img, setImg] = useState(null);
  const [Content, setContent] = useState(null);
  const [description, setdescription] = useState(null);
  const [createAt, setcreateAt] = useState(null);
  const [status, setstatus] = useState(null);

  const getArticlesdetail = async () => {
    try {
      const response = await fetch(`${Route.url}${Route.url_articles}/${id}`);
      const json = await response.json();
      settitle(json.title)
      setContent(json.content)
      setcategory(json.categories)
      setdescription(json.description)
      setImg(json.img)
      setcreateAt(json.createAt)
      setstatus(json.status)
      
      console.log(json)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const add = async () => {
    try {
      if (title != "") {
        fetch(`${Route.url}${Route.url_articles}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: Content,
            categories: category,
            img: Img,
            title: title,
            description: description,
            status: 1
          }),
        });
        props.navigation.replace("Home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const edit = async (idEdit) => {
    try {
      if (title != "") {
        fetch(`${Route.url}${Route.url_articles}/${idEdit}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: Content,
            categories: category,
            img: Img,
            title: title,
            createAt: createAt,
            description: description,
            status: status
          }),
        });
        props.navigation.replace("Home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(id != 0){
        getArticlesdetail();
    }
  }, []);

  return (
    <SafeAreaView>
      <View style={{ margin: 10, alignItems: "center" }}>
        <Text>Create</Text>
        <TextInput
          style={{
            width: "80%",
            height: 40,
            borderWidth: 1,
            borderRadius: 10,
            paddingStart: 10,
            marginBottom: 20,
            marginTop: 10,
          }}
          placeholder={"Enter title"}
          onChangeText={(text) => {
            settitle(text);
          }}
          value={title}
        />
        <TextInput
          style={{
            width: "80%",
            height: 40,
            borderWidth: 1,
            borderRadius: 10,
            paddingStart: 10,
            marginBottom: 20,
            marginTop: 10,
          }}
          placeholder={"Enter category"}
          onChangeText={(text) => {
            setcategory(text);
          }}
          value={category}
        />
        <TextInput
          style={{
            width: "80%",
            height: 40,
            borderWidth: 1,
            borderRadius: 10,
            paddingStart: 10,
            marginBottom: 20,
            marginTop: 10,
          }}
          placeholder={"Enter Img"}
          onChangeText={(text) => {
            setImg(text);
          }}
          value={Img}
        />
        <TextInput
          style={{
            width: "80%",
            height: 40,
            borderWidth: 1,
            borderRadius: 10,
            paddingStart: 10,
            marginBottom: 20,
            marginTop: 10,
          }}
          placeholder={"Enter Content"}
          onChangeText={(text) => {
            setContent(text);
          }}
          value={Content}
        />
        <TextInput
          style={{
            width: "80%",
            height: 40,
            borderWidth: 1,
            borderRadius: 10,
            paddingStart: 10,
            marginBottom: 20,
            marginTop: 10,
          }}
          placeholder={"Enter description"}
          onChangeText={(text) => {
            setdescription(text);
          }}
          value={description}
        />
      </View>

      {(id == 0) && 

      <TouchableOpacity
        style={{
          backgroundColor: "green",
          padding: 8,
          margin: 10,
        }}
        onPress={() => add()}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Add</Text>
      </TouchableOpacity>
}
{(id != 0) && 

<TouchableOpacity
  style={{
    backgroundColor: "blue",
    padding: 8,
    margin: 10,
  }}
  onPress={() => edit(id)}
>
  <Text style={{ color: "white", textAlign: "center" }}>Edit</Text>
</TouchableOpacity>
}
    </SafeAreaView>
  );
}
