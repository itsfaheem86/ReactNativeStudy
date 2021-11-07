import React, { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import ResultsList from "../components/ResultsList";
import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults";

export default function SearchScreen(props) {
  const [term, setTerm] = useState();
  const [searchAPI, results, errorMessage] = useResults();

  const filterResultsByPrice = (price) => {
    // price === "$" || "$$" || "$$$"
    return results.filter((result) => {
      return result.price === price;
    });
  };

  return (
    <ScrollView>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchAPI(term)}
      ></SearchBar>
      {errorMessage && <Text>{errorMessage}</Text>}
      <ResultsList
        {...props}
        results={filterResultsByPrice("$")}
        title="Cost Effective"
      ></ResultsList>
      <ResultsList
        {...props}
        results={filterResultsByPrice("$$")}
        title="Bit Pricer"
      ></ResultsList>
      <ResultsList
        {...props}
        results={filterResultsByPrice("$$$")}
        title="Big Spender"
      ></ResultsList>
      {/* <ResultsList
        results={filterResultsByPrice("$$$$")}
        title="Multi Million Spender"
      ></ResultsList> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
