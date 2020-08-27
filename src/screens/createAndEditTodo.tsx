import React, { SyntheticEvent, useState } from "react";
import {
  Button,
  TextInput,
  TextInputChangeEventData,
  View,
  Text,
} from "react-native";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { createTodoAction, editTodoAction } from "../redux/todo";

const CreateAndEditTodo = ({ route }: any) => {
  const [todoName, setTodoName] = useState();
  const todayDate = useState(new Date(Date.now()));

  const buttonCaption = route.params;
  const editTodoIt = route.params;

  const createTodoString = "Add Todo";
  const editTodoString = "Save Todo";

  const todos = useSelector((state: RootStateOrAny) => state.todos);
  const accessToken = useSelector((state) => state.user.accessToken);

  //query latest todoId and increment it
  const getTodoId = Math.max(...todos.map((x: any) => x.todoId)) + 1;

  const dispatch = useDispatch();

  const createTodoQuery = {
    query: `
        mutation{
  createTodo(todoId: ${getTodoId}, description: "${todoName}", createAt: "${todayDate}")
}
    `,
  };

  const updateTodoQuery = {
    query: `
      mutation{
  updateTodo(todoId: ${editTodoIt}, description: "${todoName}", modifiedAt: "${todayDate}"){
    todoId
    description
     modifiedAt
  }
}
    `,
  };

  const buttonTodoHandler = () => {
    if (buttonCaption === createTodoString) {
      dispatch(
        createTodoAction({
          todoId: getTodoId,
          description: todoName,
          userId: "ngomanaft@icloud.com",
        })
      );

      fetch("http://localhost:4000/graphql", {
        method: "POST",
        body: JSON.stringify(createTodoQuery),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(async (resData) => {
          await console.log(resData);
        })
        .catch((err) => console.log(err));
    }

    if (buttonCaption === editTodoString) {
      dispatch(
        editTodoAction({
          todoId: getTodoId,
          description: todoName,
        })
      );

      fetch("http://localhost:4000/graphql", {
        method: "POST",
        body: JSON.stringify(updateTodoQuery),
        headers: {
          "Content-Type": "application/json",
          authorization: `beaer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then(async (resData) => {
          await console.log(resData);
        })
        .catch((err) => console.log(err));
    }
  };

  //todo onChange
  const todoOnChange = (e: SyntheticEvent<TextInputChangeEventData>) => {
    // @ts-ignore
    const value = e.nativeEvent.text;

    setTodoName(value);

    console.log(getTodoId);
  };

  const addTodo = () => {
    // await getTodoId;
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        placeholder={"Todo Name"}
        value={todoName}
        onChange={todoOnChange}
      />
      <Text>{accessToken}</Text>

      <Button title={"Add Todo"} onPress={buttonTodoHandler} />
    </View>
  );
};

export default CreateAndEditTodo;
