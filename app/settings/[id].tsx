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
  <View className="p-4 flex-1 bg-gray-100 items-start">
    <View
      className="bg-gray-700 rounded-2xl shadow-md"
      style={{
        maxWidth: 500,
        width: "90%",
        padding: 24,
        margin: 10,
        borderRadius: 20,
      }}
    >
      {/* Title */}
      <Text className="text-3xl font-bold text-white" style={{ marginBottom: 20 }}>
        {id}
      </Text>

      {/* Settings Row */}
      <View className="flex-row" style={{ gap: 16 }}>
        {/* Setpoint */}
        <View style={{ flex: 1 }}>
          <Text className="text-white text-sm font-semibold" style={{ marginBottom: 6, marginLeft: 4 }}>
            Setpoint
          </Text>
          <View className="bg-white rounded-xl overflow-hidden">
            <Picker
              selectedValue={room.setpoint}
              onValueChange={async (newSetpoint) => {
                useSensorStore.getState().updateRoom({ ...room, setpoint: newSetpoint });
                await syncWithServer({ setpoint: newSetpoint, id: room.id });
              }}
              style={{ color: "#333", width: "100%", borderRadius: 10 }}
              dropdownIconColor="#333"
            >
              {tempOptions.map((val) => (
                <Picker.Item key={val} label={`${val}°C`} value={val} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Calibration */}
        <View style={{ flex: 1 }}>
          <Text className="text-white text-sm font-semibold" style={{ marginBottom: 6, marginLeft: 4 }}>
            Sensor Calibration
          </Text>
          <View className="bg-white rounded-xl overflow-hidden">
            <Picker
              selectedValue={room.calibTemp}
              onValueChange={async (newCalibTemp) => {
                useSensorStore.getState().updateRoom({ ...room, calibTemp: newCalibTemp });
                await syncWithServer({ calibTemp: newCalibTemp, id: room.id });
              }}
              style={{ color: "#333", width: "100%", borderRadius: 10 }}
              dropdownIconColor="#333"
            >
              {calibtempOptions.map((val) => (
                <Picker.Item key={val} label={`${val}°C`} value={val} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
    </View>
  </View>
);
}
