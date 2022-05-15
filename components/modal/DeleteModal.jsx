import { useContext } from "react";
import { Text, View, TouchableOpacity, Modal } from "react-native";
import { BoardContext } from "../stateProviders/BoardStateProvider";
import { Styles } from "../../Styles";

export const DeleteModal = (props) => {
  const { deleteModalVisible, setDeleteModalVisible, deleteSeal, position } =
    props;

  // Context内のState情報を取得
  const { collects } = useContext(BoardContext);

  // StyleSheet情報を取得
  const {
    note,
    buttonText,
    modalCenter,
    editSeal,
    yesnoButton,
    noButton,
    yesButton,
  } = Styles;

  return (
    <Modal
      visible={deleteModalVisible}
      transparent={true}
      animationType="slide"
    >
      <View style={modalCenter}>
        <View style={editSeal}>
          <Text style={note}>
            {collects[position]}点シールを{"\n"}1枚はがしますか？
          </Text>
          <View style={yesnoButton}>
            <TouchableOpacity
              onPress={() => setDeleteModalVisible(() => !deleteModalVisible)}
              activeOpacity={0.6}
            >
              <View style={noButton}>
                <Text style={buttonText}>キャンセル</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                deleteSeal();
                setDeleteModalVisible(() => !deleteModalVisible);
              }}
            >
              <View style={yesButton}>
                <Text style={buttonText}>はがす</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
