import api from "@/lib/axios";
import { Appointment } from "@/types";
import { useEffect, useState } from "react";

const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      setError("");
      setLoading(true);

      try {
        const response = await api.get("/appointments");
        setAppointments(response.data);
      } catch (error: any) {
        setError(
          error.response?.data?.message || "Unable to fetch appointments"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  return { appointments, loading, error };
};

export default useAppointments;
