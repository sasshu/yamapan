import { createContext, useState } from "react";

export const BoardContext = createContext({});

export const BoardProvider = (props) => {
  const { children } = props;

  // シール最大添付枚数
  const maxarea = Array(30);
  maxarea.fill(0);
  // シール台紙
  const [collects, setCollects] = useState(maxarea);
  // シール枚数
  const [sealNum, setSealNum] = useState(0);

  // 28点で皿が1枚もらえる
  const [goalPoint, setGoalPoint] = useState(28);
  // 皿の獲得目標枚数
  const [goalPlate, setGoalPlate] = useState(1);

  // 残りシール点数
  const [needPoint, setNeedPoint] = useState(goalPoint * goalPlate);

  return (
    <BoardContext.Provider
      value={{
        maxarea,
        collects,
        setCollects,
        sealNum,
        setSealNum,
        goalPoint,
        setGoalPoint,
        goalPlate,
        setGoalPlate,
        needPoint,
        setNeedPoint,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
