import { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SetPicker } from "../hooks/SetPicker";
import { BoardContext } from "../stateProviders/BoardStateProvider";
import Icon from "react-native-vector-icons/MaterialIcons";

export const SettingScreen = ({ navigation }) => {
  // Context内のState情報を取得
  const {
    maxarea,
    collects,
    setCollects,
    goalPoint,
    setGoalPoint,
    goalPlate,
    setGoalPlate,
    setNeedPoint,
    setSealNum,
  } = useContext(BoardContext);

  // 初期化画面
  const [initModalVisible, setInitModalVisible] = useState(false);

  // 点数は1から100まで
  const selectGoalPoint = [];
  for (let index = 0; index < 100; index++) {
    selectGoalPoint.push(index + 1);
  }

  // 枚数は1から10まで
  const selectGoalPlate = [];
  for (let index = 0; index < 10; index++) {
    selectGoalPlate.push(index + 1);
  }

  // 目標点更新
  useEffect(() => {
    let collectedPoint = 0;
    collects.map((collect) => {
      collectedPoint += collect;
    });
    setNeedPoint(goalPoint * goalPlate - collectedPoint);
  }, [goalPoint, goalPlate]);

  // シール台紙を初期化
  const initializeSeal = () => {
    // 全てのシールを0点にする
    setCollects([...maxarea]);
    setSealNum(0);
    // 残りポイントを更新
    setNeedPoint(() => goalPoint * goalPlate);
    // 初期化画面を閉じる
    setInitModalVisible(() => !initModalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.note}>設定</Text>
        <TouchableOpacity
          style={styles.setting}
          onPress={() => navigation.navigate("Home")}
        >
          <Icon name="close" size={40} />
        </TouchableOpacity>
      </View>
      <View style={styles.configBoard}>
        <View style={styles.setModule}>
          <View style={styles.setGoal}>
            <Text style={styles.stdText}>お皿1枚の点数</Text>
            <Picker
              selectedValue={goalPoint}
              onValueChange={(itemValue) => setGoalPoint(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {SetPicker(selectGoalPoint)}
            </Picker>
          </View>
          <Text style={styles.multiplication}>✕</Text>
          <View style={styles.setGoal}>
            <Text style={styles.stdText}>お皿の枚数</Text>
            <Picker
              selectedValue={goalPlate}
              onValueChange={(itemValue) => setGoalPlate(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {SetPicker(selectGoalPlate)}
            </Picker>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setInitModalVisible(() => !initModalVisible)}
        >
          <View style={styles.confirmButton}>
            <Text style={styles.bbuttonText}>シールを全てはがす</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        visible={initModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalCenter}>
          <View style={styles.editSeal}>
            <Text style={styles.note}>全てのシールを{"\n"}はがしますか？</Text>
            <View style={styles.yesnoButton}>
              <TouchableOpacity
                onPress={() => setInitModalVisible(() => !initModalVisible)}
                activeOpacity={0.6}
              >
                <View style={styles.noButton}>
                  <Text style={styles.buttonText}>キャンセル</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} onPress={initializeSeal}>
                <View style={styles.yesButton}>
                  <Text style={styles.buttonText}>全てはがす</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    height: "100%",
  },
  top: {
    height: 80,
    width: "100%",
    paddingTop: 15,
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
  sealButton: {
    marginTop: 25,
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
  bbuttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
  },
  modalCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.95,
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
    marginTop: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "red",
    width: 220,
    paddingVertical: 20,
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
  picker: {
    height: 200,
    width: "80%",
  },
  pickerItem: {
    fontWeight: "bold",
    fontSize: 30,
  },
  configBoard: {
    width: "100%",
    alignItems: "center",
  },
  setModule: {
    flexDirection: "row",
    marginVertical: "5%",
  },
  setGoal: {
    flex: 1,
    alignItems: "center",
  },
  stdText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  multiplication: {
    fontSize: 30,
    marginTop: 120,
  },
});
