import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { RootStateOrAny, useSelector } from "react-redux";
import { Card, Title, Paragraph } from 'react-native-paper'

const TodoScreen = () => {
  const todos = useSelector((state: RootStateOrAny) => state.todos);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={todos}
        renderItem={({ item: { todoId, description, userId } }) => {
          return (
            <Card style={styles.card}>
              <Card.Content style={styles.content}>
                <Title>{todoId}</Title>
                <Paragraph><Text>{description}</Text></Paragraph>
                <Text>{userId}</Text>
              </Card.Content>
            </Card>
            
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 5,
    backgroundColor: '#f1f3de'
  },
  content: {
    marginBottom: 10
  },
})

export default TodoScreen;
