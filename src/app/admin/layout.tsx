"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Menu,
  X,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const ADMIN_EMAIL = "hireurbaniatempotraveller@gmail.com";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === ADMIN_EMAIL) {
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
        router.replace("/admin-login");
      }

      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, [router]);

  const logout = async () => {
    await signOut(auth);
    router.replace("/admin-login");
  };

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "All Blogs", href: "/admin/blogs", icon: FileText },
    { name: "Create Blog", href: "/admin/blogs/create", icon: PlusCircle },
  ];

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white px-8 py-6 rounded-2xl shadow-lg flex items-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <span>Checking authentication...</span>
        </div>
      </div>
    );
  }

  if (!userLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Redirecting...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-[9999] h-screen
          bg-slate-950 text-white
          transition-all duration-300
          overflow-y-auto scrollbar-thin
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          ${collapsed ? "lg:w-20" : "lg:w-72"}
          w-72
        `}
      >
        {/* Logo */}
        <div className="h-20 border-b border-slate-800 px-5 flex items-center justify-between sticky top-0 bg-slate-950 z-10">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <div>
                <h2 className="font-bold text-lg">Admin Panel</h2>
                <p className="text-xs text-slate-400">Secure Dashboard</p>
              </div>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-2 rounded hover:bg-slate-800"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="p-4 space-y-2 pb-24">
          {navigation.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition
                  ${
                    active
                      ? "bg-primary text-white"
                      : "text-slate-300 hover:bg-slate-800"
                  }
                `}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout Bottom */}
        <div className="absolute bottom-5 left-0 w-full px-4">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white px-4 py-3 rounded-xl"
          >
            <LogOut className="w-4 h-4" />
            {!collapsed && "Logout"}
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* MAIN */}
      <div
        className={`
          flex-1 flex flex-col min-w-0
          transition-all duration-300
          ${collapsed ? "lg:ml-20" : "lg:ml-72"}
        `}
      >
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white border-b shadow-sm">
          <div className="h-20 px-4 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded hover:bg-slate-100"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div>
                <h1 className="text-lg font-bold text-slate-800">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-slate-500">
                  Manage blogs & website content
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              className="hidden sm:flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-xl"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
