import { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SetPicker } from "../hooks/SetPicker";
import { BoardContext } from "../stateProviders/BoardStateProvider";
import Icon from "react-native-vector-icons/MaterialIcons";

export const HomeScreen = ({ navigation }) => {
  // Context内のState情報を取得
  const {
    maxarea,
    collects,
    setCollects,
    sealNum,
    setSealNum,
    needPoint,
    setNeedPoint,
  } = useContext(BoardContext);

  // シール最大点数
  const maxPoint = 5;
  // シール点数
  const [point, setPoint] = useState(0.5);

  // 点数は0.5からmaxPointまで0.5刻み
  const selectPoint = [];
  for (let index = 0.5; index <= maxPoint; index += 0.5) {
    selectPoint.push(index);
  }

  // 枚数は1から10まで
  const selectPlate = [];
  for (let index = 0; index < 10; index++) {
    selectPlate.push(index + 1);
  }

  // シール位置
  const [position, setPosition] = useState(0);

  // シール点数入力画面
  const [addModalVisible, setAddModalVisible] = useState(false);
  // シール削除画面
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // シール未添付箇所を整理
  useEffect(() => {
    const newSeals = [...collects];
    if (sealNum >= newSeals.length) {
      newSeals.push(...maxarea);
      setCollects(newSeals);
    } else {
      let num = 0;
      const lastNums = newSeals.slice(-maxarea.length - 1);
      lastNums.map((lastNum) => {
        num += lastNum;
      });
      if (num == 0 && sealNum != 0) {
        const leftNums = newSeals.slice(0, -maxarea.length);
        setCollects(leftNums);
      }
    }
  }, [sealNum]);

  // シールを追加
  const addSeal = () => {
    // シール情報をコピー
    const newSeals = [...collects];
    // 新たなポイント情報をシール台紙に追加
    newSeals[position] = point;
    setSealNum(() => sealNum + 1);
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
    setSealNum(() => sealNum - 1);
    // 削除画面を閉じる
    setDeleteModalVisible(() => !deleteModalVisible);
  };

  // シールが貼られていない最初の位置を返す
  const noSealPlace = () => {
    for (let index = 0; index < collects.length; index++) {
      if (collects[index] == 0) return index;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.note}>あと{needPoint}点</Text>
        <TouchableOpacity
          style={styles.setting}
          onPress={() => navigation.navigate("Setting")}
        >
          <Icon name="settings" size={40} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.board}>
          {collects.map((collect, index) => (
            <TouchableOpacity
              key={index}
              style={collect > 0 ? styles.seal : styles.noSeal}
              onPress={() => {
                setPosition(index);
                collect > 0
                  ? setDeleteModalVisible(() => !deleteModalVisible)
                  : setAddModalVisible(() => !addModalVisible);
              }}
              activeOpacity={0.6}
            >
              {collect > 0 ? (
                <Text style={styles.sealText}>{collect}</Text>
              ) : (
                <></>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          setPosition(noSealPlace);
          setAddModalVisible(() => !addModalVisible);
        }}
        activeOpacity={0.6}
      >
        <View style={styles.sealButton}>
          <Text style={styles.buttonText}>シールを貼る</Text>
        </View>
      </TouchableOpacity>

      <Modal visible={addModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalCenter}>
          <View style={styles.editSeal}>
            <Text style={styles.note}>点数を入力</Text>
            <TouchableOpacity
              style={styles.close}
              onPress={() => setAddModalVisible(() => !addModalVisible)}
            >
              <Icon name="close" size={40} />
            </TouchableOpacity>
            <Picker
              selectedValue={point}
              onValueChange={(itemValue) => setPoint(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {SetPicker(selectPoint)}
            </Picker>
            <TouchableOpacity onPress={addSeal} activeOpacity={0.6}>
              <View style={styles.confirmButton}>
                <Text style={styles.buttonText}>選択</Text>
              </View>
            </TouchableOpacity>
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
              <TouchableOpacity
                onPress={() => setDeleteModalVisible(() => !deleteModalVisible)}
                activeOpacity={0.6}
              >
                <View style={styles.noButton}>
                  <Text style={styles.buttonText}>キャンセル</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                underlayColor="#ddd"
                activeOpacity={0.6}
                onPress={() => deleteSeal()}
              >
                <View style={styles.yesButton}>
                  <Text style={styles.buttonText}>はがす</Text>
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
  board: {
    height: "auto",
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
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
    position: "relative",
    bottom: 20,
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
    opacity: 0.99,
  },
  editSeal: {
    alignItems: "center",
    width: "80%",
    paddingVertical: 20,
    backgroundColor: "#dcdcdc",
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
    width: "80%",
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
