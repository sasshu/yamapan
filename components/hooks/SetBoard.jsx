import { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { BoardContext } from "../stateProviders/BoardStateProvider";

export const SetBoard = (props) => {
  // シール台紙を初期化
  const initializeSeal = () => {
    // 全てのシールを0点にする
    setCollects([...maxarea]);
    setSealNum(0);
    // 残りポイントを更新
    setNeedPoint(() => goalPoint * goalPlate);
  };
  /*
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
  };
  */
};
