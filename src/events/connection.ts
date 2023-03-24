import { io } from "..";
import { Socket } from "socket.io";
import { SocketEventFor } from "../utilities/types";
const run = async (socket: Socket) => {
  io.registerRooms(socket);
  io.registerClientEvents(socket);
  io.socketToken(socket);
};

export default {
  name: "connection",
  run,
  for: SocketEventFor.SERVER,
};
