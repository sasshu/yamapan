import { useState, useEffect, useContext, useCallback } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SetPicker } from "../hooks/SetPicker";
import { BoardContext } from "../providers/BoardStateProvider";
import { InitModal } from "../modal/InitModal";
import { Styles } from "../../Styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import { DataProvider } from "../providers/DataProvider";

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
    needPoint,
    setSealNum,
  } = useContext(BoardContext);

  // StyleSheet情報を取得
  const {
    container,
    top,
    note,
    setting,
    configBoard,
    setModule,
    setGoal,
    stdText,
    multiplication,
    bbuttonText,
    picker,
    pickerItem,
    initButton,
  } = Styles;

  // データ取得
  const { saveSetting, loadSetting, saveBoardData, saveCondition } =
    DataProvider();

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

  // 前回までのデータを復元
  useEffect(() => {
    loadSetting();
  }, []);

  // 目標点更新
  useEffect(() => {
    let collectedPoint = 0;
    collects.map((collect) => {
      collectedPoint += collect;
    });
    const newNeedPoint = goalPoint * goalPlate - collectedPoint;
    setNeedPoint(newNeedPoint);
    // storageに保存
    saveCondition(newNeedPoint);
  }, [goalPoint, goalPlate]);

  // シール台紙を初期化
  const initializeSeal = useCallback(() => {
    // 全てのシールを0点にする
    setCollects([...maxarea]);
    setSealNum(0);
    // 残りポイントを更新
    const newNeedPoint = goalPoint * goalPlate;
    setNeedPoint(newNeedPoint);
    // storageに保存
    saveCondition(newNeedPoint);
    saveBoardData([...maxarea], 0);
  }, [goalPoint, goalPlate]);

  return (
    <View style={container}>
      <View style={top}>
        <Text style={note}>設定</Text>
        <TouchableOpacity
          style={setting}
          onPress={() => navigation.navigate("Home")}
        >
          <Icon name="close" size={40} />
        </TouchableOpacity>
      </View>
      <View style={configBoard}>
        <View style={setModule}>
          <View style={setGoal}>
            <Text style={stdText}>お皿1枚の点数</Text>
            <Picker
              selectedValue={goalPoint}
              onValueChange={(itemValue) => {
                setGoalPoint(itemValue);
                saveSetting(itemValue, goalPlate);
              }}
              style={picker}
              itemStyle={pickerItem}
            >
              {SetPicker(selectGoalPoint)}
            </Picker>
          </View>
          <Text style={multiplication}>✕</Text>
          <View style={setGoal}>
            <Text style={stdText}>お皿の枚数</Text>
            <Picker
              selectedValue={goalPlate}
              onValueChange={(itemValue) => {
                setGoalPlate(itemValue);
                saveSetting(goalPoint, itemValue);
              }}
              style={picker}
              itemStyle={pickerItem}
            >
              {SetPicker(selectGoalPlate)}
            </Picker>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setInitModalVisible(() => !initModalVisible)}
        >
          <View style={initButton}>
            <Text style={bbuttonText}>シールを全てはがす</Text>
          </View>
        </TouchableOpacity>
      </View>

      <InitModal
        initModalVisible={initModalVisible}
        setInitModalVisible={setInitModalVisible}
        initializeSeal={initializeSeal}
      />
    </View>
  );
};
