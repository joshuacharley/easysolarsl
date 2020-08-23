import React from "react";
import { TextInput, View } from "react-native";

const TodoInput = ({ todoChangeHandler }) => {
  return (
    <View>
      <TextInput placeholder={"Todo Name"} onChange={todoChangeHandler} />
    </View>
  );
};
