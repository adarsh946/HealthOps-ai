import { useAuthStore } from "@/store/authStore";
import { io } from "socket.io-client";

const socket = io(
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3003",
  {
    autoConnect: false,
    withCredentials: true,
    auth: {
      token: `Bearer ${useAuthStore.getState().token}`,
    },
  }
);

export default socket;
