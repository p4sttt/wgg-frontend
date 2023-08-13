import { useEffect } from 'react';
import { Manager } from 'socket.io-client';

import { Room } from '~/types';
import { useRoom } from '~/utils/stores';

const socket_endpoint = import.meta.env.VITE_SOCKET_ENDPOINT;

const manager = new Manager(socket_endpoint);

const roomSocket = manager.socket('/room');

export const useSocket = () => {
  const [room, setRoom, removeRoom] = useRoom((state) => [
    state.room,
    state.setRoom,
    state.removeRoom,
  ]);

  const listen = () => {
    roomSocket.on('join', ({ room, username }: { room: Room; username: string }) => {
      console.log(username, room);
      setRoom(room);
    });

    roomSocket.on('pong', () => {
      console.log('pong');
    });
  };

  const exit = () => {
    removeRoom();
  };

  const ping = () => {
    roomSocket.emit('ping');
  };

  return {
    room,
    listen,
    exit,
    ping,
  };
};
