import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  editable,
} from "react-native";

function IncrementPill({
  text,
  selectedPlan,
  setSelectedPlan,
  field,
  groupIndex,
  index,
  editable,
}) {
  const handleIncrement = (amount) => {
    let currentGroups = selectedPlan.groups;
    currentGroups[groupIndex].sets[index][field] =
      currentGroups[groupIndex].sets[index][field] + amount;
    setSelectedPlan({
      ...selectedPlan,
      groups: currentGroups,
    });
  };

  return (
    <View style={styles.container}>
      {editable ? (
        <>
          <TouchableOpacity
            style={styles.buttonHolderMinus}
            onPress={() => {
              handleIncrement(-1);
            }}
          >
            <Text style={styles.textCenter}>-</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View
            style={styles.buttonHolderMinus}
            onPress={
              editable
                ? () => {
                    handleIncrement(-1);
                  }
                : null
            }
          >
            <Text style={styles.none}>-</Text>
          </View>
        </>
      )}

      <View style={styles.pillText}>
        <Text style={styles.textCenter}>{text}</Text>
      </View>

      {editable ? (
        <>
          <TouchableOpacity
            style={styles.buttonHolderPlus}
            onPress={() => {
              handleIncrement(1);
            }}
          >
            <Text style={styles.textCenter}>+</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.buttonHolderPlus}>
            <Text style={styles.none}>+</Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonHolderPlus: {
    backgroundColor: "grey",
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    height: 50,
    paddingHorizontal: 10,
  },
  buttonHolderMinus: {
    backgroundColor: "grey",
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    height: 50,
    paddingHorizontal: 10,
  },
  textCenter: {
    textAlign: "center",
    fontSize: 18,
    paddingTop: 14,
  },
  pillText: {
    backgroundColor: "grey",
    height: 50,
    paddingHorizontal: 4,
  },
  none: {
    color: "grey",
    textAlign: "center",
    fontSize: 18,
    paddingTop: 14,
  },
});

export default IncrementPill;
