import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  LayoutChangeEvent,
} from "react-native";
import SelectedItemsDisplay from "./SelectedItemsDisplay";

type AutocompleteComponentProps = {
  data: {
    [key: string]: string[];
  };
};

const AutocompleteComponent: React.FC<AutocompleteComponentProps> = ({
  data,
}) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [parentHeight, setParentHeight] = useState(0);

  const keys = Object.keys(data);
  const inputRef = useRef<TextInput>(null);

  const filteredData = keys.reduce(
    (acc: { [key: string]: string[] }, key: string) => {
      acc[key] = data[key].filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      return acc;
    },
    {}
  );

  const handleSelectItem = (item: string) => {
    if (!selectedItems.includes(item)) {
      const updatedSelectedItems = [...selectedItems, item];
      setSelectedItems(updatedSelectedItems);
    }
  };

  const handleRemoveItem = (item: string) => {
    const updatedSelectedItems = selectedItems.filter((i) => i !== item);
    setSelectedItems(updatedSelectedItems);
  };

  const handleRemoveAllSelectedItems = () => {
    setSelectedItems([]);
  };

  const handleSetFocuse = () => {
    setIsFocused(true);
    inputRef.current?.focus();
  };
  const handleChangeFocuse = () => {
    setIsFocused(!isFocused);
  };

  const handleParentLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setParentHeight(height);
  };

  return (
    <TouchableWithoutFeedback onPress={handleSetFocuse}>
      <View style={styles.container} onLayout={handleParentLayout}>
        <View style={[styles.autoCompleteInput, isFocused && styles.focusedAutoCompleteInput]}>
          <View style={styles.autoCompleteSelectedItemsAndInput}>
            {selectedItems.map((item, index) => (
              <View key={index} style={styles.selectedItem}>
                <Text style={styles.selectedItemText}>{item}</Text>
                <TouchableOpacity onPress={() => handleRemoveItem(item)}>
                  <Text style={styles.removeItem}>✖</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TextInput
              onPress={handleSetFocuse}
              ref={inputRef}
              style={styles.input}
              placeholder="Select options..."
              value={query}
              onChangeText={(text) => setQuery(text)}
            />
          </View>
          <SelectedItemsDisplay
            selectedItems={selectedItems}
            onClearSelection={handleRemoveAllSelectedItems}
            onArrowClick={handleChangeFocuse}
            isFocused={isFocused}
          />
        </View>

        {isFocused && (
          <View style={[styles.resultContainer, { top: parentHeight + 5 }]}>
            {keys.map((key, index) => {
              const categoryTitle = key.charAt(0).toUpperCase() + key.slice(1);
              return (
                <View
                  key={key}
                  style={[
                    styles.resultItem,
                    index !== keys.length - 1 && styles.resultItemNotLastChild,
                  ]}
                >
                  <Text style={styles.categoryTitle}>{categoryTitle}</Text>
                  {filteredData[key].length > 0 ? (
                    <View>
                      <FlatList
                        data={filteredData[key]}
                        keyExtractor={(item) => item}
                        contentContainerStyle={styles.listContainer}
                        renderItem={({ item }) => {
                          const isSelected = selectedItems.includes(item);
                          return (
                            <TouchableOpacity
                              onPress={() => handleSelectItem(item)}
                              style={isSelected && styles.disabledItem}
                              disabled={isSelected}
                            >
                              <Text style={styles.item}>{item}</Text>
                            </TouchableOpacity>
                          );
                        }}
                      />
                    </View>
                  ) : (
                    <Text style={styles.zeroOptions}>
                      No options found for {categoryTitle}{" "}
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  autoCompleteInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    gap: 8,
  },
  focusedAutoCompleteInput: {
    borderColor: "#5bc6f8"
  },
  autoCompleteSelectedItemsAndInput: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "0%",
  },
  selectedItemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  selectedItem: {
    backgroundColor: "#E5EDFA",
    borderRadius: 8,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  selectedItemText: {
    marginRight: 5,
  },
  resultContainer: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 6,
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  resultItem: {
    paddingBottom: 8
  },
  resultItemNotLastChild: {
    borderBottomColor: "#edebeb",
    borderBottomWidth: 1,
  },
  removeItem: {
    color: "#ee4f4f",
    fontWeight: "bold",
    paddingHorizontal: 2
  },
  input: {},
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    color: "#3E3E40",
  },
  item: {
    color: "#4a4a4a",
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  disabledItem: {
    backgroundColor: "#eaeef4",
    opacity: 0.6,
  },
  zeroOptions: {
    padding: 12,
    textAlign: "center",
    borderRadius: 2,
  },
});

export default AutocompleteComponent;
