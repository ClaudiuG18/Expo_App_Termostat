import { useSensorStore } from "../service/dataStore";
export async function syncWithServer(command?: any) {
  try {
    const res = await fetch("https://termostat.claudiu-ghise.de/api/server", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(command ? { id: command.id, cmd: command } : {}),
    });

    if (!res.ok) throw new Error(`Server error: ${res.status}`);

    const data = await res.json();

    if (data.room) {
      useSensorStore.getState().updateRoom(data.room);
    } else if (data.rooms) {
      useSensorStore.getState().setRooms(data.rooms);
    }

    return data;
  } catch (err: any) {
    console.error("syncWithServer failed:", err);
    return null;
  }
}
