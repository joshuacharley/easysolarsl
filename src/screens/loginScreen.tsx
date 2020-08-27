import React, { SyntheticEvent, useState } from "react";
import { Text, TextInput, TouchableHighlight, View } from "react-native";
import { useDispatch } from "react-redux";
import { loginAction } from "../redux/user";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const dispatch = useDispatch();

  const login = () => {
    if (email.trim().length === 0) {
      return setErrorEmail("Please enter E-mail");
    }

    if (password.trim().length === 0) {
      return setErrorPassword("Please enter password");
    }
    const requestBody = {
      query: `
       mutation {
        login(email: "${email}", password: "${password}") {
        accessToken
      }
    }
      `,
    };

    fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => {
        return res.json();
      })
      .then(async (resData) => {
        try {
          await dispatch(
            loginAction({
              token: resData.toString(),
            })
          );
          navigation.replace("todoScreen");
        } catch (e) {
          throw e;
        }
      })
      .catch((err) => console.log(err));
  };

  const emailInput = (e: {
    nativeEvent: { text: React.SetStateAction<string> };
  }) => {
    setEmail(e.nativeEvent.text);
    setErrorEmail("");
  };

  const passwordInput = (e: {
    nativeEvent: { text: React.SetStateAction<string> };
  }) => {
    setPassword(e.nativeEvent.text);
    setErrorPassword("");
  };

  const signUpHandler = () => {
    navigation.navigate("signUpScreen");
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ width: "100%" }}>
        <View style={{ padding: 20 }}>
          <Text
            style={{
              color: "red",
              textAlign: "center",
              fontWeight: "200",
              fontSize: 15,
            }}
          >
            {errorEmail}
          </Text>
          <TextInput
            onChange={emailInput}
            value={email}
            placeholder={"E-Mail"}
            style={{
              borderWidth: 0.5,
              height: 50,
              borderRadius: 5,
              margin: 5,
              textAlign: "center",
            }}
          />
          <Text
            style={{
              color: "red",
              textAlign: "center",
              fontWeight: "200",
              fontSize: 15,
            }}
          >
            {errorPassword}
          </Text>
          <TextInput
            onChange={passwordInput}
            value={password}
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
            onPress={login}
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
