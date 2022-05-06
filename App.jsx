import { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Swiper from "react-native-swiper";
import Icon from "react-native-vector-icons/MaterialIcons";

const App = () => {
  // シール最大添付枚数
  const maxarea = Array(30);
  maxarea.fill(0);
  // シール台紙
  const [collects, setCollects] = useState(maxarea);
  // シール最大点数
  const maxPoint = 3;
  // シール点数
  const [point, setPoint] = useState(0.5);
  // 点数は0.5からmaxPointまで0.5刻み
  const selectPoint = [];
  for (let index = 0.5; index <= maxPoint; index += 0.5) {
    selectPoint.push(index);
  }
  // 皿の獲得目標枚数
  const [goalPlate, setGoalPlate] = useState(1);
  // 枚数は1から10まで
  const selectPlate = [];
  for (let index = 0; index < 10; index++) {
    selectPlate.push(index + 1);
  }
  // 28点で皿が1枚もらえる
  const platePoint = 28;
  // 残りシール点数
  const [needPoint, setNeedPoint] = useState(platePoint * goalPlate);
  // シール点数入力画面
  const [addModalVisible, setAddModalVisible] = useState(false);
  // シール削除画面
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  // シール位置
  const [position, setPosition] = useState(0);
  // 設定画面
  const [configModalVisible, setConfigModalVisible] = useState(false);
  // その他

  // Picker作成
  // 引数：数値配列
  const setPicker = (array) => {
    return array.map((element, index) => (
      <Picker.Item key={this} label={`${element}`} value={element} />
    ));
  };

  // 目標点更新
  const updateSetting = () => {
    let collectedPoint = 0;
    collects.map((collect, index) => {
      collectedPoint += collect;
    });
    setNeedPoint(platePoint * goalPlate - collectedPoint);
    // 設定画面を閉じる
    setConfigModalVisible(() => !configModalVisible);
  };

  // シールを追加
  const addSeal = () => {
    // シール情報をコピー
    const newSeals = [...collects];
    // 新たなポイント情報をシール台紙に追加
    newSeals[position] = point;
    setCollects(newSeals);
    // 残りポイントを更新
    setNeedPoint(() => needPoint - point);
    // 入力画面を閉じる
    setAddModalVisible(() => !addModalVisible);
  };

  // シールを削除
  const deleteSeal = () => {
    // シール情報をコピー
    const newSeals = [...collects];
    // 該当シールのポイントを取得
    const delPoint = newSeals[position];
    // 残りポイントを更新
    setNeedPoint(needPoint + delPoint);
    // ポイント情報を削除
    newSeals[position] = 0;
    setCollects(newSeals);
    // 削除画面を閉じる
    setDeleteModalVisible(() => !deleteModalVisible);
  };

  // シール台紙を初期化
  const initializSeal = () => {
    // シール情報をコピー
    const newSeals = [...collects];
    // シールをすべて削除
    newSeals.fill(0);
    setCollects(newSeals);
    // 残りポイントを更新
    setNeedPoint(() => platePoint * goalPlate);
  };

  // シールが貼られていない最初の位置を返す
  const noSealPlace = () => {
    for (let index = 0; index < maxarea.length; index++) {
      if (collects[index] == 0) return index;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.note}>あと{needPoint}点</Text>
        <View style={styles.setting}>
          <Icon
            name="settings"
            size={40}
            onPress={() => setConfigModalVisible(() => !configModalVisible)}
          />
        </View>
      </View>

      <View style={styles.board}>
        {collects.map((collect, index) => (
          <TouchableHighlight
            key={index}
            style={collect > 0 ? styles.seal : styles.noSeal}
            onPress={() => {
              setPosition(index);
              collect > 0
                ? setDeleteModalVisible(() => !deleteModalVisible)
                : setAddModalVisible(() => !addModalVisible);
            }}
            underlayColor="pink"
            activeOpacity={0.6}
          >
            {collect > 0 ? (
              <Text style={styles.sealText}>{collect}</Text>
            ) : (
              <></>
            )}
          </TouchableHighlight>
        ))}
      </View>

      <TouchableHighlight
        onPress={() => {
          setPosition(noSealPlace);
          setAddModalVisible(() => !addModalVisible);
        }}
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
                onPress={() => setAddModalVisible(() => !addModalVisible)}
              />
            </View>
            <Picker
              selectedValue={point}
              onValueChange={(itemValue) => setPoint(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {setPicker(selectPoint)}
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
              {collects[position]}点シールを{"\n"}1枚はがしますか？
            </Text>
            <View style={styles.yesnoButton}>
              <TouchableHighlight
                onPress={() => setDeleteModalVisible(() => !deleteModalVisible)}
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
      <Modal
        visible={configModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalSide}>
          <View style={styles.configBoard}>
            <View style={styles.setting}>
              <Icon
                name="close"
                size={40}
                onPress={() => setConfigModalVisible(() => !configModalVisible)}
              />
            </View>
            <Text style={styles.note}>目標のお皿の枚数</Text>
            <Picker
              selectedValue={goalPlate}
              onValueChange={(itemValue) => setGoalPlate(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {setPicker(selectPlate)}
            </Picker>
            <TouchableHighlight
              onPress={updateSetting}
              underlayColor="#ddd"
              activeOpacity={0.6}
            >
              <View style={styles.confirmButton}>
                <Text style={styles.buttonText}>変更</Text>
              </View>
            </TouchableHighlight>
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
  modalSide: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  configBoard: {
    alignItems: "center",
    width: 300,
    height: "100%",
    paddingTop: 100,
    backgroundColor: "#ddd",
  },
});
