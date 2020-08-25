import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { RootStateOrAny, useSelector } from "react-redux";
import DefaultButton from "../components/defaultButton";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";

const TodoScreen = () => {
  const [connected, setConnected] = useState(true);
  const todos = useSelector((state: RootStateOrAny) => state.todos);
  const netInfo = NetInfo;
  const networkStats = useNetInfo();

  return (
    <View style={{ flex: 1 }}>
      {networkStats.isInternetReachable ? (
        <View
          style={{
            backgroundColor: "black",
            height: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            OFFLINE
          </Text>
        </View>
      ) : null}

      <FlatList
        data={todos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item: { description, createdAt, editedAt } }) => {
          return (
            <View
              style={{
                marginBottom: 10,
                marginLeft: 2.5,
                marginRight: 2.5,
                borderWidth: 0.5,
                borderColor: "black",
                backgroundColor: "white",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{}}>
                <Text style={{ fontSize: 25 }}>{description}</Text>

                <View
                  style={{
                    // flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontWeight: "200" }}>
                    Created At: {createdAt}
                  </Text>
                  <Text style={{ fontWeight: "200" }}>
                    Edited At: {editedAt}
                  </Text>
                </View>
              </View>

              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <DefaultButton
                  buttonCaption={"Edit"}
                  buttonColor={"black"}
                  buttonBackgroundColor={"pink"}
                  onPressHandler={() =>
                    console.log(netInfo.isInternetReachable)
                  }
                />

                <DefaultButton
                  buttonBackgroundColor={"red"}
                  buttonColor={"white"}
                  buttonCaption={"Delete"}
                />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default TodoScreen;
