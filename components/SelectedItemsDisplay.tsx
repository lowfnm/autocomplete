import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type SelectedItemsDisplayProps = {
  selectedItems: string[];
  isFocused: boolean;
  onClearSelection: () => void;
  onArrowClick: () => void;
};

const SelectedItemsDisplay: React.FC<SelectedItemsDisplayProps> = ({
  selectedItems,
  isFocused,
  onClearSelection,
  onArrowClick,
}) => {
  return (
    <View style={styles.container}>
      {selectedItems.length > 0 && (
        <TouchableOpacity onPress={onClearSelection} style={styles.clearButton}>
          <Text style={styles.clearText}>✖</Text>
        </TouchableOpacity>
      )}

      <View style={styles.divider} />

      <TouchableOpacity onPress={onArrowClick} style={styles.arrowButton}>
        <MaterialIcons style={[styles.icon, isFocused && styles.focusedIcon]} name="arrow-drop-down" size={24} color="#ccc" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    flexShrink: 0,
  },
  clearButton: {
    marginRight: 5,
  },
  clearText: {
    fontSize: 18,
    color: "#db5050",
  },
  divider: {
    width: 1,
    height: "100%",
    backgroundColor: "#ccc",
    marginHorizontal: 10,
  },
  arrowButton: {},
  icon: {
    color: "#ccc"
  },
  focusedIcon: {
    color: "#7b7a7a"
  }
});

export default SelectedItemsDisplay;
