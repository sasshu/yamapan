import { Text, View, TouchableOpacity, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SetPicker } from "../hooks/SetPicker";
import { Styles } from "../../Styles";
import Icon from "react-native-vector-icons/MaterialIcons";

export const AddModal = (props) => {
  const { addModalVisible, setAddModalVisible, addSeal, point, setPoint } =
    props;

  // StyleSheet情報を取得
  const {
    note,
    buttonText,
    modalCenter,
    editSeal,
    confirmButton,
    picker,
    pickerItem,
    close,
  } = Styles;

  // シール最大点数
  const maxPoint = 5;
  // 点数は0.5からmaxPointまで0.5刻み
  const selectPoint = [];
  for (let index = 0.5; index <= maxPoint; index += 0.5) {
    selectPoint.push(index);
  }

  return (
    <Modal visible={addModalVisible} transparent={true} animationType="slide">
      <View style={modalCenter}>
        <View style={editSeal}>
          <Text style={note}>点数を入力</Text>
          <TouchableOpacity
            style={close}
            onPress={() => setAddModalVisible(() => !addModalVisible)}
          >
            <Icon name="close" size={40} />
          </TouchableOpacity>
          <Picker
            selectedValue={point}
            onValueChange={(itemValue) => setPoint(itemValue)}
            style={picker}
            itemStyle={pickerItem}
          >
            {SetPicker(selectPoint)}
          </Picker>
          <TouchableOpacity
            onPress={() => {
              addSeal();
              setAddModalVisible(() => !addModalVisible);
            }}
            activeOpacity={0.6}
          >
            <View style={confirmButton}>
              <Text style={buttonText}>選択</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
