// store/useSensorStore.ts
import { create } from "zustand";

export type SensorData = {
  id: string;
  temp: number;
  hum: number;
  setpoint: number;
  relay: number;
  calibTemp: number;
};

type Store = {
  rooms: SensorData[];
  setRooms: (rooms: SensorData[]) => void;
  updateRoom: (room: SensorData) => void;
};

export const useSensorStore = create<Store>((set) => ({
  rooms: [],

  setRooms: (rooms) => set({ rooms }),

  updateRoom: (room) =>
    set((state) => ({
      rooms: state.rooms.map((r) => (r.id === room.id ? room : r)),
    })),
}));
