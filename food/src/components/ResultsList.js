import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import ResultDetail from "./ResultDetail";

const ResultsList = ({ title, results, navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        style={{ marginTop: 10 }}
        horizontal
        data={results}
        keyExtractor={(result) => result.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ResultsShowScreen", { id: item.id });
              }}
            >
              <ResultDetail navigation={navigation} {...item}></ResultDetail>
            </TouchableOpacity>
          );
        }}
      ></FlatList>
      {results.length === 0 && (
        <Text style={{ marginLeft: 15, color: "red" }}>
          No Results at The Moment
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ResultsList;
