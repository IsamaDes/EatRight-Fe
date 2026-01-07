import io from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

export type ClientSocket = ReturnType<typeof io>;

let socket: ClientSocket | null = null;

export const initSocket = (): ClientSocket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: true,
    });
  }
  return socket;
};

export const getSocket = (): ClientSocket => {
  if (!socket) {
    throw new Error("Socket not initialized. Call initSocket() first.");
  }
  return socket;
};
