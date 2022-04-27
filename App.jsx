import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const App = () => {
  // シール添付済台紙State
  const [seals, setSeals] = useState([]);
  // シール点数State
  const [point, setPoint] = useState(0);
  // シール最大添付枚数
  const maxarea = Array(30);
  maxarea.fill(0);
  const [noseals, setNoseals] = useState([...maxarea]);

  const onPressSeal = () => {
    // 添付済シール情報をコピー
    const newSeals = [...seals];
    // 新たなポイント情報をシール台紙に追加
    newSeals.push(noseals.length);
    setSeals(newSeals);
    // ポイント入力完了
    setPoint(0);
    // 未添付のシール情報をコピー
    const newNoseals = [...noseals];
    // シール添付可能な容量を削減
    newNoseals.pop();
    setNoseals(newNoseals);
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.note}>あと点</Text>
        <View style={styles.setting}>
          <Icon name="settings" size={40} onPress={onPressSeal} />
        </View>
      </View>
      <View style={styles.board}>
        {seals.map((seal, index) => (
          <View key={index} style={styles.seal}>
            <Text style={styles.sealtext}>{seal}</Text>
          </View>
        ))}
        {noseals.map((noseal, index) => (
          <View key={noseals.length + index} style={styles.noseal}></View>
        ))}
      </View>
      <TouchableHighlight
        onPress={onPressSeal}
        underlayColor={"white"}
        activeOpacity={"0.6"}
      >
        <View style={styles.sealbutton}>
          <Text style={styles.buttontext}>シールを貼る</Text>
        </View>
      </TouchableHighlight>
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
    width: "100%",
    marginTop: "5%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  top: {
    height: "12%",
    width: "100%",
    paddingTop: "4%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
  },
  setting: {
    position: "absolute",
    right: 15,
    top: 28,
  },
  note: {
    fontSize: 30,
    fontWeight: "bold",
  },
  noseal: {
    height: 70,
    width: 70,
    margin: "0.5%",
    borderStyle: "dotted",
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "pink",
  },
  seal: {
    height: 70,
    width: 70,
    margin: "0.5%",
    borderRadius: 50,
    backgroundColor: "#ff006f",
    alignItems: "center",
    justifyContent: "center",
  },
  sealbutton: {
    marginTop: "8%",
    backgroundColor: "#ff2599",
    borderRadius: 20,
    paddingHorizontal: 50,
    paddingVertical: 25,
  },
  buttontext: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  sealtext: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
});
