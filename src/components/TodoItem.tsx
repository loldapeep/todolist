import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  Trash,
  ToggleOffCircle,
  ToggleOnCircle,
  Edit,
} from "iconsax-react-native";

interface TodoItemProps {
  key: string;
  taskName: string;
  active: boolean;
  deleteItem: () => void;
  type: {
    label: string;
    value: number;
  };
  edit: () => void;
  isEdit: boolean;
  confirmEdit: (e: any) => void;
  changeActive: () => void;
}

const TodoItem = ({
  key,
  taskName,
  active,
  type,
  edit,
  deleteItem,
  isEdit,
  confirmEdit,
  changeActive,
}: TodoItemProps) => {
  const [currentEdit, setCurrentEdit] = useState("");

  return (
    <View style={styles.task}>
      <View style={styles.shadow}>
        <TouchableOpacity style={styles.checkbox} onPress={changeActive}>
          {active ? (
            <ToggleOnCircle size="24" color="#6d63ff" />
          ) : (
            <ToggleOffCircle size="24" color="#6d63ff" />
          )}
        </TouchableOpacity>
        {!isEdit ? (
          <View style={styles.taskInfo}>
            <Text
              style={[
                styles.taskName,
                { textDecorationLine: active ? "line-through" : "none" },
              ]}
            >
              {taskName}
            </Text>
            <Text
              style={[
                styles.taskType,
                { textDecorationLine: active ? "line-through" : "none" },
              ]}
            >
              {type.label}
            </Text>
          </View>
        ) : (
          <View style={styles.taskInfo}>
            <TextInput
              defaultValue={taskName}
              onChangeText={(t) => setCurrentEdit(t)}
            ></TextInput>
          </View>
        )}

        {!isEdit ? (
          <TouchableOpacity style={styles.editButton} onPress={edit}>
            <Edit size="24" color="#6d63ff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              confirmEdit(currentEdit);
            }}
          >
            <Edit size="24" color="#6d63ff" />
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.delButton} onPress={deleteItem}>
          <Trash size="24" color="#6d63ff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  task: {
    // width: "90%",
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    // backgroundColor:"blue",
    // alignItems:"center",
    // backgroundColor: "rgba(0,0,0,1)",
    // elevation: 10,
  },

  editButton: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },

  delButton: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    // shadowOpacity: 30,
    // elevation:20,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },

  checkbox: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    // elevation:20,
    // shadowOpacity: 30,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
  },

  taskInfo: {
    width: 175,
    backgroundColor: "white",
    paddingLeft: 20,
    paddingTop: 10,
    height: 50,
    // alignItems: "center",
  },

  taskName: {
    // width: 225,
    fontSize: 18,

    // elevation:20,
    // shadowOpacity: 30,
    // shadowOffset: {width:2, height:2}
  },

  taskType: {
    fontSize: 10,
    // width: 225,
    fontStyle: "italic",
    // backgroundColor: "blue",
  },

  shadow: {
    elevation: 3,
    height: 50,
    borderColor: "black",
    // opacity: 0,
    // borderWidth:1,
    // shadowOffset:{
    //   height:10
    // },
    // backgroundColor: "red",
    flexDirection: "row",
  },
});
