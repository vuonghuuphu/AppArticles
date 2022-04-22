import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, Image,TouchableOpacity,TextInput} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Route } from "../Common/Enum";
import Imgdetail from "../Img/3d-model.png"
import Imgupdate from "../Img/edit.png"
import Imgdelete from "../Img/delete.png"
import ImgAdd from "../Img/add.png"
import ImgSearch from "../Img/searching.png"

export default function ScreenHome(props) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setsearch] = useState(null);

  const getArticles = async () => {
    try {
      const response = await fetch(`${Route.url}${Route.url_articles}`);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteitem = async(id)=>{
    try {
        fetch(`${Route.url}${Route.url_articles}/${id}`, { method: 'DELETE' })
        props.navigation.replace('Home',{
          check:1,
        })
    } catch (error) {
      console.log(error);
    }
  };

  const searchArticles = async(key)=>{
    try {
        const response = await fetch(`${Route.url}${Route.url_search_articles}${key}`);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
  };

  

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
        <View style={{flexDirection:'row',justifyContent:'center'}}>
        <TextInput
          style={{
            width: "80%",
            height: 40,
            borderWidth: 1,
            paddingStart: 10,
            marginBottom: 20,
            marginTop: 10,
          }}
          placeholder={"Enter search"}
          onChangeText={(text) => {
            setsearch(text);
          }}
          value={search}
        />
        <TouchableOpacity
  onPress={() => searchArticles(search)}
>
<Image
                  style={{ height: 40, width: 40 ,backgroundColor:'green',marginTop:'26%'}}
                  source={ImgSearch}
                />
</TouchableOpacity>
</View>
                          <View>
                  <TouchableOpacity onPress={() => props.navigation.navigate("From",{
                      id : 0,
                  })}>
                      
            <Image style={{ width: 20, height: 20 ,margin:10}} source={ImgAdd} />
          </TouchableOpacity>
                  </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
                borderColor: "green",
                borderWidth: 1,
                marginBottom: "2%",
              }}
            >
              <View>
                <Image
                  style={{ height: 50, width: 50 }}
                  source={{
                    uri: item.img,
                  }}
                />
              </View>
              <View>
                <Text>Title : {item.title}</Text>
                <Text>categories : {item.categories}</Text>
              </View>

              <View  
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
                  <View>
                  <TouchableOpacity onPress={() => props.navigation.navigate("Detail",{
                      id : item.id,
                  }
                  )}>
            <Image style={{ width: 20, height: 20}} source={Imgdetail} />
          </TouchableOpacity>
                  </View>
                  <View>
                  <TouchableOpacity onPress={() => props.navigation.navigate("From",{
                      id : item.id, 
                  })}>
            <Image style={{ width: 20, height: 20 ,marginLeft:10}} source={Imgupdate} />
          </TouchableOpacity>
                  </View>
                  <View>
                  <TouchableOpacity onPress={() => deleteitem(item.id)}>
            <Image style={{ width: 20, height: 20 ,marginLeft:10 }} source={Imgdelete} />
          </TouchableOpacity>
                  </View>
              </View>


            </View>
          )}
        />
      )}
    </View>
  );
}
