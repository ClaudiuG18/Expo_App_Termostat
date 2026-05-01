import { useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";
import "../../global.css";
import { useSensorStore } from "../../service/dataStore";

export default function Settings() {
  const { id } = useLocalSearchParams();

  const room = useSensorStore((state) => state.rooms.find((r) => r.id === id));

  if (!room) return <Text>Room not found</Text>;
  //useSensorStore((state) => state.updateRoom(room));

  return (
    <View className="p-4 ">
      <View className="bg-gray-700 rounded-lg shadow-md  flex-column p-5 mb-4">
        <Text className="text-2xl font-bold text-white">{id}</Text>
        <View className="flex-row mt-2 justify-between border-b border-gray-500 pb-2 mx-40">
          <Text className="text-2xl text-white">Set Temp</Text>
          <Text className="text-2xl text-white">Calib </Text>
        </View>
        <View className="flex-row mt-1 justify-between">
          <Pressable
            onPress={() => {
              const newSetpoint = room.setpoint + 0.5;
              useSensorStore
                .getState()
                .updateRoom({ ...room, setpoint: newSetpoint });
            }}
          >
            <Text className="text-2xl text-white">{room.setpoint}°C</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              const newCalibTemp = room.calibTemp + 0.5;
              useSensorStore
                .getState()
                .updateRoom({ ...room, calibTemp: newCalibTemp });
            }}
          >
            <Text className="text-2xl text-white">{room.calibTemp}°C</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
