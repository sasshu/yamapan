import { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/MaterialIcons";

const App = () => {
  // シール添付済台紙State
  const [seals, setSeals] = useState([]);
  // シール点数State
  const [point, setPoint] = useState(0.5);
  // シール最大添付枚数
  const maxarea = Array(30);
  maxarea.fill(0);
  const [noSeals, setNoSeals] = useState([...maxarea]);
  // 目標シール点数
  const [goalPoint, setGoalPoint] = useState(28);
  // 残りシール点数
  const [needPoint, setNeedPoint] = useState(goalPoint);
  // シール点数入力画面
  const [addModalVisible, setAddModalVisible] = useState(false);
  // シール削除画面
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  // シール位置
  const [position, setPosition] = useState(0);

  const addSeal = () => {
    // 添付済シール情報をコピー
    const newSeals = [...seals];
    // 新たなポイント情報をシール台紙に追加
    newSeals.push(point);
    setSeals(newSeals);
    // 残りポイントを更新
    setNeedPoint(needPoint - point);
    // 未添付のシール情報をコピー
    const newNoSeals = [...noSeals];
    // シール添付可能な容量を削減
    newNoSeals.pop();
    setNoSeals(newNoSeals);
    // 入力画面を閉じる
    setAddModalVisible(false);
  };

  const deleteSeal = () => {
    // 添付済シール情報をコピー
    const newSeals = [...seals];
    // 該当シールのポイントを取得
    const delPoint = newSeals[position];
    // 残りポイントを更新
    setNeedPoint(needPoint + delPoint);
    // ポイント情報を削除
    newSeals.splice(position, 1);
    setSeals(newSeals);
    // 未添付のシール情報をコピー
    const newNoSeals = [...noSeals];
    // シール添付可能な容量を追加
    newNoSeals.push(0);
    setNoSeals(newNoSeals);
    // 削除画面を閉じる
    setDeleteModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.note}>あと{needPoint}点</Text>
        <View style={styles.setting}>
          <Icon name="settings" size={40} />
        </View>
      </View>
      <View style={styles.board}>
        {seals.map((seal, index) => (
          <TouchableHighlight
            key={index}
            style={styles.seal}
            onPress={() => {
              setPosition(index);
              setDeleteModalVisible(true);
            }}
            underlayColor="pink"
            activeOpacity={0.6}
          >
            <Text style={styles.sealText}>{seal}</Text>
          </TouchableHighlight>
        ))}
        {noSeals.map((noSeal, index) => (
          <View key={seals.length + index} style={styles.noSeal}></View>
        ))}
      </View>
      <TouchableHighlight
        onPress={() => setAddModalVisible(true)}
        underlayColor="white"
        activeOpacity={0.6}
      >
        <View style={styles.sealButton}>
          <Text style={styles.buttonText}>シールを貼る</Text>
        </View>
      </TouchableHighlight>
      <Modal visible={addModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalCenter}>
          <View style={styles.editSeal}>
            <Text style={styles.note}>点数を入力</Text>
            <View style={styles.close}>
              <Icon
                name="close"
                size={40}
                onPress={() => setAddModalVisible(false)}
              />
            </View>
            <Picker
              selectedValue={point}
              onValueChange={(itemValue) => setPoint(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="0.5" value={0.5} />
              <Picker.Item label="1" value={1} />
              <Picker.Item label="1.5" value={1.5} />
              <Picker.Item label="2" value={2} />
              <Picker.Item label="2.5" value={2.5} />
              <Picker.Item label="3" value={3} />
            </Picker>
            <TouchableHighlight
              onPress={addSeal}
              underlayColor="#ddd"
              activeOpacity={0.6}
            >
              <View style={styles.confirmButton}>
                <Text style={styles.buttonText}>選択</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <Modal
        visible={deleteModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalCenter}>
          <View style={styles.editSeal}>
            <Text style={styles.note}>
              {seals[position]}点シールを{"\n"}1枚はがしますか？
            </Text>

            <View style={styles.yesnoButton}>
              <TouchableHighlight
                onPress={() => setDeleteModalVisible(false)}
                underlayColor="#ddd"
                activeOpacity={0.6}
              >
                <View style={styles.noButton}>
                  <Text style={styles.buttonText}>キャンセル</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor="#ddd"
                activeOpacity={0.6}
                onPress={() => deleteSeal()}
              >
                <View style={styles.yesButton}>
                  <Text style={styles.buttonText}>はがす</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
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
    height: "auto",
    width: "100%",
    marginTop: "5%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
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
  noSeal: {
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
  sealButton: {
    marginTop: "8%",
    backgroundColor: "#ff2599",
    borderRadius: 20,
    paddingHorizontal: 50,
    paddingVertical: 25,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  sealText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  modalCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  editSeal: {
    alignItems: "center",
    width: "80%",
    paddingVertical: 20,
    backgroundColor: "#ddd",
    borderRadius: 20,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  confirmButton: {
    backgroundColor: "red",
    borderRadius: 20,
    width: 130,
    paddingVertical: 20,
    marginTop: 15,
  },
  picker: {
    height: 200,
    width: "100%",
  },
  pickerItem: {
    fontWeight: "bold",
    fontSize: 30,
  },
  close: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  yesnoButton: {
    flexDirection: "row",
    marginTop: 25,
  },
  noButton: {
    width: 130,
    backgroundColor: "gray",
    borderRadius: 20,
    paddingVertical: 20,
    marginHorizontal: 10,
  },
  yesButton: {
    width: 130,
    backgroundColor: "red",
    borderRadius: 20,
    paddingVertical: 20,
    marginHorizontal: 10,
  },
});
