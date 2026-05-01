import { useSensorStore } from "../service/dataStore";

export async function syncWithServer(command?: any) {
  const res = await fetch("http://192.168.2.223:8787/api/server", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cmd: command, // optional
    }),
  });

  const data = await res.json();

  // ✅ update global state
  useSensorStore.getState().setRooms(data.rooms);

  return data;
}

// export const GetData = async () => {
//   try {
//     const res = await fetch("http://192.168.2.223:8787/api/server", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({}),
//     });

//     const text = await res.text();

//     if (!res.ok) {
//       throw new Error(`HTTP ${res.status}: ${text}`);
//     }

//     const data = JSON.parse(text);
//     console.log(data);
//     return data;
//   } catch (err) {
//     console.error("Fetch error:", err);
//   }
// };

// api/getData.ts
// import { useSensorStore } from "../service/dataStore";

// export async function fetchRooms() {
//   const res = await fetch("http://192.168.2.223:8787/api/server");

//   if (!res.ok) {
//     throw new Error("Failed to fetch");
//   }

//   const data = await res.json();
//   console.log("Fetched rooms:", data);

//   useSensorStore.getState().setRooms(data);
// }
