import { useState, useEffect, useContext } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SetPicker } from "../hooks/SetPicker";
import { BoardContext } from "../stateProviders/BoardStateProvider";
import { InitModal } from "../modal/InitModal";
import { Styles } from "../../Styles";
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
    confirmButton,
    picker,
    pickerItem,
    initButton,
  } = Styles;

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
  };

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
              onValueChange={(itemValue) => setGoalPoint(itemValue)}
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
              onValueChange={(itemValue) => setGoalPlate(itemValue)}
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
