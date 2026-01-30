import type { ReactElement } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";

export function Layout(): ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = (): void => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <Header onMenuClick={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      <main
        className={cn(
          "pt-4 px-6 transition-all duration-300",
          sidebarOpen ? "ml-56" : "ml-16"
        )}
      >
        <Outlet />
      </main>
    </div>
  );
}
