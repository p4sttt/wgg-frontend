import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Room } from '~/types';

interface RoomState {
  room: null | Room;
  setRoom: (room: Room) => void;
  setRoomField: <Field extends keyof Room>(field: Field, value: Room[Field]) => void;
  removeRoom: () => void;
}

export const useRoom = create(
  devtools<RoomState>((set) => ({
    room: null,
    setRoom: (room) => set(() => ({ room: room })),
    setRoomField: (field, value) =>
      set((state) => ({
        room: {
          ...state.room!,
          [field]: value,
        },
      })),
    removeRoom: () => set(() => ({ room: null })),
  })),
);

interface RoomIdState {
  roomId: null | string;
  setRoomId: (roomId: string) => void;
  removeRoomId: () => void;
}

export const useRoomId = create(
  devtools<RoomIdState>((set) => ({
    roomId: null,
    setRoomId: (roomId) => set(() => ({ roomId: roomId })),
    removeRoomId: () => set(() => ({ roomId: null })),
  })),
);
