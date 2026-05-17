import { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RoomCard } from "../cards/roomCard";
import { syncWithServer } from "../service/api";
import { useSensorStore } from "../service/dataStore";

export default function Home() {
  const rooms = useSensorStore((state) => state.rooms);

  useEffect(() => {
    syncWithServer();
    const interval = setInterval(() => {
      syncWithServer();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <SafeAreaView>
      <View>
        {rooms.map((room) => (
          <RoomCard key={room.id} {...room} />
        ))}
      </View>
    </SafeAreaView>
  );
}
