import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ResultsList from "../components/ResultsList";
import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults";

export default function SearchScreen() {
  const [term, setTerm] = useState();
  const [searchAPI, results, errorMessage] = useResults();

  const filterResultsByPrice = (price) => {
    // price === "$" || "$$" || "$$$"
    return results.filter((result) => {
      return result.price === price;
    });
  };

  return (
    <View>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchAPI(term)}
      ></SearchBar>
      {errorMessage && <Text>{errorMessage}</Text>}
      <ResultsList
        results={filterResultsByPrice("$")}
        title="Cost Effective"
      ></ResultsList>
      <ResultsList
        results={filterResultsByPrice("$$")}
        title="Bit Pricer"
      ></ResultsList>
      <ResultsList
        results={filterResultsByPrice("$$$")}
        title="Big Spender"
      ></ResultsList>
      <ResultsList
        results={filterResultsByPrice("$$$$")}
        title="Multi Million Spender"
      ></ResultsList>
    </View>
  );
}

const styles = StyleSheet.create({});
