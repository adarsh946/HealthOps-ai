import api from "@/lib/axios";
import { Doctor } from "@/types";
import { useEffect, useState } from "react";

const useDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
  }, []);

  return { doctors, loading, error };
};

export default useDoctors;
