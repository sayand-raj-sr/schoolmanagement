"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, UsersRound, Settings } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Students", href: "/students/viewallstudents", icon: Users },
    { name: "Teachers", href: "/teachers/viewallteachers", icon: UsersRound },
    { name: "Class", href: "/classes/addclass", icon: UsersRound },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-72 h-screen bg-white border-r border-slate-100 p-8 flex flex-col shadow-subtle">
      <div className="flex items-center gap-3 mb-12 p-3 bg-blue-50/50 rounded-2xl border border-blue-100">
        <div className="bg-blue-600 text-white p-3 rounded-xl text-lg shadow-sm">🎓</div>
        <div>
          <h1 className="text-xl font-bold text-slate-950">School MS</h1>
          <p className="text-xs text-blue-600 font-medium">AcaSync Portal</p>
        </div>
      </div>

      <nav className="flex flex-col gap-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}