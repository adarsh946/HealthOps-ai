import api from "@/lib/axios";
import socket from "@/lib/socket";
import { useAuthStore } from "@/store/authStore";
import { QueueItem } from "@/types";
import { useEffect, useState } from "react";

const useQueue = () => {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQueue = () => {
      const token = useAuthStore.getState().token;
      socket.auth = { token: `Bearer ${token}` };
      socket.connect();
      setIsConnected(true);

      socket.on("queue_updated", (data) => setQueue(data.orderedQueue));

      return () => {
        socket.off("queue_updated");
        socket.disconnect();
        setIsConnected(false);
      };
    };
  }, []);

  const optimizeQueue = async () => {
    setLoading(true);
    setError("");

    try {
      await api.post("/ai-agent/optimize-queue");
    } catch (error: any) {
      setError(error.response?.data?.message || "Unable to optimize queue");
    } finally {
      setLoading(false);
    }
  };

  return { queue, isConnected, loading, error, optimizeQueue };
};

export default useQueue;
