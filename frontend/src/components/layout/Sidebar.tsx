import type { ReactElement, ElementType } from "react";
import { Link } from "react-router-dom";
import { Home, Flame, Clock, ThumbsUp, Radio, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
}

interface NavItem {
  icon: ElementType;
  label: string;
  href: string;
}

const mainNavItems: NavItem[] = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Flame, label: "Trending", href: "/trending" },
  { icon: Radio, label: "Live", href: "/live" },
];

const libraryItems: NavItem[] = [
  { icon: Clock, label: "Watch Later", href: "/watch-later" },
  { icon: ThumbsUp, label: "Liked Videos", href: "/liked" },
  { icon: Users, label: "Following", href: "/following" },
];

export function Sidebar({ isOpen }: SidebarProps): ReactElement {
  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-[hsl(var(--background))] border-r",
        "transition-all duration-300 overflow-hidden z-40",
        isOpen ? "w-56" : "w-16"
      )}
    >
      <nav className="p-2">
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-4 px-3 py-2 rounded-lg",
                "hover:bg-[hsl(var(--accent))] transition-colors"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {isOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </div>
        {isOpen && (
          <>
            <div className="my-4 border-t" />
            <div className="space-y-1">
              <p className="px-3 py-2 text-sm font-semibold text-[hsl(var(--muted-foreground))]">
                Library
              </p>
              {libraryItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-4 px-3 py-2 rounded-lg",
                    "hover:bg-[hsl(var(--accent))] transition-colors"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </>
        )}
      </nav>
    </aside>
  );
}
