"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

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
        <form
          className="mt-6 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            setTimeout(() => setLoading(false), 1000);
          }}
        >
          <section>
            <h2 className="text-sm font-semibold text-gray-900">
              Hospital info
            </h2>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="hname">Hospital name</Label>
                <Input id="hname" placeholder="City General Hospital" />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="haddr">Address</Label>
                <Input id="haddr" placeholder="123 Care Ave, Springfield" />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="hcontact">Contact</Label>
                <Input id="hcontact" placeholder="+1 555 000 0000" />
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
                <Input id="aname" placeholder="Alex Doyle" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="aemail">Admin email</Label>
                <Input
                  id="aemail"
                  type="email"
                  placeholder="alex@hospital.com"
                />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="apass">Password</Label>
                <Input id="apass" type="password" placeholder="••••••••" />
              </div>
            </div>
          </section>
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
