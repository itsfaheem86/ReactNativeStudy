import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import yelp from "../api/yelp";
import ResultDetail from "../components/ResultDetail";

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const id = navigation.getParam("id");

  const getResult = async (id) => {
    const res = await yelp.get(`/${id}`);
    setResult(res.data);
  };

  useEffect(() => {
    getResult(id);
  }, []);

  return (
    <ScrollView>
      <Text>#ID : {id}</Text>
      {result &&
        result.photos.map((photo, key) => {
          return (
            <ResultDetail
              style={[styles.image, styles.container]}
              key={key}
              image_url={photo}
            ></ResultDetail>
          );
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    padding: 20,
  },
});

export default ResultsShowScreen;
