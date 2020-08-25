import React, { SyntheticEvent, useState } from "react";
import {
  Button,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { createTodoAction } from "../redux/todo";


const CreateAndEditTodo = ({ route }: any) => {
  const [todoName, setTodoName] = useState();


  const todos = useSelector((state: RootStateOrAny) => state.todos);
  const dispatch = useDispatch();

  //query latest todoId and increment it
  const getTodoId = Math.max(...todos.map((x: any) => x.todoId)) + 1;

  //todo onChange
  const todoOnChange = (e: SyntheticEvent<TextInputChangeEventData>) => {
    // @ts-ignore
    const value = e.nativeEvent.text;

    setTodoName(value);

    console.log(getTodoId);
  };

  const addTodo = () => {
    // await getTodoId;

    dispatch(
      createTodoAction({
        todoId: getTodoId,
        description: todoName,
        userId: "ngomanaft@icloud.com",
      })
    );
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
      <TextInput
      style={{fontSize:20, backgroundColor:"#f6f5f5"}}
        placeholder={"Type Todo Name"}
        value={todoName}
        onChange={todoOnChange}
      />
      
      <Button  title={"Add Todo"} onPress={addTodo} ></Button>
    </View>
  );
};

export default CreateAndEditTodo;
