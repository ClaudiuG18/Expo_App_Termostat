import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import "../../global.css";
import { syncWithServer } from "../../service/api";
import { useSensorStore } from "../../service/dataStore";

export default function Settings() {
  const { id } = useLocalSearchParams();

  const room = useSensorStore((state) => state.rooms.find((r) => r.id === id));
  const tempOptions = Array.from(
    { length: (30 - 19) / 0.5 + 1 },
    (_, i) => 19 + i * 0.5,
  );
  const calibtempOptions = Array.from(
    { length: (20 - -20) / 0.5 + 1 },
    (_, i) => -20 + i * 0.5,
  );
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
          {/* Setpoint Picker */}
          <View>
            <Text className="text-white text-xs mb-1">Setpoint</Text>
            <Picker
              selectedValue={room.setpoint}
              onValueChange={async (newSetpoint) => {
                useSensorStore
                  .getState()
                  .updateRoom({ ...room, setpoint: newSetpoint });
                await syncWithServer({ setpoint: newSetpoint, id: room.id });
              }}
              style={{ color: "white", width: 120 }}
              dropdownIconColor="white"
            >
              {tempOptions.map((val) => (
                <Picker.Item key={val} label={`${val}°C`} value={val} />
              ))}
            </Picker>
          </View>

          {/* CalibTemp Picker */}
          <View>
            <Text className="text-white text-xs mb-1">Calib Temp</Text>
            <Picker
              selectedValue={room.calibTemp}
              onValueChange={async (newCalibTemp) => {
                useSensorStore
                  .getState()
                  .updateRoom({ ...room, calibTemp: newCalibTemp });
                await syncWithServer({ calibTemp: newCalibTemp, id: room.id });
              }}
              style={{ color: "white", width: 120 }}
              dropdownIconColor="white"
            >
              {calibtempOptions.map((val) => (
                <Picker.Item key={val} label={`${val}°C`} value={val} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
    </View>
  );
}
