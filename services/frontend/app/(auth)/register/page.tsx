"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    hname: "",
    haddress: "",
    hcontact: "",
    aname: "",
    aemail: "",
    apassword: "",
  });
  const { setAuth } = useAuthStore();
  const [error, setError] = useState("");

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.hname,
      address: formData.haddress,
      contact: formData.hcontact,
      user: {
        name: formData.aname,
        email: formData.aemail,
        password: formData.apassword,
      },
    };

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/register", payload);
      const { token, hospitalId, role, user } = response.data;
      setAuth(token, hospitalId, role, user);
      document.cookie = "isLoggedIn=true; path=/";
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.response?.data?.message || "Unable to Register");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Create account — HealthOps AI";
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB] px-4 py-10">
      <Card className="w-full max-w-2xl rounded-xl border p-8 shadow-sm">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <h1 className="text-center text-xl font-semibold text-gray-900">
          Create your account
        </h1>
        <p className="mt-1 text-center text-sm text-gray-500">
          Set up your hospital in a few minutes.
        </p>
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <section>
            <h2 className="text-sm font-semibold text-gray-900">
              Hospital info
            </h2>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="hname">Hospital name</Label>
                <Input
                  id="hname"
                  value={formData.hname}
                  onChange={handleChange}
                  placeholder="City General Hospital"
                />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="haddress">Address</Label>
                <Input
                  id="haddress"
                  value={formData.haddress}
                  onChange={handleChange}
                  placeholder="123 Care Ave, Springfield"
                />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="hcontact">Contact</Label>
                <Input
                  id="hcontact"
                  value={formData.hcontact}
                  onChange={handleChange}
                  placeholder="+1 555 000 0000"
                />
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-sm font-semibold text-gray-900">
              Admin account
            </h2>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="aname">Admin name</Label>
                <Input
                  id="aname"
                  value={formData.aname}
                  onChange={handleChange}
                  placeholder="Alex Doyle"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="aemail">Admin email</Label>
                <Input
                  id="aemail"
                  type="email"
                  value={formData.aemail}
                  onChange={handleChange}
                  placeholder="alex@hospital.com"
                />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="apassword">Password</Label>
                <Input
                  id="apassword"
                  type="password"
                  value={formData.apassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
              </div>
            </div>
          </section>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            disabled={loading}
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Create Account
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-emerald-600 hover:text-emerald-700"
          >
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}
