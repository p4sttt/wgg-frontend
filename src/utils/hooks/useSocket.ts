import { Manager } from 'socket.io-client';

import { Room } from '~/types';
import { useRoom } from '~/utils/stores';

import { useApi } from './useApi';

const socket_endpoint = import.meta.env.VITE_SOCKET_ENDPOINT;

const manager = new Manager(socket_endpoint);

const roomSocket = manager.socket('/room');

interface JoinData {
  username: string;
  roomId: string;
}

export const useSocket = () => {
  const [room, setRoom, setRoomField, removeRoom] = useRoom((state) => [
    state.room,
    state.setRoom,
    state.setRoomField,
    state.removeRoom,
  ]);
  const { api } = useApi();

  const listen = () => {
    roomSocket.on('join', ({ room, username }: { room: Room; username: string }) => {
      setRoom(room);
    });

    roomSocket.on('resend-link', (link: string) => {
      setRoomField('link', link);
    });
  };

  const join = async (joinData: JoinData, callback: () => void = () => {}) => {
    try {
      const res = await api.post('/room/join', {
        username: joinData.username,
        roomId: joinData.roomId,
      });
      roomSocket.emit('join', res.data.roomId);
      callback();
    } catch (error) {
      console.log(error);
    }
  };

  const changeLink = (link: string) => {
    setRoomField('link', link);
    roomSocket.emit('change-link', link);
  };

  const exit = () => {
    roomSocket.emit('leave', room!.id);
    removeRoom();
  };

  return {
    room,
    listen,
    join,
    exit,
    changeLink,
  };
};
