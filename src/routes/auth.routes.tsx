import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Confirmation } from "../screens/Confirmation";
import { Home } from "../screens/Home";
import { SignIn } from "../screens/SignIn";
import { SignUpFristStep } from "../screens/SignUp/SignUpFristStep";
import { SignUpSecondStep } from "../screens/SignUp/SignUpSecondStep";

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SignIn"
    >
      <Screen name="Home" component={Home} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUpFristStep" component={SignUpFristStep} />
      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
