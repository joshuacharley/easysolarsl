import React from "react";
import { Text, TouchableHighlight } from "react-native";

const DefaultButton = ({
  onPressHandler,
  buttonCaption,
  buttonColor,
  buttonBackgroundColor,
}) => {
  return (
    <TouchableHighlight
      style={{
        width: 100,
        backgroundColor: buttonBackgroundColor,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        margin: 2,
      }}
      onPress={onPressHandler}
    >
      <Text style={{ color: buttonColor }}>{buttonCaption}</Text>
    </TouchableHighlight>
  );
};

export default DefaultButton;
