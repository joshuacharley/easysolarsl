import React from "react";
import { FlatList, Text, View } from "react-native";
import { RootStateOrAny, useSelector } from "react-redux";

const TodoScreen = () => {
  const todos = useSelector((state: RootStateOrAny) => state.todos);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={todos}
        renderItem={({ item: { todoId, description, userId } }) => {
          return (
            <View>
              <Text>{todoId}</Text>
              <Text>{description}</Text>
              <Text>{userId}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default TodoScreen;
