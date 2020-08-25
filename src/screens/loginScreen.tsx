import React, { useState } from "react";
import { Text, TextInput, TouchableHighlight, View } from "react-native";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [token, setToken] = useState();

  const login = () => {};

  const signUpHandler = () => {
    navigation.navigate("signUpScreen");
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ width: "100%" }}>
        <View style={{ padding: 20 }}>
          <TextInput
            placeholder={"E-Mail"}
            style={{
              borderWidth: 0.5,
              height: 50,
              borderRadius: 5,
              margin: 5,
              textAlign: "center",
            }}
          />
          <TextInput
            keyboardAppearance={"default"}
            secureTextEntry={true}
            placeholder={"Password"}
            style={{
              borderWidth: 0.5,
              height: 50,
              borderRadius: 5,
              margin: 5,
              textAlign: "center",
            }}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableHighlight
            underlayColor={"#dfe6e9"}
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#b2bec3",
              width: 250,
              borderRadius: 5,
              height: 50,
            }}
            onPress={() => {}}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              LOGIN
            </Text>
          </TouchableHighlight>
        </View>
      </View>

      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Text style={{ marginRight: 5 }}>Not Registered?</Text>
        <Text
          style={{ color: "blue", fontWeight: "bold" }}
          onPress={signUpHandler}
        >
          Sign up HERE
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
