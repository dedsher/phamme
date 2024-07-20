import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSelector } from '@shared/hooks/useRedux';

const SOCKET_URL = 'http://localhost:3000';

interface SocketContextProps {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextProps>({ socket: null });

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (user.id && !socket) {
      const socket: Socket = io(SOCKET_URL, {
        withCredentials: true,
      });
      setSocket(socket);

      socket.on('connect', () => {
        console.log('Connected to the server', socket.id);
        socket.emit('user connected', user.id);
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from the server');
      });

      return () => {
        socket.disconnect();
        setSocket(null);
      };
    }
  }, [user.id]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext).socket;
};
