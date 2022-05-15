import { Text, View, TouchableOpacity, Modal } from "react-native";
import { Styles } from "../../Styles";

export const InitModal = (props) => {
  const { initModalVisible, setInitModalVisible, initializeSeal } = props;

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
    <Modal visible={initModalVisible} transparent={true} animationType="slide">
      <View style={modalCenter}>
        <View style={editSeal}>
          <Text style={note}>全てのシールを{"\n"}はがしますか？</Text>
          <View style={yesnoButton}>
            <TouchableOpacity
              onPress={() => setInitModalVisible(() => !initModalVisible)}
              activeOpacity={0.6}
            >
              <View style={noButton}>
                <Text style={buttonText}>キャンセル</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                initializeSeal();
                setInitModalVisible(() => !initModalVisible);
              }}
            >
              <View style={yesButton}>
                <Text style={buttonText}>全てはがす</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
