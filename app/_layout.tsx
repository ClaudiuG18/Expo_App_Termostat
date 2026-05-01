import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

export default function StackRoute() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="settings/[id]" options={{ title: "Settings" }} />
    </Stack>
  );
}

const styles = StyleSheet.create({});
