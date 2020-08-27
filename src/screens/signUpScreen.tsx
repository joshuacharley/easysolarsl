import React, { SyntheticEvent, useState } from "react";
import { Text, TextInput, TouchableHighlight, View } from "react-native";
import { useDispatch } from "react-redux";
import { loginAction } from "../redux/user";

const SignUpScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [loginFalse, setLoginFalse] = useState(false);

  const dispatch = useDispatch();

  const createUserHandler = () => {
    const signUpQuery = {
      query: `
          mutation{
            createUser(email: "${email}", password: "${password}")
          }
          `,
    };

    try {
      fetch("http://localhost:4000/graphql", {
        method: "POST",
        body: JSON.stringify(signUpQuery),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(async (resData) => {
          await resData;

          //login the user token create an access token
          // @ts-ignore
          if (resData === true) {
            try {
              const singInQuery = {
                query: `
                            mutation{
                                login(email: "${email}", password: "${password}"){
                                    accessToken
                                }
                            }
                        `,
              };

              fetch("http://localhost: 4000/graphql", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(singInQuery),
              })
                .then((res) => res.json())
                .then(async (loginData) => {
                  await dispatch(
                    loginAction({
                      token: loginData.accessToken,
                    })
                  );
                  navigation.replace("todoScreen");
                });
            } catch (e) {
              throw e;
            }
          } else {
            return;
          }
        });
    } catch (e) {
      throw e;
    }
    navigation.navigate("signUpScreen");
  };

  const emailInput = (e: {
    nativeEvent: { text: React.SetStateAction<string> };
  }) => {
    setEmail(e.nativeEvent.text);
  };
  const passwordInput = (e: SyntheticEvent<string>) => {
    const value = e.nativeEvent.text;

    setPassword(value);
  };
  const confirmPasswordInput = (e: SyntheticEvent<string>) => {
    const value = e.nativeEvent.text;

    setConfirmPassword(value);
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
          onPress={createUserHandler}
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
