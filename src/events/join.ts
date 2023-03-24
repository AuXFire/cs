import { io } from "..";
import { Socket } from "socket.io";
import { SocketEventFor } from "../utilities/types";

const run = async (socket: Socket, channelId: string) => {
  socket.join(channelId);
};

export default {
  name: "JOIN_ROOM",
  run,
  for: SocketEventFor.CLIENT,
};
