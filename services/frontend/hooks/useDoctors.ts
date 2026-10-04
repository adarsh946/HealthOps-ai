import api from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";
import { Doctor } from "@/types";
import { useEffect, useState } from "react";

const useDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!token) return;
    const fetchDoctors = async () => {
      setError("");
      setLoading(true);

      try {
        const response = await api.get("/doctors");
        setDoctors(response.data);
      } catch (error: any) {
        setError(error.response?.data?.message || "Unable to fetch doctors");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [token]);

  return { doctors, loading, error };
};

export default useDoctors;
