import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
//import "../../global.css";
import { View } from "react-native";
import { RoomCard } from "../../cards/roomCard";
import { GetData } from "../../service/api";

type SensorData = {
  Test: {
    temp: number;
    hum: number;
    setTemp: number;
  };
};

export default function Index() {
  const [result, setResult] = useState<SensorData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data = await GetData();
        if (isMounted) {
          setResult(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load data");
          console.log(err);
        }
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <SafeAreaView>
      <View className="p-4">
        <RoomCard
          title="Test"
          temp={result?.Test?.temp || 0}
          setTemp={result?.Test?.setTemp || 0}
          hum={result?.Test?.hum || 0}
        />
      </View>
    </SafeAreaView>
  );
}
