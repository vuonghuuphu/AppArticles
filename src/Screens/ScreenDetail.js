import React,{useState,useEffect} from "react";
import { View ,Text, TouchableOpacity, Image, TextInput, ImageBackground, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Route } from "../Common/Enum";

export default function ScreenDetail(props){
    const { id } = props.route.params;

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
  
    const getArticlesdetail = async () => {
      try {
        const response = await fetch(`${Route.url}${Route.url_articles}/${id}`);
        const json = await response.json();
        setData(json);
        console.log(json)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
        getArticlesdetail();
    }, []);
  

    return(
        <SafeAreaView>
        <View>
        <Image
                  style={{ height: "55%", width: "100%" }}
                  source={{
                    uri: data.img,
                  }}
                />
            <Text>title : {data.title}</Text>
            <Text>categories : {data.categories}</Text>
            <Text>content : {data.content}</Text>
            <Text>description : {data.description}</Text>
            <Text>createAt : {data.createAt}</Text>
            <Text>updateAt : {data.updateAt}</Text>
        </View>
        </SafeAreaView>

    );
}