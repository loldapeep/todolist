import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import TodoItem from "./TodoItem";
import { ArrowDown2, ArrowUp2, AddCircle } from "iconsax-react-native";
import React, { useEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseconfig";
import { useAppSelector, RootState } from "../../store";
import uuid from "react-native-uuid";
import ChooseLocationModal from "./ChooseLocationModal";

interface TaskData {
  id: string;
  name: string;
  active: boolean;
  isEdit: boolean;
  type: {
    label: string;
    value: number;
  };
  location: {
    latitude: string;
    longitude: string;
  };
}

const TodoList = ({ navigation, props }) => {
  const [currentText, setCurrentText] = useState<string>("");
  const [taskData, setTaskData] = useState<TaskData[]>();
  const [initData, setInitData] = useState<number>(0);
  const [taskType, setTaskType] = useState({ label: "placeholder", value: -1 });
  const [taskFilter, setTaskFilter] = useState<number>(1);
  const [editing, setEditing] = useState<string>("-1");
  const [changeLocationVisibility, setChangeLocationVisibility] =
    useState(false);
  const [taskLocation, setTaskLocation] = useState(null);

  let toDoTextInput = React.createRef<TextInput>();
  let taskTypeDropdown = React.createRef<SelectDropdown>();

  const handleDeleteToDo = (id: string) => {
    const newData = taskData.filter((item) => {
      return item.id != id;
    });
    setTaskData(newData);
  };

  const handleData = () => {
    console.log("data", {
      name: currentText,
      active: true,
      id: uuid.v4(),
      type: taskType,
      isEdit: false,
      location: taskLocation,
    });
    if (currentText !== "" && taskType.value != -1) {
      setTaskData([
        ...taskData,
        {
          name: currentText,
          active: true,
          id: String(uuid.v4()),
          type: taskType,
          isEdit: false,
          location: taskLocation,
        },
      ]);

      handleFilter(taskFilter);
      toDoTextInput.current.clear();
      setCurrentText("");
      taskTypeDropdown.current.reset();
      setTaskType({ label: "placeholder", value: -1 });
      setTaskLocation(null);
    }
  };

  const handleFilter = (filter) => {
    setTaskFilter(filter);
  };

  const handleEdit = (id: string) => {
    if (editing !== "-1") {
      const oldEdit = taskData.find((element) => {
        if (element.id == editing) return true;
      });
      oldEdit.isEdit = false;
    }

    const newEdit = taskData.find((element) => {
      if (element.id == id) {
        return true;
      }
    });
    newEdit.isEdit = true;
    setEditing(id);
  };

  const handleEditedData = (id, newData) => {
    const item = taskData.find((element) => {
      if (element.id == id) {
        return true;
      }
    });
    item.name = newData;
    item.isEdit = false;
    setData();
    setEditing("-1");
  };

  const handleActive = (item) => {
    item.active = !item.active;
    setData();
    getData();
  };

  const toDoTypes = [
    { label: "type 1", value: 2 },
    { label: "type 2", value: 3 },
    { label: "type 3", value: 4 },
    { label: "type 4", value: 5 },
  ];

  const user = useAppSelector((state: RootState) => state.user.user);

  const getData = async () => {
    setTaskData(
      (await getDoc(doc(db, "users", `${user.email}`))).data().todoList
    );

    if (taskData === null) {
      setTaskData([]);
    }
    setInitData(1);
  };

  const setData = async () => {
    await setDoc(doc(db, "users", `${user.email}`), { todoList: taskData });
  };

  useEffect(() => {
    if (initData === 1) {
      setData();
    } else {
      getData();
    }
  }, [taskData]);

  const handleLocation = (location) => {
    setTaskLocation({
      latitude: location.latitude,
      longitude: location.longitude,
    });
    setChangeLocationVisibility(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topUI}>
        <View style={styles.header}>
          {/* <Button
            title="Go to Details"
            onPress={() => navigation.navigate("Details")}
          /> */}
          <Text
            style={{
              fontSize: 25,
              color: "#FFFFFF",
              marginLeft: 20,
              marginTop: 30,
              fontWeight: "700",
            }}
          >
            Hello User
          </Text>

          <Text
            style={{
              fontSize: 15,
              color: "#FFFFFF",
              marginLeft: 20,
              marginTop: 7,
              fontWeight: "700",
            }}
          >
            What are you going to do?
          </Text>
        </View>

        <View style={styles.input}>
          <TextInput
            placeholder="Add To-do"
            style={styles.todoInput}
            onChangeText={(t) => setCurrentText(t)}
            ref={toDoTextInput}
          />
        </View>

        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <SelectDropdown
            ref={taskTypeDropdown}
            data={toDoTypes}
            onSelect={(selectedItem, index) => {
              setTaskType(selectedItem);
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.label) || "Select your type"}
                  </Text>
                  {isOpened ? (
                    <ArrowDown2 size="32" color="#6d63ff" />
                  ) : (
                    <ArrowUp2 size="32" color="#6d63ff" />
                  )}
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && { backgroundColor: "#FFFFFF" }),
                  }}
                >
                  <Text style={styles.dropdownItemTxtStyle}>{item.label}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
            // style={{marginBottom: 10}}
          />

          <TouchableOpacity style={styles.addButton} onPress={handleData}>
            <AddCircle size="24" color="#6d63ff" />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", width: "100%" }}>
          <TouchableOpacity onPress={() => setChangeLocationVisibility(true)}>
            <View
              style={{
                backgroundColor: "white",
                marginBottom: 10,
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Text style={{ fontSize: 20 }}>Change task location</Text>
              {taskLocation !== null ? (
                <>
                  <Text style={{ fontSize: 12 }}>
                    Current latitude: {taskLocation.latitude}
                  </Text>
                  <Text style={{ fontSize: 12 }}>
                    Current longitude: {taskLocation.longitude}
                  </Text>
                </>
              ) : (
                <></>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 18 }}>Select filter: </Text>
        <SelectDropdown
          data={[{ label: "all", value: 1 }, ...toDoTypes]}
          onSelect={(selectedItem, index) => {
            handleFilter(selectedItem.value);
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.label) || "Select your filter"}
                </Text>
                {isOpened ? (
                  <ArrowDown2 size="32" color="#6d63ff" />
                ) : (
                  <ArrowUp2 size="32" color="#6d63ff" />
                )}
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: "#FFFFFF" }),
                }}
              >
                <Text style={styles.dropdownItemTxtStyle}>{item.label}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
          // style={{marginBottom: 10}}
        />
      </View>

      <ScrollView style={styles.bottomUI}>
        {taskData &&
          taskData
            .filter((item) => {
              if (taskFilter == 1) {
                return true;
              } else {
                return item.type.value == taskFilter;
              }
            })
            .map((item) => (
              <TodoItem
                key={item.id}
                taskName={item.name}
                active={item.active}
                deleteItem={() => handleDeleteToDo(item.id)}
                type={item.type}
                edit={() => handleEdit(item.id)}
                isEdit={item.isEdit}
                confirmEdit={(newData) => handleEditedData(item.id, newData)}
                changeActive={() => handleActive(item)}
                onPress={() => navigation.navigate("Details", { item })}
              />
            ))}
      </ScrollView>
      <ChooseLocationModal
        visibleModal={changeLocationVisibility}
        onChoose={(location) => handleLocation(location)}
        onClose={() => handleLocation(taskLocation)}
      />
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
  },

  container: {
    flexDirection: "column",
    flex: 1,
    // height: 1000,
  },

  topUI: {
    backgroundColor: "#6d63ff",
    // height: 250,
    // flex:3,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
  },

  input: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },

  addButton: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },

  bottomUI: {
    // alignSelf: "stretch",
    // flex: 1,
    width: "100%",
    maxHeight: 480,
  },

  todoInput: {
    backgroundColor: "#fff",
    color: "#000000",
    paddingLeft: 20,
    width: 325,
    height: 50,
    fontSize: 13,
    borderRadius: 7,
    marginBottom: 10,
  },

  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 7,
    borderTopLeftRadius: 7,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    // marginBottom: 10
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
