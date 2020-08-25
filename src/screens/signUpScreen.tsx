import React, { SyntheticEvent, useState } from "react";
import { Text, TextInput, TouchableHighlight, View } from "react-native";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [token, setToken] = useState();
  const [loginFalse, setLoginFalse] = useState(false);

  const createUserHandler = () => {
    navigation.navigate("signUpScreen");
  };

  const emailInput = (e: SyntheticEvent<string>) => {
    const value = e.nativeEvent.text;

    setEmail(value);
  };
  const passwordInput = (e: SyntheticEvent<string>) => {
    const value = e.nativeEvent.text;

    setPassword(value);
  };
  const confirmPasswordInput = (e: SyntheticEvent<string>) => {
    const value = e.nativeEvent.text;

    setPassword(value);
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ width: "90%" }}>
        <TextInput
          placeholder={"E-Mail"}
          onChange={emailInput}
          value={email}
          style={{
            borderWidth: 0.5,
            height: 50,
            borderRadius: 5,
            margin: 5,
            textAlign: "center",
          }}
        />
        <TextInput
          placeholder={"Password"}
          onChange={passwordInput}
          value={password}
          style={{
            borderWidth: 0.5,
            height: 50,
            borderRadius: 5,
            margin: 5,
            textAlign: "center",
          }}
        />
        <TextInput
          placeholder={"Confirm Password"}
          onChange={confirmPasswordInput}
          value={confirmPassword}
          style={{
            borderWidth: 0.5,
            height: 50,
            borderRadius: 5,
            margin: 5,
            textAlign: "center",
          }}
        />
      </View>
      <View>
        <TouchableHighlight
          onPress={() => {}}
          underlayColor={"#dfe6e9"}
          style={{
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#b2bec3",
            width: 250,
            borderRadius: 5,
            height: 50,
          }}
        >
          <Text>Create Account</Text>
        </TouchableHighlight>
      </View>
      <View style={{ marginTop: 20 }}>
        {loginFalse ? (
          <Text
            style={{
              color: "red",
              fontSize: 15,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            E-Mail entered already exists!!! {"\n"}Try another email.
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default SignUpScreen;
