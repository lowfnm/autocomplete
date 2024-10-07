import { StyleSheet, View } from "react-native";

import React from "react";
import AutocompleteComponent from "@/components/AutoCompleteComponent";

const data = {
  usernames: ["best_painter", "no_1_car_mechanic", "electrician"],
  categories: ["Painter", "Carpenter", "Car Painter"],
};

export default function HomeScreen() {
  return (
    <View style={styles.homeContainer}>
      <AutocompleteComponent data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 50,
    flex: 1,
    padding: 20,
  },
});
