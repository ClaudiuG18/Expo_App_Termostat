import { useSensorStore } from "../service/dataStore";

export async function syncWithServer(command?: any) {
  try {
    const res = await fetch("http://192.168.2.223:8787/api/server", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: command?.id ?? null,
        cmd: command ?? null,
      }),
    });

    const data = await res.json();

    if (data.room) {
      useSensorStore.getState().updateRoom(data.room);
    } else if (data.rooms) {
      useSensorStore.getState().setRooms(data.rooms);
    }

    return data;
  } catch (err: any) {
    console.error("syncWithServer failed:", err);
    alert("EROARE: " + err.message); // ← ce eroare apare?
    return null; // ← nu crapa, returneaza null
  }
}
