import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { RootStateOrAny, useSelector } from "react-redux";
import DefaultButton from "../components/defaultButton";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

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
