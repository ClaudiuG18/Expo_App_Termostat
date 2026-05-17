import { useSensorStore } from "../service/dataStore";

export async function syncWithServer(command?: any) {
  const res = await fetch("http://192.168.2.223:8787/api/server", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: command?.id ?? null, // ← safe, won't crash if no command
      cmd: command ?? null,
    }),
  });

  const data = await res.json();

  // ✅ update global state
  // ✅ only update the specific room, not all rooms
  if (data.room) {
    useSensorStore.getState().updateRoom(data.room);
  } else if (data.rooms) {
    useSensorStore.getState().setRooms(data.rooms);
  }

  return data;
}
