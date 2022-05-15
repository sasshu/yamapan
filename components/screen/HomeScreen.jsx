import { useState, useEffect, useContext } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { BoardContext } from "../stateProviders/BoardStateProvider";
import Icon from "react-native-vector-icons/MaterialIcons";
import { AddModal } from "../modal/AddModal";
import { DeleteModal } from "../modal/DeleteModal";
import { Styles } from "../../Styles";

export const HomeScreen = ({ navigation }) => {
  // StyleSheet情報を取得
  const {
    container,
    top,
    note,
    setting,
    board,
    seal,
    noSeal,
    sealText,
    sealButton,
    buttonText,
  } = Styles;

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

  // シール位置
  const [position, setPosition] = useState(0);
  // シール点数
  const [point, setPoint] = useState(0.5);

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
    setCollects(newSeals);
    // シール枚数を増やす
    setSealNum(() => sealNum + 1);
    // 残りポイントを更新
    setNeedPoint(() => needPoint - point);
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
    // シールの枚数を減らす
    setSealNum(() => sealNum - 1);
  };

  // シールが貼られていない最初の位置を返す
  const noSealPlace = () => {
    for (let index = 0; index < collects.length; index++) {
      if (collects[index] == 0) return index;
    }
  };

  return (
    <View style={container}>
      <View style={top}>
        <Text style={note}>あと{needPoint}点</Text>
        <TouchableOpacity
          style={setting}
          onPress={() => navigation.navigate("Setting")}
        >
          <Icon name="settings" size={40} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={board}>
          {collects.map((collect, index) => (
            <TouchableOpacity
              key={index}
              style={collect > 0 ? seal : noSeal}
              onPress={() => {
                setPosition(index);
                collect > 0
                  ? setDeleteModalVisible(() => !deleteModalVisible)
                  : setAddModalVisible(() => !addModalVisible);
              }}
              activeOpacity={0.6}
            >
              {collect > 0 ? <Text style={sealText}>{collect}</Text> : <></>}
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
        <View style={sealButton}>
          <Text style={buttonText}>シールを貼る</Text>
        </View>
      </TouchableOpacity>

      <AddModal
        addModalVisible={addModalVisible}
        setAddModalVisible={setAddModalVisible}
        addSeal={addSeal}
        point={point}
        setPoint={setPoint}
      />

      <DeleteModal
        deleteModalVisible={deleteModalVisible}
        setDeleteModalVisible={setDeleteModalVisible}
        deleteSeal={deleteSeal}
        position={position}
      />
    </View>
  );
};
