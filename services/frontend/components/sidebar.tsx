"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Calendar,
  Clock,
  Users,
  Stethoscope,
  Settings,
  LogOut,
} from "lucide-react";

const mainNavigation = [
  { name: "Dashboard", href: "/", icon: Home, section: "MAIN" },
  { name: "Calendar", href: "/calendar", icon: Calendar, section: "MAIN" },
  { name: "Appointments", href: "/appointments", icon: Clock, section: "MAIN" },
  { name: "Patients", href: "/patients", icon: Users, section: "MAIN" },
  { name: "Services", href: "/services", icon: Stethoscope, section: "MAIN" },
];

const configNavigation = [
  {
    name: "AI Settings",
    href: "/ai-settings",
    icon: Settings,
    section: "CONFIG",
  },
  { name: "Settings", href: "/settings", icon: Settings, section: "CONFIG" },
  { name: "Billing", href: "/billing", icon: Settings, section: "CONFIG" },
  { name: "My Profile", href: "/profile", icon: Users, section: "CONFIG" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const renderNavItems = (items: any[]) => {
    return items.map((item) => {
      const isActive = pathname === item.href;
      const Icon = item.icon;

      return (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm font-medium ${
            isActive
              ? "bg-[#E0F7F5] text-(--color-primary-action)"
              : "text-[#9CA3AF] hover:text-[#D1D7DC]"
          }`}
        >
          <Icon className="w-5 h-5 shrink-0" />
          <span>{item.name}</span>
          {isActive && (
            <div className="w-1 h-1 rounded-full bg-(--color-primary-action) ml-auto" />
          )}
        </Link>
      );
    });
  };

  return (
    <aside className="w-72 flex flex-col bg-(--color-sidebar-bg) border-r border-(--color-sidebar-border) h-screen">
      {/* Logo Section */}
      <div className="p-6 border-b border-[#2F3A42]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-(--color-primary-action) flex items-center justify-center text-white font-bold text-lg">
            <span>✓</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">MedBook AI</h1>
            <p className="text-xs text-[#9CA3AF]">theblockchaincoders</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto py-6">
        <div className="px-4 space-y-2">
          <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider px-2 mb-4">
            Main
          </p>
          {renderNavItems(mainNavigation.filter((i) => i.section === "MAIN"))}
        </div>

        <div className="px-4 space-y-2 mt-8">
          <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider px-2 mb-4">
            Config
          </p>
          {renderNavItems(
            configNavigation.filter((i) => i.section === "CONFIG")
          )}
        </div>
      </nav>

      {/* AI Powered Section */}
      <div className="px-4 py-6 border-t border-[#2F3A42] space-y-4">
        <div className="bg-[#E0F7F5] bg-opacity-20 rounded-lg p-4">
          <p className="text-xs text-(--color-primary-action) font-semibold mb-1">
            AI Powered
          </p>
          <p className="text-xs text-[#D1D7DC]">
            24/7 smart booking assistant active
          </p>
        </div>
      </div>

      {/* Sign Out */}
      <div className="px-4 py-4 border-t border-[#2F3A42]">
        <button className="flex items-center gap-3 w-full px-4 py-2.5 text-[#9CA3AF] hover:text-[#D1D7DC] rounded-lg transition-all text-sm font-medium">
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
