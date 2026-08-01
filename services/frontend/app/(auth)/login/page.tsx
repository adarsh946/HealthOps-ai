// document.cookie = "isLoggedIn=true; path=/; max-age=86400"; // 24 hours
// document.cookie = "isLoggedIn=; path=/; max-age=0";
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Sign in — HealthOps AI";
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB] px-4">
      <Card className="w-full max-w-md rounded-xl border p-8 shadow-sm">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <h1 className="text-center text-xl font-semibold text-gray-900">
          Welcome back
        </h1>
        <p className="mt-1 text-center text-sm text-gray-500">
          Sign in to access your hospital dashboard.
        </p>
        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            setTimeout(() => setLoading(false), 1000);
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@hospital.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            disabled={loading}
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-emerald-600 hover:text-emerald-700"
          >
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
}
