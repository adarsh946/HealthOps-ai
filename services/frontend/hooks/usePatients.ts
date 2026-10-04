import api from "@/lib/axios";
import { useAuthStore } from "@/store/authStore"; // ← add
import { Patient } from "@/types";
import { useEffect, useState } from "react";

const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const token = useAuthStore((state) => state.token); // ← add

  useEffect(() => {
    if (!token) return; // ← add

    const fetchPatients = async () => {
      setError("");
      setLoading(true);

      try {
        const response = await api.get("/patients");
        setPatients(response.data);
      } catch (error: any) {
        setError(error.response?.data?.message || "Unable to fetch patients");
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, [token]); // ← change [] to [token]

  return { patients, loading, error };
};

export default usePatients;
