"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BarChart3,
  Trophy,
  Settings,
} from "lucide-react";

const navigation = [
  {
    href: "/",
    label: "Главная",
    icon: Home,
  },
  {
    href: "/analytics",
    label: "Статистика",
    icon: BarChart3,
  },
  {
    href: "/challenges",
    label: "Челленджи",
    icon: Trophy,
  },
  {
    href: "/settings",
    label: "Настройки",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-24 border-r border-zinc-800 bg-zinc-950 lg:flex lg:flex-col lg:items-center lg:py-6">
        {/* Navigation */}
        <nav className="flex flex-col items-center gap-4">
          {navigation.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className={[
                  "group flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-200",
                  "active:scale-95",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                  isActive
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                    : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200",
                ].join(" ")}
              >
                <Icon className="h-5 w-5 transition-transform group-hover:scale-105" />
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-800 bg-zinc-950/95 px-3 py-2 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-md items-center justify-around">
          {navigation.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className={[
                  "flex min-w-16 flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all",
                  "active:scale-95",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                  isActive
                    ? "bg-indigo-500/15 text-indigo-400"
                    : "text-zinc-500 hover:text-zinc-200",
                ].join(" ")}
              >
                <Icon className="h-5 w-5" />

                <span className="text-[10px] font-semibold">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}