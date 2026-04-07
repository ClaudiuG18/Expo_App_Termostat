import { Pressable, Text, View } from "react-native";
import "../global.css";

type RoomCardProps = {
  title: string;
  temp: number;
  setTemp: number;
  hum: number;
};

export function RoomCard({ title, temp, setTemp, hum }: RoomCardProps) {
  return (
    <Pressable onPress={() => console.log("Card pressed")} className="mb-4">
      <View className="bg-gray-700 rounded-lg shadow-md  flex-column p-4">
        <Text className="text-3xl font-bold text-white">{title}</Text>
        <View className="flex-row mt-2 justify-between border-b border-gray-500 pb-2">
          <Text className="text-2xl text-white">Actual </Text>
          <Text className="text-2xl text-white">Set </Text>
          <Text className="text-2xl text-white">Hum </Text>
        </View>
        <View className="flex-row mt-1 justify-between">
          <Text className="text-2xl text-white">{temp}°C</Text>
          <Text className="text-2xl text-white">{setTemp}°C</Text>
          <Text className="text-2xl text-white">{hum}%</Text>
        </View>
      </View>
    </Pressable>
  );
}
