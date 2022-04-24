import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const App = () => {
  // シール台紙State
  const [seal, setSeal] = useState([]);
  // シール点数State
  const [point, setPoint] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.note}>目標：点</Text>
      </View>
      <View style={styles.board}>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
        <View style={styles.seal}></View>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.note}>あと点（残り日）</Text>
      </View>
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
  },
  board: {
    height: "80%",
    width: "100%",
    margin: "1%",
    /*
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "red",
    */
    flexDirection: "row",
    flexWrap: "wrap",
  },
  top: {
    paddingTop: "7%",
    height: "10%",
  },
  bottom: {
    height: "9%",
  },
  note: {
    fontSize: 30,
  },
  seal: {
    height: 70,
    width: 70,
    margin: "0.5%",
    justifyContent: "space-between",
    borderStyle: "dotted",
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "pink",
  },
});
