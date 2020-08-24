import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TodoScreen from "../screens/todoScreen";
import CreateAndEditTodo from "../screens/createAndEditTodo";
import { Button } from "react-native";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"todoScreen"}
        component={TodoScreen}
        options={({ navigation }) => {
          return {
            headerTitle: "Todo",
            headerRight: () => (
              <Button
                title={"Create Todo"}
                onPress={() => {
                  navigation.navigate("createAndEditScreen", {
                    headerTitle: "Create Todo",
                  });
                }}
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name={"createAndEditScreen"}
        component={CreateAndEditTodo}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
