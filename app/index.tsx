import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RoomCard } from "../cards/roomCard";
import { syncWithServer } from "../service/api";
import { useSensorStore } from "../service/dataStore";

export default function Home() {
  const rooms = useSensorStore((state) => state.rooms);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const poll = async () => {
      await syncWithServer();
      setLoading(false);
    };

    poll(); // primul call imediat

    const interval = setInterval(poll, 2000); // ← mai rar, 2s
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <SafeAreaView>
        <Text className="text-white text-center mt-10">Se conectează...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View>
        {rooms.length === 0 ? (
          <Text className="text-white text-center mt-10">
            Nu există camere. Verifică ESP-urile.
          </Text>
        ) : (
          rooms.map((room) => <RoomCard key={room.id} {...room} />)
        )}
      </View>
    </SafeAreaView>
  );
}
