import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { BoardContext } from "../providers/BoardStateProvider";

export const DataProvider = () => {
  // Context内のState情報を取得
  const { setCollects, setGoalPoint, setGoalPlate, setNeedPoint, setSealNum } =
    useContext(BoardContext);

  const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
  });

  const saveBoardData = (board, seals) => {
    storage.save({
      key: "board",
      data: {
        board: board,
        seals: seals,
      },
    });
  };

  const loadBoardData = () => {
    storage
      .load({ key: "board" })
      .then((ret) => {
        setCollects(ret.board);
        setSealNum(ret.seals);
      })
      .catch(() => {
        console.log("board load failed");
      });
  };

  const saveSetting = (point, plate) => {
    storage.save({
      key: "setting",
      data: {
        point: point,
        plate: plate,
      },
    });
  };

  const loadSetting = () => {
    storage
      .load({ key: "setting" })
      .then((ret) => {
        setGoalPoint(ret.point);
        setGoalPlate(ret.plate);
      })
      .catch(() => {
        console.log("setting load failed");
      });
  };

  const saveCondition = (need) => {
    storage.save({
      key: "condition",
      data: {
        need: need,
      },
    });
  };

  const loadCondition = () => {
    storage
      .load({ key: "condition" })
      .then((ret) => {
        setNeedPoint(ret.need);
      })
      .catch(() => {
        console.log("condition load failed");
      });
  };

  return {
    saveBoardData,
    loadBoardData,
    saveSetting,
    loadSetting,
    saveCondition,
    loadCondition,
  };
};
