import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

import "../global.css";

type Props = {
  id: string;
  temp: number;
  hum: number;
  setpoint: number;
};

export function RoomCard({ id, temp, hum, setpoint }: Props) {
  return (
    <Link
      href={{
        pathname: "/settings/[id]",
        params: { id },
      }}
      asChild
    >
      <Pressable>
        <View className="bg-gray-700 rounded-lg shadow-md  flex-column p-5 mb-4">
          <Text className="text-3xl font-bold text-white">{id}</Text>

          <View className="flex-row mt-2 justify-between border-b border-gray-500 pb-2">
            <Text className="text-2xl text-white">Actual </Text>
            <Text className="text-2xl text-white">Set </Text>
            <Text className="text-2xl text-white">Hum </Text>
          </View>

          <View className="flex-row mt-1 justify-between">
            <Text className="text-2xl text-white">
              {Number(temp).toFixed(1)}°C
            </Text>
            <Text className="text-2xl text-white">{setpoint}°C</Text>
            <Text className="text-2xl text-white">{hum}%</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
